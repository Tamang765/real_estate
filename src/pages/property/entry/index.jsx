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
  ProFormUploadButton,
} from '@ant-design/pro-form';
import { useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { getAmenities, getCategory, getHighlights, getSubCategory, save, uploadMultipleImage } from '../service';
import { Municipality } from '@/data/Municipalities';
import { Districts } from '@/data/Districts';
import GoogleMapComponent from '@/data/GoogleMapComponent';

const EntryForm = (props) => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [mapIframe, setMapIframe] = useState(`<iframe src="https://maps.google.com/maps?q=${latitude},${longitude}"></iframe>`);
  const [fileList, setFileList] = useState([]);

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
  const fetchAmenities= async () => {
    const result= await getAmenities();
    const options= result.data.map(r => ({label:r.alias, value:r._id}));
    return options;
  }
  const fetchHighlights = async () => {
    const result = await getHighlights();
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
    console.log(values)
    const {
      name,
      purpose,
      furnishingStatus,
      rentFrequency,
      price,
      description,
      category,
      subCategory,
      room,
      noOfFlat,
      bathroom,
      area,
      isFeatured,
      hasPrice,
    } = values;
    
    const location= {
      ward: values.ward,
      province:values.province,
      district:values.district,
      municipality:values.municipality,
      tole:values.tole

    }
    const contactInfo={
      email:values.email,
      phone:values.phone
    }
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
    formData.append('room', room);
    formData.append('area', area);
    formData.append('noOfFlat', noOfFlat);
    formData.append('bathroom', bathroom);


    for (const key in amenitiesObj) {
      formData.append("amenities", amenitiesObj[key]);
    }
  
    for (const key in highlightsObj) {
      formData.append("highlights", highlightsObj[key]);
    }

    // for (const key in values) {
    //   formData.append(key, values[key]);
    // }
    for (const file of fileList) {
      formData.append("images", file.originFileObj);
    }
    formData.append('mapIframe', values.mapIframe)

    for (var pair of formData.entries()) {
      console.log(pair[0]+"====== "+pair[1]);
    }
    
    const result = await save(formData);
    console.log('resource', result);
    if (result instanceof Error) {
      message.error(result.message);
    }
    else {
      message.success(result.message);
      form.resetFields();
      setRole(null);
    }
  };
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

  console.log(latitude);
  useEffect(()=>{
    setMapIframe(`<iframe src="https://maps.google.com/maps?q=${latitude},${longitude}"></iframe>`);

    form.setFieldsValue({
      mapIframe: `<iframe src="https://maps.google.com/maps?q=${latitude},${longitude}"></iframe>`
    });
  },[latitude, longitude])

  console.log(form.getFieldValue("mapIframe"))

  const uploadImage=async()=>{
    for (const file of fileList) {
      const response= await uploadMultipleImage(file.originFileObj)
      console.log(response);
    }
  }

  useEffect((
  )=>{
uploadImage()
  },[fileList])
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
            label="Email"
            name="email"
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
            name="phone"
            rules={[
              {
                required: true,
                message: 'Please enter phone number',
              },
            ]}
            placeholder="Please enter phone number"
          />
                     <ProFormText
            // width="md"
            initialValue={mapIframe}
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
             <ProFormSelect
            width="md"
            name="purpose"
            label="Purpose"
            options={[
              {
                value: "rent",
                label: "Rent",
              },
              {
                value: "sale",
                label: "Sale",
              },
            ]}
            placeholder="Please select purpose"
            rules={[{ required: true, message: 'Please select purpose' }]}
          />
                    <ProFormSelect
            width="md"
            name="highlights"
            label="Highlights"
            request={fetchHighlights}
 mode='multiple'
            placeholder="Please select highlights"
            rules={[{ required: true, message: 'Please select highlights' }]}
          />
                       <ProFormSelect
            width="md"
            name="amenities"
            label="Amenities"
            request={fetchAmenities}
            mode='multiple'
 
            placeholder="Please select highlights"
            rules={[{ required: true, message: 'Please select highlights' }]}
          />
         <ProFormSelect
            width="md"
            name="furnishingStatus"
            label="furnishingStatus"
            options={[
              {
                value: "not-furnished",
                label: "Not Furnished",
              },
              {
                value: "semi-furnished",
                label: "Semi Furnished",
              },
              {
                value: "fully-furnished",
                label: "Fully Furnished",
              },
            ]}
            placeholder="Please select furnishingStatus"
            rules={[{ required: true, message: 'Please select furnishingStatus' }]}
          />
                     <ProFormSelect
            width="md"
            name="rentFrequency"
            label="Rent Frequency"
            options={[
              {
                value: "day",
                label: "Day",
              },
              {
                value: "week",
                label: "Week",
              },
              {
                value: "month",
                label: "Month",
              },
              {
                value: "year",
                label: "Year",
              },
            ]}
            placeholder="Please select purpose"
            rules={[{ required: true, message: 'Please select purpose' }]}
          // onChange={(value, e) => setRole({ resourceId: value, resourceAlias: e.label })}
          />
                   <ProFormText
            width="md"
            label="Price"
            name="price"
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
            label="Room"
            name="room"
            rules={[
              {

                required: false,
                message: 'Please enter the room',
              },
            ]}
            placeholder="Please enter the room"
          />
                 <ProFormText
            width="md"
            label="No of Flats"
            name="noOfFlat"
            rules={[
              {
                required: false,
                message: 'Please enter the no of flats',
              },
            ]}
            placeholder="Please enter the no of flats"
          />
                 <ProFormText
            width="md"
            label="bathroom"
            
            name="bathroom"
            rules={[
              {

                required: false,
                message: 'Please enter the bath',
              },
            ]}
            placeholder="Please enter the bath"
          />
                 <ProFormText
            width="md"
            label="Area"
            name="area"
            rules={[
              {
                required: false,
                message: 'Please enter the area',
              },
            ]}
            placeholder="Please enter the area"
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
            <ProFormText
            width="md"
            label="Province"
            name="province"
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
            name="district"
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
            name="municipality"
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
            name="ward"
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
            name="tole"
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
            label="Is Featured"
            options={[
              {
                value: "true",
                label: "True",
              },
              {
                value: "false",
                label: "False",
              },
            ]}
            placeholder="Please select a isFeatured"
            rules={[{ required: true, message: 'Please select a isFeatured' }]}
          // onChange={(value, e) => setRole({ resourceId: value, resourceAlias: e.label })}
          />
                  <GoogleMapComponent onLocationSelect={handleLocationSelect} latitude={latitude} longitude={longitude} />
       <ProFormSelect
            width="md"
            name="hasPrice"
            label="Has Price"
            options={[
              {
                value: "true",
                label: "True",
              },
              {
                value: "false",
                label: "false",
              },
            ]}
            placeholder="Please select a Has Price"
            rules={[{ required: true, message: 'Please select a Has Price' }]}
          // onChange={(value, e) => setRole({ resourceId: value, resourceAlias: e.label })}
          />
          <label>Image</label>
        <Upload
                      listType="picture-card"
                      fileList={fileList}
                      onChange={onChange}
                      onPreview={onPreview}
                    multiple="true"
                    >
                      {fileList.length < 5 && "+ Upload"}
                    </Upload>
        </ProForm>
      </Card> 
    </PageContainer>
  );
};

export default EntryForm;
