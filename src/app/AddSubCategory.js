import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Upload, message } from "antd";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import MainCategoryTable from "./category";
import SubCategory from "./Sub-Category";

const AddSubCategories = ({ handleShowCategories, id }) => {
  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(false);
  const { Option } = Select;
  const [categoryResponse, setCategoryResponse] = useState(null);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const selectedId = selectedOptionId
  const [mainCategories, setMainCategories] = useState([]);
console.log(mainCategories)
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
  const handleSelectChange = (value) => {
    // yahan option ki ID ko use karke kuch kar sakte hain, jaise state mein store kar dena
    console.log("Selected Option ID:", value);
    // Agar aapko onFinish mein bhi is ID ko bhejna hai, to usko store kar sakte hain
    setSelectedOptionId(value);
  };
  const onFinish = async (values) => {
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("catname", values.catname);

      const token = Cookies.get("apiToken");

      const requestBody = {
        catname: values.catname,
        mainCategoryId: selectedId
      };

      const response = await fetch(
        "https://doorshark.blownclouds.com/api/adminRoute/addSubCategory",
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

  useEffect(() => {
    const fetchMainCategories = async () => {
      try {
        const token = Cookies.get("apiToken");

        const response = await axios.get(
          `https://doorshark.blownclouds.com/api/adminRoute/getMainCategory`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMainCategories(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching main categories:", error);
        setLoading(false);
      }
    };

    fetchMainCategories();
  }, []);

  return (
    <div>
      {category ? (
        <SubCategory />
      ) : (
        <div className="border bg-[#fff] w-[60%] mx-auto rounded-[10px] mt-[40px] mb-[20px]">
          <div className=" justify-between flex items-center addCategory h-[100px] mb-[20px] rounded-t-[10px] w-[100%]">
            <h1 className="text-white font-bold text-[24px] ml-[20px] categorie">
              Add Sub Category
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
        
              name="Select"
              rules={[{  message: "Please input!" }]}
            >
           <Select placeholder="Select Category" onChange={(value) => handleSelectChange(value)}>
                {mainCategories.map((category) => (
                    <Option key={category._id} value={category._id}>
                    {category.maincatname}
                  </Option>
                ))}
      
              </Select>
            </Form.Item>
            <Form.Item
              className="w-[100%]"
              name="catname"
              rules={[
                { required: true, message: "Please enter your categorieName!" },
              ]}
            >
              <Input className="h-[40px] border" placeholder="Enter Sub Category Name" />
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

export default AddSubCategories;
