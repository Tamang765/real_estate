import React, { useEffect, useState } from 'react';
import { Form, Card, message, Select, Upload } from 'antd';
import ProForm, {
  ProFormText,
  ProFormTextArea,
  ProFormCheckbox,
  ProFormSelect,
} from '@ant-design/pro-form';
import { useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { getCategory, getLoggedInUser, getSubCategory, save } from '../service';
import { Municipality } from '@/data/Municipalities';
import { Districts } from '@/data/Districts';
import GoogleMapComponent from '@/data/GoogleMapComponent';

const EntryForm = (props) => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [user, setUser] = useState(null);
  const [fileList, setFileList] = useState([]);
  console.log(user);

  const [form] = Form.useForm();

  const loggedInUser = async () => {
    const response = await getLoggedInUser();
    setUser(response);
  };

  const onChange = (info) => {
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
    const formData = new FormData();
    if (values.tags) {
      const tagsArray = values.tags.split(',').map((tag) => tag.trim());
      formData.append('tags', JSON.stringify(tagsArray));
    }

    if (values.keywords) {
      const keywordsArray = values.keywords.split(',').map((key) => key.trim());
      formData.append('keywords', JSON.stringify(keywordsArray));
    }

    if (values.meta_tag) {
      const metaTagsArray = values.meta_tag.split(',').map((key) => key.trim());
      console.log(JSON.stringify(metaTagsArray));
      formData.append('meta_tag', JSON.stringify(metaTagsArray));
    }
    formData.append('title', values.title);
    formData.append('short_description', values.short_description);
    formData.append('slug_url', values.slug_url);
    formData.append('author', user?._id);
    formData.append('description', values.description);
    formData.append('meta_description', values.meta_description);

    for (const file of fileList) {
      formData.append('images', file.originFileObj);
    }

    const result = await save(formData);
    if (result instanceof Error) {
      message.error(result.message);
    } else {
      message.success(result.message);
      form.resetFields();
      setRole(null);
    }
  };
  useEffect(() => {
    loggedInUser();
  }, [latitude, longitude]);
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
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Please enter title',
              },
            ]}
            placeholder="Please enter title"
          />
          <ProFormTextArea
            width="md"
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: 'Please enter description',
              },
            ]}
            placeholder="Please enter description"
          />

          <ProFormText
            width="md"
            name="short_description"
            label="shortDescription"
            placeholder="Please select shortDescription"
            rules={[{ required: true, message: 'Please select shortDescription' }]}
          />
          <ProFormText
            width="md"
            name="author"
            label="author"
            hidden={true}
            // value={user?.id}
          />
          <ProFormText
            width="md"
            label="Tags"
            name="tags"
            rules={[
              {
                required: false,
                message: 'Please enter the tags',
              },
            ]}
            placeholder="Please enter the tags"
          />
          <ProFormText
            width="md"
            label="slug Url"
            name="slug_url"
            rules={[
              {
                required: true,
                message: 'Please enter slug Url',
              },
            ]}
            placeholder="Please enter slug Url"
          />
          <ProFormText
            width="md"
            label="keywords"
            name="keywords"
            rules={[
              {
                required: true,
                message: 'Please enter keywords',
              },
            ]}
            placeholder="Please enter keywords"
          />
          <ProFormText
            width="md"
            label="MetaTags"
            name="meta_tag"
            rules={[
              {
                required: true,
                message: 'Please enter MetaTags',
              },
            ]}
            placeholder="Please enter MetaTags"
          />
          <ProFormTextArea
            width="md"
            label="MetaDescription"
            name="meta_description"
            rules={[
              {
                required: true,
                message: 'Please enter MetaDescription',
              },
            ]}
            placeholder="Please enter MetaDescription"
          />
          <label>Image</label>
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
