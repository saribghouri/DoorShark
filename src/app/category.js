"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  Modal,
  Button,
  Input,
  Divider,
  Upload,
  Switch,
  message,
  Form,
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import {
  DeleteOutlined,
  EyeOutlined,
  LoadingOutlined,
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import AddCategories from "./AddCategory";

const MainCategoryTable = () => {
  const [mainCategories, setMainCategories] = useState([]);
  console.log(mainCategories);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedCategory, setEditedCategory] = useState(null);
  console.log(selectedCategory);
  const [form] = Form.useForm();
  useEffect(() => {
    const fetchMainCategories = async () => {
      setLoading(true);
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
  const dataSource = Array.isArray(mainCategories)
    ? mainCategories.map((user, index) => ({
        key: (index + 1).toString(),
        maincatname: user.maincatname,

        contact: user.phonenumber,
        address: user.email,
        about: user.about,
        dob: user.dob,
        company: user.company,
        gender: user.gender,
        collage: user.collage,
        location: user.location,
        job: user.job,
        status: user.isActive,
        id: user._id,
        maincatpic: user.maincatpic,
      }))
    : [];

  const filteredCategories = dataSource.filter((category) =>
    category.maincatname.toLowerCase().includes(searchText.toLowerCase())
  );
  const handleDelete = async () => {
    try {
      if (!selectedCategory) {
        console.error("No category selected for deletion");
        return;
      }

      const token = Cookies.get("apiToken");
      await axios.delete(
        `https://doorshark.blownclouds.com/api/adminRoute/dltMainCat/${selectedCategory.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMainCategories(
        mainCategories.filter((cat) => cat._id !== selectedCategory.id)
      );
      setModalVisible(false);
    } catch (error) {
      console.error("Error deleting main category:", error);
    }
  };

  const columns = [
    {
      title: "Main Category Image",
      dataIndex: "maincatpic",
      key: "maincatpic",
      render: (text, record) => (
        console.log(record),
        <img
          src={text}
          style={{ width: 50, height: 50, borderRadius: "50%" }}
          alt="Category"
        />
      ),
    },
    {
      title: "Category Name",
      dataIndex: "maincatname",
      key: "maincatname",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Switch
          checked={status === true}
          onChange={(checked) => onChange(checked, record.id)}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        console.log(record),
        (
          <div>
            <DeleteOutlined
              className="text-[#ffffff] bg-[#054fb9] p-[5px] rounded-[50%] ml-[10px] text-[18px]"
              type="link"
              danger
              onClick={() => {
                setSelectedCategory(record);
                setModalVisible(true);
              }}
            />

            <EyeOutlined
              onClick={() =>{ 
                setSelectedCategory(record);
                handleEdit(record)
              }}
              className="text-[#ffffff] bg-[#054fb9] p-[5px] rounded-[50%] ml-[10px] text-[18px]"
            />
            {/* <Button
            type="link"
            // Handle edit action
          >
            Edit
          </Button> */}
          </div>
        )
      ),
    },
  ];
  const handleEdit = (category) => {
    setSelectedCategory(category);
    setEditCategoryName(category.maincatname);
    setEditedCategory({ ...category });
    setImageUrl(category.maincatpic);
    setEditModalVisible(true);
  };

  const handleSaveEdit = async () => {
    try {
      const token = Cookies.get("apiToken");
      console.log(token);
      await axios.patch(
        `https://doorshark.blownclouds.com/api/adminRoute/editMainCat/${selectedCategory.id}`,
        editedCategory,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
           
            maincatpic: imageUrl,
            maincatname: form.getFieldValue("name"),
          }),
        }
      );

      setMainCategories(
        mainCategories.map((cat) =>
          cat._id === selectedCategory.id ? editedCategory : cat
        )
      );
      setEditModalVisible(false);
    } catch (error) {
      console.error("Error editing main category:", error);
    }
  };
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type;
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setLoading(false);
        setImageUrl(imageUrl);

        setEditedCategory((prevState) => ({
          ...prevState,
          maincatpic: imageUrl,
        }));
      });
    }
  };

  const onChange = async (checked, userId) => {
    console.log(userId);
    try {
      const token = Cookies.get("apiToken");
      const status = checked ? true : false;

      const requestBody = {
        categoryId: userId,
        isActive: status,
      };

      const response = await axios.patch(
        `https://doorshark.blownclouds.com/api/adminRoute/toggleCategory`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedUsers = mainCategories.map((user) => {
          if (user._id === userId) {
            return { ...user, isActive: checked };
          }
          return user;
        });
        setMainCategories(updatedUsers);
        message.success(`User set to ${status} successfully`);
      } else {
        message.error("Failed to update user status");
      }
    } catch (error) {
      console.error("Error updating user status: ", error);
      message.error("An error occurred while updating user status");
    }
  };

  const handleUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(
        "https://doorshark.blownclouds.com/api/cloudinary/UploadDocumentToCloudinaryAndGetPublicUrl",
        formData
      );

      setImageUrl(response.data.image_url[0]);
      // setUserProfileImage(response.data.image_url[0]);
      // message.success("Image uploaded successfully");
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
  const handleCancel = () => {
    setModalVisible(false);
  };
  const handleEditCancel = () => {
    setEditModalVisible(false);
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        className="w-[100%]"
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
      {isEditing ? (
        <AddCategories onCancel={() => setIsEditing(false)} />
      ) : (
        <div>
          <div className="flex justify-between  pl-[10px] pr-[10px] ml-[16px] mr-[16px] items-center mt-[30px] mb-[30px]">
            <h1 className="Doctors text-[#054fb9]  text-[22px] font-sans">
              Category
            </h1>
            <div className=" flex gap-[5px]">
              <Input
                className="w-[300px] rounded-[40px]"
                placeholder="Search"
                suffix={<SearchOutlined style={{ color: "rgba(0,0,0,.45)" }} />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button
                onClick={() => {
                  setIsEditing(true);
                }}
                className="!text-[#ffffff] bg-[#054fb9] text-[18px]  rounded-r-[10px] rounded-l-[10px] w-[150px] h-[40px]"
              >
                Add Category
              </Button>
            </div>
          </div>
          <Divider className="!w-[96%] text-[#054fb9] m flex justify-center mx-auto bg-[#054fb9] min-w-0" />
          <Table
            columns={columns}
            dataSource={filteredCategories}
            loading={loading}
            rowKey="id"
          />

          <Modal
            className="bg-[]"
            open={modalVisible}
            onOk={handleDelete}
            footer={null}
            onCancel={() => setModalVisible(false)}
            style={{
              width: "534px",
              height: " 369px",
            }}
          >
            <div className=" gap-2 flex justify-center items-center flex-col h-[250px]">
              <DeleteOutlined
                className=" flex justify-center items-center text-[#ffffff] w-[85px] h-[85px] bg-[#054fb9] p-[5px] rounded-[50%] ml-[10px] text-[50px]"
                type="link"
                danger
              />

              <h1 className="font-bold text-[22px]">DELETE CATEGORY</h1>
              <p className=" text-[16px]">
                Are you sure you want to delete this category{" "}
                {selectedCategory?.maincatname}?
              </p>
              <div className="flex mt-[10px] gap-[15px]">
                <Button
                  className="bg-[#ffffff] !text-[#054fb9] text-[18px] rounded-l-[20px] w-[150px] h-[40px]"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button
                  className="!text-[#054fb9] bg-[#ffffff] text-[18px]  rounded-r-[20px] w-[150px] h-[40px]"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Modal>

          <Modal
            open={editModalVisible}
            onCancel={() => setEditModalVisible(false)}
            footer={null}
          >
            <h1 className="font-bold text-[22px] text-center">Edit Category</h1>
            <div className="w-full flex justify-center items-center flex-col mt-[20px]">
              {" "}
              <Upload
                name="avatar"
                listType="picture-card"
                className=" !w-[100%]"
                showUploadList={false}
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                beforeUpload={beforeUpload}
                customRequest={customRequest}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="avatar"
                    className=" h-[90px] mt-[15px] mb-[15px]"
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </div>
            <Input
              className="w-[98%] mt-[20px]"
              value={editedCategory?.maincatname}
              rules={[
                { required: true, message: "Please enter your categorieName!" },
              ]}
              onChange={(e) =>
                setEditedCategory({
                  ...editedCategory,
                  maincatname: e.target.value,
                })
              }
            />
            <div className="w-[100%] flex justify-center items-center gap-[20px] mt-[40px] mb-[30px]">
              <Button
                onClick={handleSaveEdit}
                className="!text-[#054fb9] bg-[#ffffff] text-[18px]  rounded-l-[20px] w-[150px] h-[40px]"
              >
                Save
              </Button>
              <Button
                className="!text-[#054fb9] bg-[#ffffff] text-[18px]  rounded-r-[20px] w-[150px] h-[40px]"
                onClick={handleEditCancel}
              >
                cancel
              </Button>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default MainCategoryTable;
