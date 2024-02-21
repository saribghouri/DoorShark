// const onChange = async (checked, userId) => {
//     console.log("userId", userId);
//     try {
//       const token = Cookies.get("apiToken");
//       const response = await fetch(
//         `https://mksm.blownclouds.com/api/all/user?userId=${userId}&isActives=${checked ? 'active' : 'inactive'}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.ok) {
//         const updatedUsers = inActiveUser.map(user => {
//           if (user.id === userId) {
//             return { ...user, isActives: checked ? "1" : "0" }; // Update the active/inactive status
//           }
//           return user;
//         });
//         setInActiveUser(updatedUsers);
//         setSelectedUserId(userId);
//         message.success(`User set to ${checked ? 'active' : 'inactive'} successfully`);
//       } else {
//         message.error("Failed to update user status");
//       }
//     } catch (error) {
//       console.error("Error updating user status: ", error);
//       message.error("An error occurred while updating user status");
//     }
// };











// <h1 className="text-white font-bold   flex justify-center  min-h-screen">
// <Form
//   className="absolute top-[50%] left-[81%] transform -translate-x-1/2 -translate-y-1/2"
//   name="basic"
//   labelCol={{
//     span: 8,
//   }}
//   wrapperCol={{
//     span: 16,
//   }}
//   style={{
//     maxWidth: 445,
//   }}
//   initialValues={{
//     remember: true,
//   }}
//   onFinish={onFinish}
//   onFinishFailed={onFinishFailed}
//   autoComplete="off"
// >
//   <h1 className="w-[100%] ml-[-75px] text-white text-[30px] flex justify-center text-center">
//     Login
//   </h1>
//   <Form.Item
//     className="w-[450px]"
//     name="email"
//     rules={[
//       {
//         required: true,
//         message: (
//           <span style={{ color: "white" }}>
//             Please input your email!
//           </span>
//         ),
//       },
//     ]}
//   >
//     <Input
//       placeholder="Email address"
//       className="rounded-l-[20px] rounded-r-[20px]"
//     />
//   </Form.Item>

//   <Form.Item
//     className="w-[450px] "
//     name="password"
//     rules={[
//       {
//         required: true,
//         message: (
//           <span style={{ color: "white" }}>
//             Please input your password!
//           </span>
//         ),
//       },
//     ]}
//   >
//     <Input.Password
//       placeholder="Password"
//       className="rounded-l-[20px] rounded-r-[20px]"
//     />
//   </Form.Item>

//   <Form.Item
//     className="fex justify-start w-full mt-[-15px] tex"
//     name="rem ember"
//     valuePropName="checked"
//     // wrapperCol={{
//     //   offset: 8,
//     //   span: 16,
//     // }}
//   >
//     <Checkbox className="text-white">Remember me</Checkbox>
//   </Form.Item>

//   <Form.Item
//     wrapperCol={{
//       offset: 4,
//       span: 14,
//     }}
//   >
//     <Button
//       type="enter"
//       className="bg-[#F3585E] !text-white border-none rounded-l-[20px] rounded-r-[20px] w-[150px]"
//       htmlType="submit"
//       loading={loading}
//     >
//       Login
//     </Button>
//   </Form.Item>
// </Form>
// </h1>











// const baseUrl = "https://doorshark.blownclouds.com/api";
// // const baseUrl = "http://localhost:8000/api/";
// const login = `${baseUrl}/authRoute/login`;
// const response = await fetch(`${login}`, {


















// import React, { useEffect, useState } from "react";
// import { Input, Table, message, Divider, Switch, Button, Modal } from "antd";
// import {
//   ArrowLeftOutlined,
//   ArrowRightOutlined,
//   DeleteOutlined,
//   EyeOutlined,
//   SearchOutlined,
// } from "@ant-design/icons";
// import axios from "axios";
// import Cookies from "js-cookie";
// import UserProfile from "./userProfile";

// const Category = () => {
//   // Existing state and variables
//   const [searchText, setSearchText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [selectedUserId, setSelectedUserId] = useState(null);
//   const [selectedCategoryId, setSelectedCategoryId] = useState(null);
//   const [selectedUser, setSelectedUser] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [items, setItems] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);

//   // Function to delete a category
//   const deleteCategory = async (categoryId) => {
//     try {
//       const token = Cookies.get("apiToken");
//       await axios.delete(http://localhost:8000/api/adminRoute/dltMainCat/${categoryId}, {
//         headers: {
//           Authorization: Bearer ${token},
//         },
//       });
//       message.success("Category deleted successfully");
//       // Refresh the list after deletion
//       fetchItems(currentPage);
//     } catch (error) {
//       console.error("Error deleting category:", error);
//       message.error("Failed to delete category");
//     }
//   };

//   // Columns definition, including the delete action
//   const columns = [
//     // Other columns...
//     {
//       title: "Action",
//       dataIndex: "id",
//       key: "action",
//       render: (id, record) => (
//         <div>
//           <DeleteOutlined
//             className="text-[#ffffff] bg-[#054fb9] p-[5px] rounded-[50%] ml-[10px] text-[18px]"
//             onClick={() => deleteCategory(id)}
//             style={{ cursor: 'pointer' }} // Added for better UX
//           />
//           <EyeOutlined
//             className="text-[#ffffff] bg-[#054fb9] p-[5px] rounded-[50%] ml-[10px] text-[18px]"
//             onClick={() => {
//               setSelectedUser(record);
//               setIsEditing(true);
//             }}
//           />
//         </div>
//       ),
//     },
//   ];

//   // Existing useEffect and other functions...

//   return (
//     <div>
//       {isEditing ? (
//         <UserProfile user={selectedUser} onCancel={() => setIsEditing(false)} />
//       ) : (
//         <div>
//           {/* UI components */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Category;








const handleUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const token = Cookies.get("apiToken"); // Retrieve API token from cookies

      const response = await axios.post(
        "https://doorshark.blownclouds.com/api/cloudinary/UploadDocumentToCloudinaryAndGetPublicUrl",
        formData,
      
      );

      setImageUrl(response.data.url);
      message.success("Image uploaded successfully");
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





//   <div>
//   <Upload
//     customRequest={customRequest}
//     maxCount={1}
//     accept="image/*"
//     showUploadList={false}
//   >
//     <Button icon={<UploadOutlined />}>Upload Image</Button>
//   </Upload>
//   {imageUrl && (
//     <div>
//       <h2>Uploaded Image:</h2>
//       <img
//         src={imageUrl}
//         alt="Uploaded"
//         style={{ maxWidth: "100%" }}
//       />
//     </div>
//   )}
// </div>