import React, { useEffect, useState } from 'react';
import { Form, Card, message, Select, Upload } from 'antd';
import ProForm, {
  ProFormDatePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormCheckbox,
  ProFormSelect,
} from '@ant-design/pro-form';
import { useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { getCategory, getSubCategory, save } from '../service';
import { Municipality } from '@/data/Municipalities';
import { Districts } from '@/data/Districts';

const EntryForm = (props) => {
  const [fileList, setFileList] = useState([]);

  const fetchCategories = async () => {
    const result = await getCategory();
    const options = result.data.map((r) => ({ label: r.alias, value: r._id }));
    return options;
  };
  const fetchSubCategories = async () => {
    const result = await getSubCategory();
    const options = result.data.map((r) => ({ label: r.alias, value: r._id }));
    return options;
  };
  const [form] = Form.useForm();

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

  const onFinish = async (values) => {
    console.log(values);
    const { name, alias, relatedPurpose, description } = values;
    const formData = new FormData();
    const relatedCategoriesObj = {};
    const relatedSubCategoriesObj = {};

    values?.relatedCategories.forEach((relatedCategories, index) => {
      relatedCategoriesObj[`relatedCategories[${index}]`] = relatedCategories;
    });
    console.log('asd');

    values?.relatedSubCategories.forEach((relatedSubCategories, index) => {
      relatedSubCategoriesObj[`relatedSubCategories[${index}]`] = relatedSubCategories;
    });

    for (const key in relatedCategoriesObj) {
      formData.append('relatedCategories', relatedCategoriesObj[key]);
    }

    for (const key in relatedSubCategoriesObj) {
      formData.append('relatedSubCategories', relatedSubCategoriesObj[key]);
    }

    formData.append('name', name);
    formData.append('alias', alias);
    formData.append('description', description);

    for (const file of fileList) {
      formData.append('image', file.originFileObj);
    }
    console.log(formData.get('relatedSubCategories'));
    const result = await save(formData);
    if (result instanceof Error) {
      message.error(result.message);
    } else {
      message.success(result.message);
      form.resetFields();
    }
  };

  return (
    <PageContainer content="My amazing resource entry form">
      <Card bordered={false}>
        <ProForm
          hideRequiredMark
          style={{
            margin: 'auto',
            marginTop: 8,
            maxWidth: 600,
          }}
          name="basic"
          layout="vertical"
          onFinish={(v) => onFinish(v)}
          form={form}
        >
          <ProFormText
            width="md"
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please enter resource name',
              },
            ]}
            placeholder="Please enter resource name"
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

          <ProFormSelect
            width="md"
            name="relatedCategories"
            label="Related Category"
            request={fetchCategories}
            placeholder="Please select a category"
            rules={[{ required: true, message: 'Please select a category' }]}
            mode="multiple"

            // onChange={(value, e) => {
            //   console.log(value, e);
            // }}
          />
          <ProFormSelect
            width="md"
            name="relatedSubCategories"
            label="Sub Category"
            request={fetchSubCategories}
            placeholder="Please select a sub category"
            rules={[{ required: true, message: 'Please select a sub category' }]}
            mode="multiple"

            // onChange={(value, e) => {
            //   console.log(value, e);
            // }}
          />
          <label>Images</label>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            multiple="true"
            className="m-auto"
          >
            {fileList.length < 5 && '+ Upload'}
          </Upload>
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default EntryForm;
