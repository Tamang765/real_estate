import React, { useEffect, useState } from 'react';
import { Form, Card, message, Select } from 'antd';
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
import GoogleMapComponent from '@/data/GoogleMapComponent';

const EntryForm = (props) => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [mapIframe, setMapIframe] = useState(`<iframe src="https://maps.google.com/maps?q=${latitude},${longitude}"></iframe>`);

  ////function f=s for picking the location of the doctors
  const handleLocationSelect = (location) => {
    setLatitude(location.lat)
    setLongitude(location.lng)
  }
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
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values);
    const result = await save({...values, mapIframe});
    console.log('resource', result);
    if (result instanceof Error) {
      message.error(result.message);
    }
    else {
      message.success(result.message);
      form.resetFields();
      // setRole(null);
    }
  };
  
  console.log(latitude);
  useEffect(()=>{
    setMapIframe(`<iframe src="https://maps.google.com/maps?q=${latitude},${longitude}"></iframe>`);
  },[latitude, longitude])
console.log(mapIframe);
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
                required: false,
                message: 'Please enter the alias',
              },
            ]}
            placeholder="Please enter resource alias"
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
            label="Related Categories"
            request={fetchCategories}
            placeholder="Please select a category"
            rules={[{ required: true, message: 'Please select a category' }]}
          />


        </ProForm>
      </Card> 
    </PageContainer>
  );
};

export default EntryForm;
