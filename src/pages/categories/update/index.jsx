import { Card, Upload, message } from 'antd';
import ProForm, {
  ProFormDatePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
} from '@ant-design/pro-form';
import { useRequest, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { getById, getCategory, getSubCategory, update } from '../service';
import React, { useEffect, useState } from 'react';
import GoogleMapComponent from '@/data/GoogleMapComponent';

const EditForm = (props) => {
  const [resource, setResource] = useState(null);
  const [fileList, setFileList] = useState([]);


  const onChange = (info) => {
    if (info.file.type.startsWith("image/")) {
      setFileList(info.fileList);
    } else {
      message.error("File type must be image");
    }
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
  }; 

  const fetchCategories = async () => {
    const result = await getCategory();
    const options = result.data.map(r => ({ label: r.alias, value: r._id }));
    return options;
  };
  const fetchSubCategories = async () => {
    const result = await getSubCategory();
    const options = result.data.map(r => ({ label: r.alias, value: r._id }));
    return options;
  };

  const { id } = props.match.params;
  useEffect(() => {
    const getResource = async (id) => {
      const item = await getById(id);
      setResource(item);
    }
    getResource(id);
  }, []);
console.log(resource?._id);



  const onFinish = async (values) => {
    const formData = new FormData();
const subCategory={};
    // for (const key in values) {
    //   formData.append(key, values[key]);
    // }
    formData.append("name", values.name);
    formData.append("alias", values.alias);
    formData.append("description", values.description);

    values.subCategories.map((value,index)=>{
      subCategory[`subCategories[${index}]`]= value
    })
    for (const file of fileList) {
      formData.append('images', file.originFileObj);
    }
    for(const key in subCategory){
      formData.append('subCategories', subCategory[key])
    }
    console.log(formData.get('images'));
    const result = await save(formData);
    if (result instanceof Error) {
      message.error(result.message);
    } else {
      message.success(result.message);
      form.resetFields();
      // setRole(null);
    }
  };


  return (
    resource && <PageContainer content="My amazing role update form">
      <Card bordered={false}>
        <ProForm
          hideRequiredMark={false}
          style={{
            margin: 'auto',
            marginTop: 8,
            maxWidth: 600,
          }}
          name="basic"
          layout="vertical"
          initialValues={resource}
          onFinish={onFinish}
        >
          <ProFormText
            width="md"
            label="Name"
            name="name"
            value={resource.name}
            rules={[
              {
                required: true,
                message: 'Please enter name',
              },
            ]}
            placeholder="Please enter name"
          />
                     <ProFormText
            width="md"
            label="Alias"
            value={resource.alias}

            name="alias"
            rules={[
              {
                required: false,
                message: 'Please enter the description',
              },
            ]}
            placeholder="Please enter the description"
          />
             <ProFormText
            width="md"
            label="Descripton"
            value={resource.description}

            name="description"
            rules={[
              {
                required: false,
                message: 'Please enter the description',
              },
            ]}
            placeholder="Please enter the description"
          />
               <ProFormSelect
            width="md"
            name="subCategories"
            label="Sub Categories"
            request={fetchSubCategories}
            placeholder="Please select a category"
            rules={[{ required: true, message: 'Please select a category' }]}
            mode="multiple"
          />
        <label >Images</label>
<Upload
                      listType="picture-card"
                      fileList={fileList}
                      onChange={onChange}
                      onPreview={onPreview}
                    multiple="true"
                    className='m-auto'
                    >
                      {fileList.length < 5 && "+ Upload"}
                    </Upload>
  

        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default EditForm;
