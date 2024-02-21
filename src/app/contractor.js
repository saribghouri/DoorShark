"use client";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Input, Table, message, Divider, Switch } from "antd";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import UserProfile from "./userProfile";
import axios from "axios";
const ActiveUsers = () => {
  const [activeUser, setActiveUser] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const ids = items.map(item => item._id);
  console.log(ids)
  const columns = [
    { title: "Sr", dataIndex: "key", key: "serialNumber" },
    { title: "Name", dataIndex: "name", key: "userName" },
    { title: "Email", dataIndex: "address", key: "emailAddress" },
    { title: "Phone No:", dataIndex: "contact", key: "Phone" },
    {
      title: "Status",
      dataIndex: "isActives",
      key: "isActives",
      render: (_, record) => (
        <Switch
        defaultChecked={record.isActives !== selectedUserId}
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
            danger
            onClick={() => {
              setSelectedUser(record);
              showModal();
            }}
          />
          <EyeOutlined
            className="text-[#ffffff] bg-[#054fb9] p-[5px] rounded-[50%] ml-[10px] text-[18px]"
            type="link"
            onClick={() => {
              setSelectedUser(record);
              setIsEditing(true);
            }}
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
        `https://doorshark.blownclouds.com/api/adminRoute/getContractorDetails`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Ensure response.data is an array before setting items
      if (Array.isArray(response.data.data)) {
        setItems(response.data.data); // Adjust this line to get the array from response.data.data
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

  // Ensure dataSource is an array before filtering
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
        id: user.id,
        profileImage: user.profileImage,
      }))
    : [];

  const filteredData = dataSource.filter(
    (doctor) =>
      (doctor.name &&
        doctor.name.toLowerCase().includes(searchText.toLowerCase())) ||
      (doctor.address &&
        doctor.address.toLowerCase().includes(searchText.toLowerCase()))
  );

  const onChange = async (checked, userId) => {
    console.log("userId", userId);
    try {
      const token = Cookies.get("apiToken");
      console.log(token)
      const status = checked ? "ACTIVE" : "NOT ACTIVE"; 
      const response = await axios.patch(
        `https://doorshark.blownclouds.com/api/adminRoute/toggleStatus`, 
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        } 
      );

      if (response.status === 200) {
        const updatedUsers = items.map((user) => {
          if (user.id === userId) {
            return { ...user, isActives: checked }; 
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

  // const onChange = async (checked, userId) => {
  //     console.log("userId", userId);
  //     try {
  //       const token = Cookies.get("apiToken");
  //       const response = await fetch(
  //         `https://doorshark.blownclouds.com/api/adminRoute/toggleStatus?_id=${userId}&ACTIVE=${checked ? 'ACTIVE' : 'NOT ACTIVE'}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       if (response.ok) {
  //         const updatedUsers = activeUser.map(user => {
  //           if (user.id === userId) {
  //             return { ...user, isActives: checked ? "1" : "0" }; // Update the active/inactive status
  //           }
  //           return user;
  //         });
  //         setActiveUser(updatedUsers);
  //         setSelectedUserId(userId);
  //         message.success(`User set to ${checked ? 'ACTIVE' : 'NOT ACTIVE'} successfully`);
  //       } else {
  //         message.error("Failed to update user status");
  //       }
  //     } catch (error) {
  //       console.error("Error updating user status: ", error);
  //       message.error("An error occurred while updating user status");
  //     }
  // };

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
              Contractor
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
            pagination={false}
            loading={isLoading}
          />
          <div className="flex justify-end mb-[50px] mt-[20px] mr-[10px]">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveUsers;
