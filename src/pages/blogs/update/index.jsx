import { Card, Form, Upload, message } from 'antd';
import ProForm, {
  ProFormDatePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
} from '@ant-design/pro-form';
import { useRequest, history, useHistory } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { getById, getCategory, getSubCategory, update } from '../service';
import React, { useEffect, useState } from 'react';
import GoogleMapComponent from '@/data/GoogleMapComponent';
import { valid } from 'mockjs';

const EditForm = (props) => {
  const [resource, setResource] = useState(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

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

  const [id, setId] = useState(null)

  useEffect(() => {
    const { id } = props.match.params;
    if(id){
      setId(id)
    }
    const getResource = async (id) => {
      const item = await getById(id);
      setResource(item);
    };
    getResource(id);
  }, [id]);

  const onFinish = async (values) => {
    const formData = new FormData();
    try {

      // console.log(values.tags,values, "values")
      if (values.tags) {
        if(!Array.isArray(values.tags)){
          const tagsArray = values.tags.split(',').map((tag) => tag.trim());
          formData.append('tags', JSON.stringify(tagsArray));

        }
        formData.append('tags', JSON.stringify(values.tags));
      }
      if (values.keywords) {
        if(!Array.isArray(values.keywords)){
          const keywordsArray = values.keywords.split(',').map((tag) => tag.trim());
          formData.append('keywords', JSON.stringify(keywordsArray));

        }
        formData.append('keywords', JSON.stringify(values.keywords));
      }

      if (values.meta_tag) {
        if(!Array.isArray(values.meta_tag)){
          const meta_tagArray = values.meta_tag.split(',').map((tag) => tag.trim());
          formData.append('meta_tag', JSON.stringify(meta_tagArray));

        }
        formData.append('meta_tag', JSON.stringify(values.meta_tag));
      }


      formData.append('title', values.title);
      formData.append('_id', id);
      formData.append('short_description', values.short_description);
      formData.append('slug_url', values.slug_url);

      formData.append('description', values.description);
      formData.append('meta_description', values.meta_description);

      for (const file of fileList) {
        formData.append('images', file.originFileObj);
      }
    const response=  await update(formData);
      if(response.status==200) {
        history.push('/blogs/list');
      }
      
    } catch (error) {
      message.error('failed to update data', error);
    }
  };

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
              label="Title"
              name="title"
              value={resource?.title || ''}
              rules={[
                {
                  required: true,
                  message: 'Please enter  title',
                },
              ]}
              placeholder="Please enter  title"
            />
            <ProFormText
              width="md"
              label="Description"
              name="description"
              value={resource?.description}
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
              label="keywords"
              name="keywords"
              value={resource?.keywords}
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
              label="Short Description"
              value={resource?.short_description}
              name="short_description"
              rules={[
                {
                  required: true,
                  message: 'Please enter shortDescription',
                },
              ]}
              placeholder="Please enter shortDescription"
            />
            <ProFormText
              width="md"
              name="tags"
              label="tags"
              value={resource.tags}
              placeholder="Please select tags"
              rules={[{ required: true, message: 'Please select tags' }]}
              // onChange={(value, e) => setRole({ resourceId: value, resourceAlias: e.label })}
            />
            <ProFormText
              width="md"
              name="meta_tag"
              label="Meta Tags"
              value={resource.meta_tag}
              placeholder="Please select meta tags"
              rules={[{ required: true, message: 'Please select meta tags' }]}
              // onChange={(value, e) => setRole({ resourceId: value, resourceAlias: e.label })}
            />
            <ProFormText
              width="md"
              label="slug Url"
              name="slug_url"
              value={resource.slug_url}
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
              name="meta_description"
              label="Meta Descriptions"
              value={resource.meta_description}
              placeholder="Please select meta description"
              rules={[{ required: true, message: 'Please select meta description' }]}
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
    )
  );
};

export default EditForm;
