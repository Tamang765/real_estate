import { Card, Image, Upload, message } from 'antd';
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
import { PhotoUrl } from '@/components/Photo';

const EditForm = (props) => {
  const [resource, setResource] = useState(null);
  const [fileList, setFileList] = useState([]);

  const fetchCategories = async () => {
    const result = await getCategory();
    const options = result.data.map((r) => ({ label: r.name, value: r._id }));
    return options;
  };
  const fetchSubCategories = async () => {
    const result = await getSubCategory();
    const options = result.data.map((r) => ({ label: r.alias, value: r._id }));
    return options;
  };

  const onChange = (info) => {
    console.log(info);
    if (info.file.type.startsWith('image/')) {
      setFileList(info.fileList);
    } else {
      message.error('File type must be image');
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

  const { id } = props.match.params;
  useEffect(() => {
    const getResource = async (id) => {
      const item = await getById(id);
      console.log(item);
      setResource(item);
    };
    getResource(id);
  }, []);
  const onFinish = async (values) => {
    const { name, alias, relatedPurpose, description } = values;
    const formData = new FormData();
    // const relatedCategoriesObj={}
    // const relatedSubCategoriesObj={}

    // values?.relatedCategories.forEach((relatedCategories, index) => {
    //   relatedCategoriesObj[`relatedCategories[${index}]`] = relatedCategories;
    // });
    // console.log("asd");

    // values?.relatedSubCategories.forEach((relatedSubCategories, index) => {
    //   relatedSubCategoriesObj[`relatedSubCategories[${index}]`] = relatedSubCategories;
    // });

    // for (const key in relatedCategoriesObj) {
    //   formData.append("relatedCategories", relatedCategoriesObj[key]);
    // }

    // for (const key in relatedSubCategoriesObj) {
    //   formData.append("relatedSubCategories", relatedSubCategoriesObj[key]);
    // }

    formData.append('name', name);
    formData.append('_id', id);

    formData.append('alias', alias);
    // formData.append("relatedPurpose" , relatedPurpose)
    formData.append('description', description);

    for (const file of fileList) {
      formData.append('images', file.originFileObj);
    }
    console.log(formData.get('name'));
    const result = await update(formData);
    if (result instanceof Error) {
      message.error(result.message);
    } else {
      message.success(result.message);
      history.push('/amenities/list');
    }
  };
  console.log(resource);

  return (
    resource && (
      <PageContainer content="My amazing role update form">
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
                  message: 'Please enter role name',
                },
              ]}
              placeholder="Please enter role name"
            />
            <ProFormText
              width="md"
              label="Alias"
              name="alias"
              rules={[
                {
                  required: true,
                  message: 'Please enter alias',
                },
              ]}
              placeholder="Please enter alias"
            />
            {/*               
             <ProFormSelect
            width="md"
            name="relatedPurpose"
            label="Purpose"
            options={[
              {
                value: "rent",
                label: "Rent",
              },
              {
                value: "sell",
                label: "Sell",
              },
            ]}
            placeholder="Please select purpose"
            rules={[{ required: true, message: 'Please select purpose' }]}
            mode='multiple'
          /> */}

            <ProFormText
              width="md"
              label="Descripton"
              name="description"
              rules={[
                {
                  required: false,
                  message: 'Please enter the description',
                },
              ]}
              placeholder="Please enter the description"
            />

            {/* <ProFormSelect
            width="md"
            name="relatedCategories"
            label="Category"
            request={fetchCategories}
            placeholder="Please select a category"
            rules={[{ required: true, message: 'Please select a category' }]}
            mode='multiple'
      
          />
     <ProFormSelect
            width="md"
            name="relatedSubCategories"
            label="relatedSubCategories"
            request={fetchSubCategories}
            placeholder="Please select a sub category"
            rules={[{ required: true, message: 'Please select a sub category' }]}
            mode='multiple'
            
  
          /> */}

            <label>Images</label>
            <br />
            {fileList.length < 1 && <Image src={`${PhotoUrl}/${resource?.images[0]}`} width={100} height={100}/>}
<br />
<br />
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              multiple="true"
              className="m-auto"
            >
              {fileList.length < 1 && '+ Upload'}
            </Upload>
          </ProForm>
        </Card>
      </PageContainer>
    )
  );
};

export default EditForm;
