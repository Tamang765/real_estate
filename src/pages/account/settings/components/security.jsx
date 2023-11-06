import { checkUsername } from '@/pages/user/register/service';
import { Button, Form, Input, Popover, Upload } from 'antd';
import { useState } from 'react';
import { Link } from 'umi';
import { updateUser } from '../service';

function UpdateUser({ data }) {
  const [fileList, setFileList] = useState();

  console.log(data);
  const [form] = Form.useForm();
  const FormItem = Form.Item;
  const validateUsername = async (_, value) => {
    const promise = Promise;
    if (!value) {
      setVisible(!!value);
      return promise.reject('Please enter your username!');
    }
    const res = await checkUsername({ username: value });
    if (res.status === 'available') {
      return promise.resolve();
    } else {
      console.log(JSON.stringify(res));
      return promise.reject(res.message);
    }
  };

  const onChange = (e) => {
    console.log(e);
    setFileList(e.target.files[0]);
    // if (info.file.type.startsWith('image/')) {
    //   setFileList(info.fileList);
    // } else {
    //   message.error('File type must be image');
    // }
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
  console.log(data?._id);
  const onFinish = async (values) => {
    console.log(values);
    const formData = new FormData();

    for (const key in values) {
      formData.append(key, values[key]);
    }
    // for (const file in fileList){
    formData.append('image', fileList);
    // }
    formData.append('_id', data._id);
    await updateUser(formData);
  };
  return (
    <Form
      form={form}
      name="UserRegister"
      onFinish={onFinish}
      initialValues={data}
      layout="vertical"
    >
      <FormItem
        name="firstName"
        label="First Name"
        rules={[
          {
            required: true,
            message: 'Please input the first name!',
          },
        ]}
      >
        <Input size="large" placeholder="First name" />
      </FormItem>
      <FormItem
        name="lastName"
        label="Last name"
        rules={[
          {
            required: true,
            message: 'Please input the last name!',
          },
        ]}
      >
        <Input size="large" placeholder="Last name" />
      </FormItem>
      {/* <FormItem
        name="username"
        label="Username"
        rules={[
          {
            validator: validateUsername,
          },
        ]}
      >
        <Input size="large" placeholder="Username" />
      </FormItem> */}
      <FormItem
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            message: 'Please input the email address!',
          },
          {
            type: 'email',
            message: 'Email address format error!',
          },
        ]}
      >
        <Input size="large" placeholder="Email" />
      </FormItem>

      <FormItem
        name="phoneNumber"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: 'Please enter phone number!',
          },
          {
            pattern: /^01[0-9]{9}$/,
            message: 'Malformed phone number!',
          },
        ]}
      >
        <Input size="large" placeholder="eg. 01XXXXXXXXX" />
      </FormItem>
      <FormItem
        name="address"
        label="Address"
        rules={[
          {
            required: true,
            message: 'Please enter address!',
          },
        ]}
      >
        <Input size="large" placeholder="address" />
      </FormItem>
      <label>Images</label>
      {/* <Upload
        listType="picture-card"

        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        multiple={false}
        className="m-auto"
      >
        {fileList.length<6 && '+ Upload'}
      </Upload> */}
      <input type="file" name="image" onChange={onChange} />
      <br />
      <Form.Item>
        <Button htmlType="submit" type='primary'>Submit</Button>
      </Form.Item>
    </Form>
  );
}

export default UpdateUser;
