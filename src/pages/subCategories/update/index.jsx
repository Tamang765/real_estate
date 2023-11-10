import { Card, message } from 'antd';
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
  useEffect(() => {
    const { id } = props.match.params;
    const getResource = async (id) => {
      const item = await getById(id);
      setResource(item);
    }
    getResource(id);
  }, []);

  const onFinish = async (values) => {
    console.log(values);
    const result = await update({ _id: resource._id, ...values });
    console.log('resource', result);
    if (result instanceof Error) {
      message.error(result.message);
    }
    else {
      message.success(result.message);
      history.push('/subCategories/list');
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
                message: 'Please enter the alias',
              },
            ]}
            placeholder="Please enter the alias"
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
                       {/* <ProFormText
            width="md"
            label="Related Categories"
            name="relatedCategories"
            rules={[
              {
                required: false,
                message: 'Please enter the Related Categories',
              },
            ]}
            placeholder="Please enter the Related Categories"
          /> */}
                       {/* <ProFormSelect
            width="md"
            name="relatedCategories"
            label="relatedCategories"
            value={resource.relatedCategories}
            request={fetchCategories}
            placeholder="Please select a category"
            rules={[{ required: true, message: 'Please select a category' }]}
     
          /> */}
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default EditForm;
