"use client";
import React, { useEffect, useState } from "react";
import { Table, Switch, message, Input, Divider } from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Cookies from "js-cookie";
import UserProfile from "./userProfile";

const CompletedJobs = () => {
  const [searchText, setSearchText] = useState("");

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  console.log(items);
  const columns = [
    { title: "Sr", dataIndex: "key", key: "serialNumber" },
    { title: "Service Name", dataIndex: "servicename", key: "servicename" },
    { title: "Description", dataIndex: "desc", key: "desc" },
    { title: "Due Date", dataIndex: "duedate", key: "duedate" },
    { title: "Job Status", dataIndex: "job_status", key: "job_status" },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   render: (status, record) => (
    //     <Switch
    //       checked={status === true}
    //       onChange={(checked) => onChange(checked, record.id)}
    //     />
    //   ),
    // },
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
              setSelectedUserId(record._id);
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
        `https://doorshark.blownclouds.com/api/adminRoute/gettingJobs`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (Array.isArray(response.data.data.completedJobs)) {
        setItems(response.data.data.completedJobs);

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
        servicename: user.servicename,
        desc: user.desc,
        job_status: user.job_status,
        status: user.isActive,
        duedate: user.duedate,
        id: user._id,
        profileImage: user.profileImage,
      }))
    : [];

  const filteredData = dataSource.filter(
    (doctor) =>
      (doctor.servicename &&
        doctor.servicename.toLowerCase().includes(searchText.toLowerCase())) ||
      (doctor.address &&
        doctor.address.toLowerCase().includes(searchText.toLowerCase()))
  );

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
              Complete Jobs
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
        </div>
      )}
    </div>
  );
};

export default CompletedJobs;
