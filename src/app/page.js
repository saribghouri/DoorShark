"use client";
import React, { useEffect, useState } from "react";

import Cookies from "js-cookie";
import Image from "next/image";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useUser } from "./UserContext";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { user } = useUser();
  console.log("user", user);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useUser();

  const baseUrl = "https://doorshark.blownclouds.com/api";
  // const baseUrl = "http://localhost:8000/api/";
  const logins = `${baseUrl}/authRoute/login`;
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await fetch(loginEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        Cookies.set("apiToken", data.data.token);

        if (rememberMe) {
          localStorage.setItem("rememberedUser", JSON.stringify(values));
        } else {
          localStorage.removeItem("rememberedUser");
        }

        login(data);
        router.push("/dashboard");
      } else {
        message.error("Failed to login. Invalid Credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };
  return (
    <div
      className="flex min-h-screen flex-col justify-center items-center  "
      style={{
        backgroundImage: `url("/assets/images/Rectangle.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="text-[22px]">
        <h1 className="text-white text-center">
          <Image
            width={537}
            height={127}
            alt=""
            className=""
            quality={50}
            src="/assets/images/doorsharklogo.png"
          />
        </h1>
      </div>
      <Form
        className=" flex justify-center flex-col !w-[30%]  items-center  "
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h1 className="w-[100%] mb-[20px]  text-white text-[30px] flex justify-center text-center">
          Login
        </h1>
        <Form.Item
          className=""
          name="email"
          rules={[
            {
              required: true,
              message: (
                <span style={{ color: "white" }}>Please input your email!</span>
              ),
            },
          ]}
        >
          <Input
            placeholder="Email address"
            className="rounded-l-[20px] rounded-r-[20px]  w-[300px]  "
          />
        </Form.Item>

        <Form.Item
          className=" "
          name="password"
          rules={[
            {
              required: true,
              message: (
                <span style={{ color: "white" }}>
                  Please input your password!
                </span>
              ),
            },
          ]}
        >
          <Input.Password
            placeholder="Password"
            className="rounded-l-[20px] rounded-r-[20px] w-[300px]  "
          />
        </Form.Item>

        <Form.Item
          className="fex justify-start w-[300px]  mt-[-15px] tex"
          name="remember"
          valuePropName="checked"
        >
          <Checkbox
            className="text-white mt-[20px]"
            onChange={handleRememberMeChange}
          >
            Remember me
          </Checkbox>
        </Form.Item>
        <Form.Item className="w-[100%] flex justify-center">
          <Button
            type="enter"
            className="bg-[#054FB9] !text-white border-none flex justify-center rounded-l-[20px] rounded-r-[20px] w-[150px]"
            htmlType="submit"
            loading={loading}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Page;
