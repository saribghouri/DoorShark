"use client";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Input, Table, message, Divider, Switch, Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import UserProfile from "./userProfile";
import axios from "axios";
const Customer = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const ids = items.map((item) => item._id);
  console.log(ids);
  const columns = [
    { title: "Sr", dataIndex: "key", key: "serialNumber" },
    { title: "Name", dataIndex: "name", key: "userName" },
    { title: "Email", dataIndex: "address", key: "emailAddress" },
    { title: "Phone No:", dataIndex: "contact", key: "Phone" },
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
      dataIndex: "id",
      key: "action",
      render: (id, record) => (
        <div>
          <DeleteOutlined
            className="text-[#ffffff] bg-[#054fb9] p-[5px] rounded-[50%] ml-[10px] text-[18px]"
            type="link"
            
            onClick={() => {
              setSelectedUser(record);
              setSelectedUserId(record.id);
              setModalVisible(true);
            }}
          />
          <EyeOutlined
            className="text-[#ffffff] bg-[#054fb9] p-[5px] rounded-[50%] ml-[10px] text-[18px]"
            type="link"
            // onClick={() => {
            //   setSelectedUser(record);
            //   setIsEditing(true);
            // }}
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
        `https://doorshark.blownclouds.com/api/adminRoute/getCustomerDetails`,
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
        name: user.name,
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
        (!searchText ||  // Check if search text is empty
          (doctor.name &&
            !/(w.*o|o.*w)/i.test(doctor.name) &&
            new RegExp('^' + searchText[0], 'i').test(doctor.name) &&
            doctor.name.toLowerCase().includes(searchText.toLowerCase())) ||
          (doctor.address &&
            !/(w.*o|o.*w)/i.test(doctor.address) &&
            new RegExp('^' + searchText[0], 'i').test(doctor.name) &&
            doctor.address.toLowerCase().includes(searchText.toLowerCase()))
        )
    );
  const handleCancel = () => {
    setModalVisible(false);
  };
  const onChange = async (checked, userId) => {
    try {
      const token = Cookies.get("apiToken");
      const status = checked ? "ACTIVE" : "NOT ACTIVE";

      const requestBody = {
        _id: userId,
        status: status,
      };

      const response = await axios.patch(
        `https://doorshark.blownclouds.com/api/adminRoute/toggleStatus`,
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
        message.success(`User set to ${status.toLowerCase()} successfully`);
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
      if (!selectedUser) {
        console.error("No user selected for deletion");
        return;
      }
  
      const token = Cookies.get("apiToken");
      await axios.delete(
        `https://doorshark.blownclouds.com/api/adminRoute/dltCusOrCont/${selectedUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setItems(items.filter((user) => user._id !== selectedUser.id));
      setModalVisible(false);
      message.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error("An error occurred while deleting user");
    }
  };

  return (
    <div>
      {isEditing ? (
        <UserProfile
          user={selectedUser}
          onCancel={() => setSelectedUser(null)}
        />
      ) : (
        <div>
          <div className="flex justify-between  pl-[10px] pr-[10px] ml-[16px] mr-[16px] items-center mt-[20px] mb-[20px]">
            <h1 className="Doctors text-[22px] text-[#054fb9] font-sans">
            Customer
            </h1>
            <Input
              className="w-[300px] rounded-[40px]"
              placeholder="Search"
              suffix={<SearchOutlined style={{ color: "rgba(0,0,0,.45)" }} />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <Divider className="!w-[95%] text-[#054fb9] flex justify-center mx-auto bg-[#054fb9] min-w-0" />

          <Table
            columns={columns}
            dataSource={filteredData}
            // pagination={false}
            loading={isLoading}
          />
          {/* <div className="flex justify-end mb-[50px] mt-[20px] mr-[10px]">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              <ArrowLeftOutlined
                className="text-[#ffffff] bg-[#054fb9] p-[5px] rounded-[50%] ml-[10px] text-[18px]"
                type="link"
              />
            </button>
            <span className="count">{currentPage}</span>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages}
            >
              <ArrowRightOutlined
                className="text-[#ffffff] bg-[#054fb9] p-[5px] rounded-[50%] ml-[10px] text-[18px]"
                type="link"
              />
            </button>

          </div> */}
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

              <h1 className="font-bold text-[22px]">DELETE CUSTOMER</h1>
              <p className=" text-[16px]">
                Are you sure you want to delete this customer ?{" "}
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
        </div>
      )}
    </div>
  );
};

export default Customer;
