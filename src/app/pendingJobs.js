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

const PendingJobs = () => {

  const [searchText, setSearchText] = useState("");


  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  console.log(items);
  const columns = [
    { title: "Sr", dataIndex: "key", key: "serialNumber" },
    { title: "Service Name", dataIndex: "servicename", key: "servicename" },
    { title: "Description", dataIndex: "desc", key: "desc" },
    { title: "Due Date", dataIndex: "duedate", key: "duedate" },
    { title: "Job Status", dataIndex: "job_status", key: "job_status" },

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

      if (Array.isArray(response.data.data.pendingJobs)) {
        setItems(response.data.data.pendingJobs);
        console.log(response.data.data)
        setCurrentPage(page);

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


  return (


        <div>
          <div className="flex justify-between  pl-[10px] pr-[10px] ml-[16px] mr-[16px] items-center mt-[20px] mb-[20px]">
            <h1 className="Doctors text-[22px] text-[#054fb9] font-sans">
              Pending Jobs
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
    
 
  );
};

export default PendingJobs;
