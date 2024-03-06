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








// const handleUpload = async (file) => {
//     try {
//       const formData = new FormData();
//       formData.append("image", file);

//       const token = Cookies.get("apiToken"); // Retrieve API token from cookies

//       const response = await axios.post(
//         "https://doorshark.blownclouds.com/api/cloudinary/UploadDocumentToCloudinaryAndGetPublicUrl",
//         formData,
      
//       );

//       setImageUrl(response.data.url);
//       message.success("Image uploaded successfully");
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       message.error("Failed to upload image");
//     }
//   };

//   const customRequest = ({ file, onSuccess }) => {
//     setTimeout(() => {
//       onSuccess("ok");
//       handleUpload(file);
//     }, 0);
//   };





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

// const [selectedPlace, setSelectedPlace] = useState(null);
// const [searchLngLat, setSearchLngLat] = useState(null);
// const autocompleteRef = useRef(null);
// const [currentLocation, setCurrentLocation] = useState(null);
// const [address, setAddress] = useState("");

// // laod script for google map
// const { isLoaded } = useLoadScript({
//   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
//   libraries: ["places"],
// });

// if (!isLoaded) return <div>Loading....</div>;

// // static lat and lng
// const center = { lat: 23.3441, lng: 85.3096 }; // Example latitude and longitude

// // handle place change on search
// const handlePlaceChanged = () => {
//   const place = autocompleteRef.current.getPlace();
//   setSelectedPlace(place);
//   setSearchLngLat({
//     lat: place.geometry.location.lat(),
//     lng: place.geometry.location.lng(),
//   });
//   setCurrentLocation(null);
// };
// const onMapLoad = (map) => {
//   const controlDiv = document.createElement("div");
//   const controlUI = document.createElement("div");
//   controlUI.innerHTML = "Get Location";
//   controlUI.style.backgroundColor = "white";
//   controlUI.style.color = "black";
//   controlUI.style.border = "2px solid #ccc";
//   controlUI.style.borderRadius = "3px";
//   controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
//   controlUI.style.cursor = "pointer";
//   controlUI.style.marginBottom = "22px";
//   controlUI.style.textAlign = "center";
//   controlUI.style.width = "100%";
//   controlUI.style.padding = "8px 0";
//   controlUI.addEventListener("click", handleGetLocationClick);
//   controlDiv.appendChild(controlUI);

//   // const centerControl = new window.google.maps.ControlPosition(
//   //   window.google.maps.ControlPosition.TOP_CENTER,
//   //   0,
//   //   10
//   // );
//   map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(
//     controlDiv
//   )
// }


// import { Autocomplete, GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

// const handleGetLocationClick = () => {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setSelectedPlace(null);
//         setSearchLngLat(null);
//         setCurrentLocation({ lat: latitude, lng: longitude });
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//   } else {
//     console.log("Geolocation is not supported by this browser.");
//   }
// };
// <div
// style={{
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   alignItems: "center",
//   gap: "20px",
// }}
// >
// {/* search component  */}
// <Autocomplete
//   onLoad={(autocomplete) => {
//     console.log("Autocomplete loaded:", autocomplete);
//     autocompleteRef.current = autocomplete;
//   }}
//   onPlaceChanged={handlePlaceChanged}
//   options={{ fields: ["address_components", "geometry", "name"] }}
// >
//   <input type="text" placeholder="Search for a location" />
// </Autocomplete>

// {/* map component  */}
// <GoogleMap
//   zoom={currentLocation || selectedPlace ? 18 : 12}
//   center={currentLocation || searchLngLat || center}
//   mapContainerClassName="map"
//   mapContainerStyle={{ width: "80%", height: "600px", margin: "auto" }}
//   onLoad={onMapLoad}
// >
//   {selectedPlace && <Marker position={searchLngLat} />}
// </GoogleMap>
// </div>
// const onSaveClick = async (faqId, event) => {
//   try {
//     const token = Cookies.get("apiToken");
//     const response = await fetch(
//       `https://doorshark.blownclouds.com/api/adminRoute/editFaqs${editingItemId}`,
//       {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
    
//           question: items.question, 
//           answer: items.answer, 
//         }),
//       }
//     );
//     if (response.ok) {
    
//       const data = await response.json();
//       setItems(data.data);
//       message.success("FAQ edited successfully");
     
//       setEditMode(false);
//     } else {
//       message.error("Failed to edit FAQ");
//     }
//   } catch (error) {
//     console.error("Error editing FAQ:", error);
//     message.error("Failed to edit FAQ");
//   }
// };
// import React, { useState } from "react";
// import { Button, Divider, Form, message } from "antd";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css"; // import styles

// const AddPolicy = () => {
//   const [loading, setLoading] = useState(false);
//   const [policy, setPolicy] = useState("");

//   const onFinish = async (values) => {
//     setLoading(true);
//     try {
//       // Your existing code
//     } catch (error) {
//       console.error("Error during policy registration:", error);
//       setLoading(false);
//     }
//   };

//   const onFinishFailed = (errorInfo) => {};

//   return (
//     <div>
//       {/* Your existing JSX */}
//       <div className=" bg-[#fff] w-[60%] mx-auto rounded-[10px] mt-[40px] mb-[20px]">
//         <Form
//           className="pl-[50px] pr-[50px]"
//           name="loginForm"
//           initialValues={{ remember: true }}
//           onFinish={onFinish}
//           onFinishFailed={onFinishFailed}
//         >
//           <Form.Item
//             className="w-[100%]"
//             name="policy"
//             rules={[{ required: true, message: "Please enter your policy!" }]}
//           >
//             <ReactQuill
//               theme="snow" // Specify theme
//               value={policy}
//               onChange={setPolicy}
//               placeholder="Add Privacy Policy Here"
//             />
//           </Form.Item>

//           <div className=" flex justify-between mt-[80px]">
//             <Form.Item></Form.Item>
//             <Form.Item>
//               <Button
//                 loading={loading}
//                 className="bg-[#054fb9] w-[150px] !text-white"
//                 htmlType="submit"
//               >
//                 Add
//               </Button>
//             </Form.Item>
//           </div>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default AddPolicy;
