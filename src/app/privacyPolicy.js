import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Upload, message } from "antd";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import MainCategoryTable from "./category";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles
const PrivacyPolicy = () => {
  const [loading, setLoading] = useState(false);

  const [policyResponse, setPolicyResponse] = useState(null);
  const [policy, setPolicy] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [editedPolicy, setEditedPolicy] = useState("");

  console.log(policyResponse);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const token = Cookies.get("apiToken");
        const response = await fetch(
          "https://doorshark.blownclouds.com/api/user/getPrivacyPolicy",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setPolicyResponse(data.data.policy);

        const initialEditModeState = {};
        data.data.forEach((item) => {
          initialEditModeState[item.id] = false;
        });
        setEditMode(initialEditModeState);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchPolicy();
  }, []);
  const onFinishFailed = (errorInfo) => {};
  const handleEdit = () => {
    setEditedPolicy(policyResponse);
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const token = Cookies.get("apiToken");
      await axios.post(
        "https://doorshark.blownclouds.com/api/adminRoute/privacyPolicy",
        {
          policy: editedPolicy,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Privacy Policy updated successfully");
      setPolicyResponse(editedPolicy);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating Privacy Policy:", error);
      message.error("Failed to update Privacy Policy");
    }
  };

  return (
    <div>
      <div className="flex justify-between pl-[10px] pr-[10px] ml-[16px] mr-[16px] items-center mt-[20px] mb-[40px]">
        <h1 className="Doctors text-[22px] text-[#054fb9] font-sans">
          Privacy Policy
        </h1>
        {!editMode && (
          <Button
            onClick={handleEdit}
            className="!text-[#ffffff] bg-[#054fb9] text-[18px]  rounded-r-[10px] rounded-l-[10px] w-[150px] h-[40px]"
          >
            Edit
          </Button>
        )}
      </div>
      <Divider className="!w-[97%] text-[#054fb9]  flex justify-center mx-auto bg-[#054fb9] min-w-0" />

      <div className="bg-[#fff] w-[60%] mx-auto rounded-[10px] mt-[40px] mb-[20px]">
        {editMode ? (
          <Form.Item>
            {/* <Input.TextArea
              rows={10}
              value={editedPolicy}
              onChange={(e) => setEditedPolicy(e.target.value)}
            /> */}
            <ReactQuill
              className="h-auto"
              theme="snow"
              value={editedPolicy}
              onChange={setEditedPolicy} // No need for e.target.value here
            />
            <Button className="text" onClick={handleSave}>
              Save
            </Button>
          </Form.Item>
        ) : (
          <div
            className="border p-[22px] rounded-[28px]"
            dangerouslySetInnerHTML={{ __html: policyResponse }}
          />
        )}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
