import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Upload, message } from "antd";
import Cookies from "js-cookie";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import axios from "axios";
import MainCategoryTable from "./category";
import PrivacyPolicy from "./privacyPolicy";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css"; 
import dynamic from "next/dynamic";
// import "../../node_modules/react-quill/dist/quill.snow.css";
// import { ReactQuill } from "react-quill";
const AddPolicy = () => {
  const [loading, setLoading] = useState(false);
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);

  const [policyResponse, setPolicyResponse] = useState(null);
  const [policy, setPolicy] = useState(false);
  const [policyName, setPolicyName] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("policy", values.policy);

      const token = Cookies.get("apiToken");

      const requestBody = {
        policy: values.policy,
      };

      const response = await fetch(
        "https://doorshark.blownclouds.com/api/adminRoute/privacyPolicy",
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
        message.success("policy added successfully");
        setPolicy(true);
        setPolicyResponse(await response.json());
        setLoading(false);
        handleShowCategories();
      } else {
        message.error("policy not added");
        setPolicyResponse(await response.json());
        setLoading(false);
      }
    } catch (error) {
      console.error("Error during policy registration:", error);
      setLoading(false);
    }
  };
  const onFinishFailed = (errorInfo) => {};

  return (
    <div>
      {policy ? (
        <PrivacyPolicy />
      ) : (
        <div>
          <div className="flex justify-between  pl-[10px] pr-[10px] ml-[16px] mr-[16px] items-center mt-[20px] mb-[40px]">
            <h1 className="Doctors text-[22px] text-[#054fb9] font-sans">
              Privacy Policy
            </h1>
          </div>
          <Divider className="!w-[97%] text-[#054fb9]  flex justify-center mx-auto bg-[#054fb9] min-w-0" />

          <div className=" bg-[#fff] w-[60%] mx-auto rounded-[10px] mt-[40px] mb-[20px]">
        <Form
          className="pl-[50px] pr-[50px]"
          name="loginForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            className="w-[100%]"
            name="policy"
            rules={[{ required: true, message: "Please enter your policy!" }]}
          >
            <ReactQuill 
            className="h-auto"
              theme="snow" 
              value={policyName}
              onChange={setPolicyName}
              placeholder="Add Privacy Policy Here"
            />
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

export default AddPolicy;
