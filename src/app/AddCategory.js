import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload, message } from "antd";
import Cookies from "js-cookie";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import MainCategoryTable from "./category";

const AddCategories = ({ handleShowCategories }) => {
  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(false);

  const [categoryResponse, setCategoryResponse] = useState(null);
  const [category, setCategory] = useState(false);

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG files!");
      return false;
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
      return false;
    }

    return true;
  };
  const onFinish = async (values) => {
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("maincatname", values.maincatname);

      if (values.upload && values.upload.length > 0) {
        formData.append("maincatpic", values.upload[0].originFileObj);
      }

      const token = Cookies.get("apiToken");

      const requestBody = {
        maincatname: values.maincatname, 
        maincatpic:
        imageUrl,
      };

      const response = await fetch(
        "https://doorshark.blownclouds.com/api/adminRoute/addMainCategory",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json", 
          },
          body: JSON.stringify(requestBody), 
        }
      );

      if (response.ok) {
        message.success("category added successfully");
        setCategory(true);
        setCategoryResponse(await response.json());
        setLoading(false);
        handleShowCategories();
      } else {
        message.error("category not added");
        setCategoryResponse(await response.json());
        setLoading(false);
      }
    } catch (error) {
      console.error("Error during category registration:", error);
      setLoading(false);
    }
  };
  const onFinishFailed = (errorInfo) => {};
  const handleUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(
        "https://doorshark.blownclouds.com/api/cloudinary/UploadDocumentToCloudinaryAndGetPublicUrl",
        formData
      );

      setImageUrl(response.data.image_url[0]);

      message.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      message.error("Failed to upload image");
    }
  };

  const customRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
      handleUpload(file);
    }, 0);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        className="!w-[100%]"
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <div>
      {category ? (
        <MainCategoryTable />
      ) : (
      <div className="border bg-[#fff] w-[60%] mx-auto rounded-[10px] mt-[40px] mb-[20px]">
        <div className=" justify-between flex items-center addCategory h-[100px] mb-[20px] rounded-t-[10px] w-[100%]">
          <h1 className="text-white font-bold text-[24px] ml-[20px] categorie">
            Add Category
          </h1>
        </div>

        <Form
          className="pl-[50px] pr-[50px]"
          name="loginForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            className="w-[100%]"
            name="maincatname"
            rules={[
              { required: true, message: "Please enter your categorieName!" },
            ]}
          >
            <Input className="border" placeholder="Enter Category Name" />
          </Form.Item>

          <Form.Item
            className="h-[50px]"
            name="upload"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
            extra=" "
            rules={[
              { required: true, message: "Please upload your doctor image!" },
            ]}
          >
            <Upload
              name="upload"
              listType="picture-card"
              className="avatar-uploader w-[100%]"
              showUploadList={false}
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              beforeUpload={beforeUpload}
              customRequest={customRequest}
            >
              {imageUrl && typeof imageUrl === "string" ? (
                <img width={100} height={100} src={imageUrl} alt="avatar" />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <div className=" flex justify-between mt-[80px]">
            <Form.Item></Form.Item>
            <Form.Item>
              <Button
                loading={loading}
                className="bg-[#054fb9] w-[150px] !text-white"
                htmlType="submit"
              >
                Add
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
       )} 
    </div>
  );
};

export default AddCategories;
