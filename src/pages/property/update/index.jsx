import { Button, Card, Form, Image, Upload, message } from 'antd';
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
import {
  getAmenities,
  getById,
  getCategory,
  getHighlights,
  getSubCategory,
  update,
} from '../service';
import React, { useEffect, useState } from 'react';
import GoogleMapComponent from '@/data/GoogleMapComponent';
import { DeleteOutlined } from '@ant-design/icons';
import { PhotoUrl } from '@/components/Photo';

const EditForm = (props) => {
  const [resource, setResource] = useState(null);

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [form] = Form.useForm();

  const fetchCategories = async () => {
    const result = await getCategory();
    const options = result.data.map((r) => ({ label: r.alias, value: r._id }));
    return options;
  };
  const handleLocationSelect = (location) => {
    setLatitude(location.lat);
    setLongitude(location.lng);
  };
  const fetchSubCategories = async () => {
    const result = await getSubCategory();
    const options = result.data.map((r) => ({ label: r.alias, value: r._id }));
    return options;
  };
  const fetchAmenities = async () => {
    const result = await getAmenities();
    const options = result.data.map((r) => ({ label: r.alias, value: r._id }));
    return options;
  };
  const fetchHighlights = async () => {
    const result = await getHighlights();
    const options = result.data.map((r) => ({ label: r.alias, value: r._id }));
    return options;
  };
  const { id } = props.match.params;
  useEffect(() => {
    const getResource = async (id) => {
      const item = await getById(id);
      setResource(item);
    };
    getResource(id);
  }, [id]);

  useEffect(() => {
    form.setFieldsValue({
      mapIframe: `<iframe src="https://maps.google.com/maps?q=${latitude},${longitude}"></iframe>`,
    });
  }, [latitude, longitude]);

  // const onChange = (info) => {
  //   if (info.file.type.startsWith('image/')) {
  //     setFileList(info.fileList);
  //   } else {
  //     message.error('File type must be image');
  //   }
  // };
  const onChange = ({ fileList: newFileList }) => {
    console.log(newFileList);
    console.log(fileList);
    setFileList(newFileList);
    console.log(fileList);
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
    const {
      name,
      purpose,
      furnishingStatus,
      rentFrequency,
      price,
      description,
      category,
      subCategory,
      isFeatured,
      hasPrice,
    } = values;

    const location = {
      ward: values.location.ward,
      province: values.location.province,
      district: values.location.district,
      municipality: values.location.municipality,
      tole: values.location.tole,
    };

    const contactInfo = {
      email: values.contactInfo.email,
      phone: values.contactInfo.phone,
    };
    const formData = new FormData();
    const amenitiesObj = {};
    const highlightsObj = {};

    values.amenities.forEach((amenity, index) => {
      amenitiesObj[`amenities[${index}]`] = amenity;
    });

    values.highlights.forEach((highlight, index) => {
      highlightsObj[`highlights[${index}]`] = highlight;
    });
    for (const key in contactInfo) {
      formData.append(`contactInfo[${key}]`, contactInfo[key]);
    }

    for (const key in location) {
      formData.append(`location[${key}]`, location[key]);
    }

    formData.append('name', name);
    formData.append('purpose', purpose);
    formData.append('furnishingStatus', furnishingStatus);
    formData.append('rentFrequency', rentFrequency);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('subCategory', subCategory);
    formData.append('isFeatured', isFeatured);
    formData.append('hasPrice', hasPrice);

    for (const key in amenitiesObj) {
      formData.append('amenities', amenitiesObj[key]);
    }

    for (const key in highlightsObj) {
      formData.append('highlights', highlightsObj[key]);
    }

    // for (const key in values) {
    //   formData.append(key, values[key]);
    // }
    for (const file of fileList) {
      formData.append('images', file.originFileObj);
    }
    formData.append('mapIframe', values.mapIframe);
    formData.append('_id', resource._id);

    for (const file of fileList) {
      formData.append('images', file.originFileObj);
    }
    const result = await update(formData);
    console.log('resource', result);
    if (result instanceof Error) {
      message.error(result.message);
    } else {
      message.success(result.message);
      history.push('/property');
    }
  };
  console.log(resource);

  const transformedFileList = resource?.images.map((image, index) => ({
    uid: index,
    name: `image-${index}`,
    status: 'done',
    url: `${PhotoUrl}/${image}`,
    thumbUrl: `${PhotoUrl}/${image}`,
    response: {
      url: `${PhotoUrl}/${image}`,
    },
  }));
  const [fileList, setFileList] = useState([]);
  const [data,setData]= useState([]);
  let extractedString = '';

  useEffect(() => {
    if (resource && resource.mapIframe) {
      const start = resource.mapIframe.indexOf('"') + 1;
      const end = resource.mapIframe.lastIndexOf('"');
      if (start !== -1 && end !== -1 && end > start) {
        extractedString = resource.mapIframe.slice(start, end);
        const urlParts = extractedString.split('=');
        const coordinates = urlParts[1].split(',');
        setLatitude(coordinates[0]);
        setLongitude(coordinates[1]);
      }
    }
    setData(transformedFileList);
  }, [resource]);
  const handleDelete = (i) => {
    const newFileList = data.filter((item) => item.uid !== i);
    console.log(newFileList);
    setFileList(newFileList);
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
              label="Email"
              name={['contactInfo', 'email']}
              value={resource?.contactInfo?.email}
              rules={[
                {
                  required: true,
                  message: 'Please enter email address',
                },
              ]}
              placeholder="Please enter email address"
            />
            <ProFormText
              width="md"
              label="Contact Number"
              value={resource?.contactInfo?.phone}
              name={['contactInfo', 'phone']}
              rules={[
                {
                  required: true,
                  message: 'Please enter phone number',
                },
              ]}
              placeholder="Please enter phone number"
            />
            <ProFormSelect
              width="md"
              name="purpose"
              label="Purpose"
              value={resource.purpose}
              options={[
                {
                  value: 'rent',
                  label: 'Rent',
                },
                {
                  value: 'sell',
                  label: 'Sell',
                },
              ]}
              placeholder="Please select purpose"
              rules={[{ required: true, message: 'Please select purpose' }]}
              // onChange={(value, e) => setRole({ resourceId: value, resourceAlias: e.label })}
            />
            <ProFormSelect
              width="md"
              name="rentFrequency"
              value={resource.rentFrequency}
              label="Rent Frequency"
              options={[
                {
                  value: 'day',
                  label: 'Day',
                },
                {
                  value: 'week',
                  label: 'Week',
                },
                {
                  value: 'month',
                  label: 'Month',
                },
                {
                  value: 'year',
                  label: 'Year',
                },
              ]}
              placeholder="Please select rent frequency"
              rules={[{ required: true, message: 'Please select rent frequency' }]}
              // onChange={(value, e) => setRole({ resourceId: value, resourceAlias: e.label })}
            />
            <ProFormText
              width="md"
              label="Price"
              name="price"
              value={resource.price}
              rules={[
                {
                  required: false,
                  message: 'Please enter the Price',
                },
              ]}
              placeholder="Please enter resource Price"
            />
            <ProFormText
              width="md"
              label="furnishingStatus"
              name="furnishingStatus"
              value={resource.furnishingStatus}
              rules={[
                {
                  required: false,
                  message: 'Please enter the furnishingStatus',
                },
              ]}
              placeholder="Please enter resource furnishingStatus"
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
            <ProFormText
              width="md"
              label="isSold"
              value={resource.isSold}
              name="isSold"
              rules={[
                {
                  required: false,
                  message: 'Please enter the isSold',
                },
              ]}
              placeholder="Please enter the isSold"
            />
            <ProFormText
              width="md"
              label="Province"
              value={resource?.location?.province}
              name={['location', 'province']}
              rules={[
                {
                  required: true,
                  message: 'Please enter province',
                },
              ]}
              placeholder="Please enter province"
            />
            <ProFormText
              width="md"
              label="District"
              value={resource.location?.district}
              name={['location', 'district']}
              rules={[
                {
                  required: true,
                  message: 'Please enter district',
                },
              ]}
              placeholder="Please enter district"
            />
            <ProFormText
              width="md"
              label="Municipality"
              value={resource.location?.municipality}
              name={['location', 'municipality']}
              rules={[
                {
                  required: true,
                  message: 'Please enter municipality',
                },
              ]}
              placeholder="Please enter municipality"
            />
            <ProFormText
              width="md"
              label="Ward"
              value={resource.location?.ward}
              name={['location', 'ward']}
              rules={[
                {
                  required: true,
                  message: 'Please enter ward',
                },
              ]}
              placeholder="Please enter ward"
            />
            <ProFormText
              width="md"
              label="Tole"
              value={resource.location?.tole}
              name={['location', 'tole']}
              rules={[
                {
                  required: true,
                  message: 'Please enter tole',
                },
              ]}
              placeholder="Please enter ward"
            />
            <ProFormSelect
              width="md"
              label="highlights"
              value={resource.highlights}
              name="highlights"
              request={fetchHighlights}
              rules={[
                {
                  required: true,
                  message: 'Please enter highlights',
                },
              ]}
              placeholder="Please enter highlights"
              mode="multiple"
            />
            <ProFormSelect
              width="md"
              label="Amenities"
              value={resource.amenities}
              name="amenities"
              request={fetchAmenities}
              rules={[
                {
                  required: true,
                  message: 'Please enter amenities',
                },
              ]}
              placeholder="Please enter amenities"
              mode="multiple"
            />
            <ProFormSelect
              width="md"
              name="category"
              label="Category"
              request={fetchCategories}
              placeholder="Please select a category"
              rules={[{ required: true, message: 'Please select a category' }]}
              // onChange={(value, e) => {
              //   console.log(value, e);
              // }}
            />
            <ProFormSelect
              width="md"
              name="subCategory"
              label="Sub Category"
              request={fetchSubCategories}
              placeholder="Please select a sub category"
              rules={[{ required: true, message: 'Please select a sub category' }]}
              // onChange={(value, e) => {
              //   console.log(value, e);
              // }}
            />
            <ProFormSelect
              width="md"
              name="isFeatured"
              value={resource.isFeatured}
              label="Is Featured"
              options={[
                {
                  value: true,
                  label: 'True',
                },
                {
                  value: false,
                  label: 'False',
                },
              ]}
              placeholder="Please select a isFeatured"
              rules={[{ required: true, message: 'Please select a isFeatured' }]}
              // onChange={(value, e) => setRole({ resourceId: value, resourceAlias: e.label })}
            />
            <ProFormSelect
              width="md"
              name="hasPrice"
              label="Has Price"
              value={resource.hasPrice}
              options={[
                {
                  value: true,
                  label: 'True',
                },
                {
                  value: false,
                  label: 'false',
                },
              ]}
              placeholder="Please select a Has Price"
              rules={[{ required: true, message: 'Please select a Has Price' }]}
            />
            <ProFormText
              // width="md"
              // initialValue={mapIframe}
              readonly
              hidden
              name="mapIframe"
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please enter map Iframe',
              //   },
              // ]}
              // placeholder="Please enter mapIframe"
            />
            <GoogleMapComponent
              onLocationSelect={handleLocationSelect}
              latitude={latitude}
              longitude={longitude}
            />

            <label>Image</label>
            <div style={{display:'flex', gap:'5px'}}>

            {resource.images &&
                resource.images.map((img, i) => (
                  <div style={{display:"flex"}}>
                    <img
                      src={`${PhotoUrl}/${img}`}
                      alt="Resource Image"
                      style={{ width: '100%', height: '100%' }}
                      key={i}
                    />
                    <div>
                      <Button
                      onClick={()=>handleDelete(i)}
                        icon={<DeleteOutlined />}
                        size="small"
                      />
                    </div>
                  </div>
                ))}
            </div>
            <Upload
              listType="picture-card"
              // fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              multiple="true"
              className="upload-list-inline"
            >

              {'+ Upload'}
            </Upload>

            {/* {resource.images && (
                <div>
                  <img
                    src={`${PhotoUrl}/${resource.images[0]}`}
                    alt="Resource Image"
                    style={{ width: '100%', height: '100%' }}
                  />
                  <div >
                    <Button
                      onClick={() => setFileList([])}
                      icon={<DeleteOutlined />}
                      size="small"
                    />
                  </div>
                </div>
              )} */}
          </ProForm>
        </Card>
      </PageContainer>
    )
  );
};

export default EditForm;
