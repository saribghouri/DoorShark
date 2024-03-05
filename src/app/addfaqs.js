import {
  LoadingOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Divider, Form, Input, Select, Upload, message } from "antd";
import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import MainCategoryTable from "./category";
import SubCategory from "./Sub-Category";
import TextArea from "antd/es/input/TextArea";
import Faqs from "./faqs";

const AddFaqs = ({ handleShowCategories, id }) => {
  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(false);
  const { Option } = Select;
  const [categoryResponse, setCategoryResponse] = useState(null);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const selectedId = selectedOptionId;
  const [mainCategories, setMainCategories] = useState([]);
  console.log(mainCategories);
  const [category, setCategory] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("answer", values.answer);
      formData.append("question", values.question);

      const token = Cookies.get("apiToken");

      const requestBody = {
        question: values.question,
        answer: values.answer,
        mainCategoryId: selectedId,
      };

      const response = await fetch(
        "https://doorshark.blownclouds.com/api/adminRoute/createFaqs",
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

        setCategoryResponse(await response.json());
        setLoading(false);
        setCategory(true);
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
        <Faqs />
      ) : (
        <div>
          <div className="flex justify-between  pl-[10px] pr-[10px] ml-[16px] mr-[16px] items-center mt-[20px] mb-[40px]">
            <h1 className="Doctors text-[22px] text-[#054fb9] font-sans">
              FAQS
            </h1>
          </div>
          <Divider className="!w-[97%] text-[#054fb9] mt-[20px] flex justify-center mx-auto bg-[#054fb9] min-w-0" />
          <div className="border bg-[#fff] w-[40%] mx-auto rounded-[10px] mt-[40px] mb-[20px]">
            <div className=" justify-between flex items-center addCategory h-[100px] mb-[20px] rounded-t-[10px] w-[100%]">
              <h1 className="text-white font-bold text-[24px] ml-[20px] categorie">
                FAQS{" "}
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
                name="question"
                rules={[{ required: true, message: "Please enter question ?" }]}
              >
                <Input className="border" placeholder="Enter Question Name" />
              </Form.Item>
              <Form.Item
                className="w-[100%]"
                name="answer"
                rules={[
                  { required: true, message: "Please enter your answer here" },
                ]}
              >
                <TextArea placeholder="Enter Answer Here" rows={4} />
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
        </div>
      )}
    </div>
  );
};

export default AddFaqs;
