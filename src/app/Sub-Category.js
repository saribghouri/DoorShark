"use client";
import { DeleteOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Table, message, Divider, Switch, Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import AddSubCategories from "./AddSubCategory";
const SubCategory = () => {
  const [searchText, setSearchText] = useState("");

  const [selectedUser, setSelectedUser] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [items, setItems] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [editedCategory, setEditedCategory] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const ids = items.map((item) => item._id);
  console.log(selectedCategory);
  const columns = [
    { title: "Sr", dataIndex: "key", key: "serialNumber" },
    { title: " Sub Category", dataIndex: "catname", key: "catname" },
    { title: " Category", dataIndex: "maincatname", key: "maincatname" },

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
        <div>
          <DeleteOutlined
            className="text-[#ffffff] bg-[#054fb9] p-[5px] rounded-[50%] ml-[10px] text-[18px]"
            type="link"
            onClick={() => {
              setSelectedCategory(record);
              setModalVisible(true);
            }}
          />

          <EyeOutlined
            onClick={() => {
              handleEdit(record);
              setSelectedCategory(record);
            }}
            className="text-[#ffffff] bg-[#054fb9] p-[5px] rounded-[50%] ml-[10px] text-[18px]"
          />
        </div>
      ),
    },
  ];

  const fetchItems = async (page) => {
    setIsLoading(true);
    try {
      const token = Cookies.get("apiToken");
      const response = await axios.get(
        `https://doorshark.blownclouds.com/api/adminRoute/getSubCategory`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (Array.isArray(response.data.data)) {
        setItems(response.data.data);
        setCurrentPage(page);
        setTotalPages(Math.ceil(response.data.total / response.data.per_page));
      } else {
        console.error("Invalid response data format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(currentPage);
  }, [currentPage]);

  const dataSource = Array.isArray(items)
    ? items.map((user, index) => ({
        key: (index + 1).toString(),
        catname: user.catname,
        maincatname: user.mainCategoryId ? user.mainCategoryId.maincatname : "",
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
        profileImage: user.profileImage,
      }))
    : [];

  const filteredData = dataSource.filter(
    (doctor) =>
      (doctor.catname &&
        doctor.catname.toLowerCase().includes(searchText.toLowerCase())) ||
      (doctor.address &&
        doctor.address.toLowerCase().includes(searchText.toLowerCase()))
  );

  const onChange = async (checked, userId) => {
    console.log(userId);
    try {
      const token = Cookies.get("apiToken");
      const status = checked ? true : false;

      const requestBody = {
        subCategoryId: userId,
        isActive: status,
      };

      const response = await axios.patch(
        `https://doorshark.blownclouds.com/api/adminRoute/toggleSubCategory`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedUsers = items.map((user) => {
          if (user._id === userId) {
            return { ...user, isActive: checked };
          }
          return user;
        });
        setItems(updatedUsers);
        message.success(`User set to ${status} successfully`);
      } else {
        message.error("Failed to update user status");
      }
    } catch (error) {
      console.error("Error updating user status: ", error);
      message.error("An error occurred while updating user status");
    }
  };
  const handleDelete = async () => {
    try {
      if (!selectedCategory) {
        console.error("No category selected for deletion");
        return;
      }

      const token = Cookies.get("apiToken");
      await axios.delete(
        `https://doorshark.blownclouds.com/api/adminRoute/dltSubCat/${selectedCategory.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setItems(items.filter((cat) => cat._id !== selectedCategory.id));
      setModalVisible(false);
    } catch (error) {
      console.error("Error deleting main category:", error);
    }
  };
  const handleEdit = (category) => {
    setSelectedCategory(category);
    setEditedCategory({ ...category });
    setEditCategoryName(category.catname);
    setEditModalVisible(true);
  };
  const handleSaveEdit = async () => {
    try {
      const token = Cookies.get("apiToken");
      await axios.patch(
        `https://doorshark.blownclouds.com/api/adminRoute/editSubCat/${selectedCategory.id}`,
        { catname: editedCategory.catname },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const updatedItems = items.map((item) => {
        if (item._id === selectedCategory.id) {
          return { ...item, catname: editedCategory.catname };
        }
        return item;
      });
  
      setItems(updatedItems);
      setEditModalVisible(false);
    } catch (error) {
      console.error("Error editing main category:", error);
    }
  };
  const handleCancel = () => {
    setModalVisible(false);
  };
  return (
    <div>
      {isEditing ? (
        <AddSubCategories
          user={selectedUser}
          onCancel={() => setSelectedUser(null)}
        />
      ) : (
        <div>
          <div className="flex justify-between  pl-[10px] pr-[10px] ml-[16px] mr-[16px] items-center mt-[30px] mb-[30px]">
            <h1 className="Doctors text-[#054fb9]  text-[22px] font-sans">
              Sub Category
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
                className="!text-[#ffffff] bg-[#054fb9] text-[16px] !pl-[-15px]  rounded-r-[10px] rounded-l-[10px]  h-[40px]"
              >
                Add Sub Category
              </Button>
            </div>
          </div>
          <Divider className="!w-[95%] text-[#054fb9] flex justify-center mx-auto bg-[#054fb9] min-w-0" />

          <Table
            columns={columns}
            dataSource={filteredData}
            // pagination={false}
            loading={isLoading}
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

              <h1 className="font-bold text-[22px]">DELETE SUB CATEGORY</h1>
              <p className=" text-[16px]">
                Are you sure you want to delete this sub-category{" "}
                {/* {selectedCategory?.maincatname}? */}
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
            <h1 className="font-bold text-[22px] text-center">
              Edit Sub Category
            </h1>
            <Input
              className="w-[98%] mt-[20px]"
              value={editedCategory?.catname}
              onChange={(e) =>
                setEditedCategory({
                  ...editedCategory,
                  catname: e.target.value,
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
                onClick={() => setEditModalVisible(false)}
                className="!text-[#054fb9] bg-[#ffffff] text-[18px]  rounded-r-[20px] w-[150px] h-[40px]"
              >
                Cancel
              </Button>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default SubCategory;
