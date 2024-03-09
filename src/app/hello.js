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
"use client";
import React, { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Button,
  theme,
  Input,
  Dropdown,
  Space,
  Modal,
  Form,
  message,
  Upload,
} from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  DownOutlined,
  LoadingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import AllUsers from "../allUsers";
import ActiveUsers from "../contractor";
import InActiveUsers from "../customer";
import ProfileView from "../profileView";
import UserSubscription from "../userSubscription";
import Cards from "../cards";
import Category from "../category";
import SubCategory from "../Sub-Category";
import axios from "axios";
import AddCategories from "../AddCategory";
import Jobs from "../jobs";
import PendingJobs from "../pendingJobs";
import CompletedJobs from "../completedJobs";
import Customer from "../customer";
import Contractor from "../contractor";
import AddFaqs from "../addfaqs";
import Faqs from "../faqs";
import AddPolicy from "../addPrivacyPolicy";
import PrivacyPolicy from "../privacyPolicy";
const { Header, Sider } = Layout;
const App = () => {
  const router = useRouter();
  const [showUser, setShowUser] = useState(false);
  const [activeUser, setActiveUser] = useState(false);
  const [inActiveUser, setInactiveUser] = useState(false);
  const [profileEdit, setProfileEdit] = useState(false);
  const [pendingjobs, setPendingjobs] = useState(false);
  const [completedjobs, setCompletedjobs] = useState(false);
  const [addPayment, setAddPayment] = useState(false);
  const [paymentCard, setPaymentCard] = useState(false);
  const [jobs, setjobs] = useState(false);
  const [card, setCard] = useState(false);
  const [categories, setCategories] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [addFaqs, setAddFaqs] = useState(false);
  const [addPolicy, setAddPolicy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showProfileEditModal, setShowProfileEditModal] = useState(false);
  const [userSubscription, setUserSubscription] = useState(false);
  const [profileView, setProfileView] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [loadingUpdateProfile, setLoadingUpdateProfile] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [userProfileImage, setUserProfileImage] = useState(
    userDetails.profile || null
  );
  console.log(card + "++++++++++++cards+++++++++++");

  console.log(userProfileImage);
  const [imageUrl, setImageUrl] = useState();
  console.log(imageUrl);
  const [form] = Form.useForm();

  const handleForgetPassword = async (values) => {
    console.log(values);
    try {
      const formData = new FormData();
      formData.append("oldPassword", values.oldPassword);
      formData.append("newPassword", values.newPassword);
      setLoadingUpdateProfile(true);
      const token = Cookies.get("apiToken");
      const response = await fetch(
        "https://doorshark.blownclouds.com/api/adminRoute/changePass",
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
          }),
        }
      );

      if (response.ok) {
        message.success("Password reset successfully");
        setShowChangePasswordModal(false);
        // Reset password field
        form.resetFields(["oldPassword", "newPassword"]);
      } else {
        message.error("Failed to reset password");
        console.log("Response:", response);
      }
    } catch (error) {
      console.error("Error during forget password:", error);
    } finally {
      setLoadingUpdateProfile(false);
    }
  };
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = Cookies.get("apiToken");
        const response = await fetch(
          "https://doorshark.blownclouds.com/api/adminRoute/adminInfo",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();

          setUserDetails(data.data);
        } else {
          console.error(
            "Failed to fetch user details:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error during fetching user details:", error.message);
      }
    };

    fetchUserDetails();
  }, []);

  const handleShowChangePasswordModal = () => {
    setShowChangePasswordModal(true);
  };

  const handleCloseChangePasswordModal = () => {
    setShowChangePasswordModal(false);
  };

  const handleActiveUser = () => {
    setjobs(false);
    setActiveUser(true);
    setShowUser(false);
    setPendingjobs(false);
    setUserSubscription(false);
    setInactiveUser(false);
    setAddPayment(false);
    setAddPolicy(false);
    setPaymentCard(false);
    setProfileView(false);
    setCompletedjobs(false);
    setAddFaqs(false);
    setCard(false);
    setProfileEdit(false);
  };
  const handleInactiveUser = () => {
    setActiveUser(false);
    setjobs(false);
    setInactiveUser(true);
    setPaymentCard(false);
    setShowUser(false);
    setAddPolicy(false);
    setUserSubscription(false);
    setAddPayment(false);
    setPendingjobs(false);
    setCompletedjobs(false);
    setAddFaqs(false);
    setProfileView(false);
    setProfileEdit(false);
    setCard(false);
  };
  const handleAddPayment = () => {
    setAddPayment(true);
    setjobs(false);
    setActiveUser(false);
    setPaymentCard(false);
    setInactiveUser(false);
    setShowUser(false);
    setAddPolicy(false);
    setCompletedjobs(false);
    setAddFaqs(false);
    setUserSubscription(false);
    setPendingjobs(false);
    setProfileView(false);
    setProfileEdit(false);
    setCard(false);
  };
  const handleJobs = () => {
    setjobs(true);
    setCard(false);
    setAddPolicy(false);
    setAddFaqs(false);
    setAddPayment(false);
    setPaymentCard(false);
    setActiveUser(false);
    setInactiveUser(false);
    setShowUser(false);
    setUserSubscription(false);
    setPendingjobs(false);
    setCompletedjobs(false);

    setProfileView(false);
    setProfileEdit(false);
    setCard(false);
  };
  const handlePendingJobs = () => {
    setPendingjobs(true);
    setjobs(false);
    setCard(false);
    setAddPolicy(false);
    setAddPayment(false);
    setPaymentCard(false);
    setActiveUser(false);
    setInactiveUser(false);
    setShowUser(false);
    setUserSubscription(false);
    setCompletedjobs(false);
    setAddFaqs(false);
    setProfileView(false);
    setProfileEdit(false);
    setCard(false);
  };
  const handleCompletedJobs = () => {
    setCompletedjobs(true);
    setPendingjobs(false);
    setjobs(false);
    setCard(false);
    setAddPayment(false);
    setPaymentCard(false);
    setActiveUser(false);
    setInactiveUser(false);
    setShowUser(false);
    setUserSubscription(false);
    setAddFaqs(false);
    setAddPolicy(false);
    setProfileView(false);
    setProfileEdit(false);
    setCard(false);
  };
  const handlePaymentCard = () => {
    setjobs(false);
    setAddPayment(false);
    setPaymentCard(true);
    setActiveUser(false);
    setCompletedjobs(false);
    setAddPolicy(false);
    setInactiveUser(false);
    setShowUser(false);
    setUserSubscription(false);
    setAddFaqs(false);
    setProfileView(false);
    setProfileEdit(false);
    setCard(false);
  };
  const handleFaqs = () => {
    setAddFaqs(true);
    setCard(false);
    setjobs(false);
    setAddPayment(false);
    setPaymentCard(false);
    setActiveUser(false);
    setCompletedjobs(false);
    setAddPolicy(false);
    setInactiveUser(false);
    setShowUser(false);
    setUserSubscription(false);

    setProfileView(false);
    setProfileEdit(false);
  };

  const handleCard = () => {
    setCard(true);
    setAddFaqs(false);
    setShowUser(false);
    setActiveUser(false);
    setInactiveUser(false);
    setAddPayment(false);
    setPaymentCard(false);
    setUserSubscription(false);
    setPendingjobs(false);
    setCompletedjobs(false);
    setProfileView(false);
    setjobs(false);
    setAddPolicy(false);
    setProfileEdit(false);
  };
  const handleAddPolicy = () => {
    setAddPolicy(true);
    setCard(false);
    setAddFaqs(false);
    setShowUser(false);
    setActiveUser(false);
    setInactiveUser(false);
    setAddPayment(false);
    setPaymentCard(false);
    setUserSubscription(false);
    setPendingjobs(false);
    setCompletedjobs(false);
    setProfileView(false);
    setjobs(false);
    setProfileEdit(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [collapsed, setCollapsed] = useState(false);
  const handleCollapse = (collapsed) => {
    setCollapsed(collapsed);

    setShowMenu(false);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  function getItem(label, key, icon, children, onClick, classNames = "") {
    return {
      key,
      icon,
      children,
      label,
      onClick,
      classNames,
    };
  }
  const handleShowProfileEditModal = () => {
    setShowProfileEditModal(true);
  };
  const generateMenuItems = () => {
    // if (userDetails.userRole === userDetails.userRole) {
    console.log("sabgqebew");

    return [
      getItem(
        "",
        "1",

        <button
          onClick={handleCard}
          className="w-[248px] h-[40px] !ml-[-28px] justify-center flex item-center pl-[10px] pr-[10px] !text-center !text-[#ffffff] "
        >
          <Image
            className=""
            src={"/assets/icon/whitedashboard.png"}
            width={30}
            height={30}
            alt=""
          />
          <h1 className="!w-[100%] ml-[-47px] text-[18px]">Dashboard</h1>
        </button>
      ),

      getItem(
        "Users",
        "sub1",
        <Image
          onClick={() => setCollapsed(!collapsed)}
          src={"/assets/icon/healthicons_miner-white.png"}
          width={30}
          height={30}
          alt=""
        />,
        [
          getItem(
            "Contractor",
            "sub13",
            <Image src={""} alt="" />,

            null,
            handleActiveUser
          ),

          getItem(
            "Customer",
            "sub14",
            <Image src={""} alt="" />,
            null,
            handleInactiveUser
          ),
        ]
      ),
      getItem(
        "All Category",
        "sub2",
        <Image
          onClick={() => setCollapsed(!collapsed)}
          src={"/assets/icon/iconamoon_category-duotone.png"}
          width={30}
          height={30}
          alt=""
        />,
        [
          getItem(
            "Category",
            "sub15",
            <Image src={""} alt="" />,
            null,
            handleAddPayment
          ),

          getItem(
            " Sub Category",
            "sub16",
            <Image src={""} alt="" />,
            null,
            handlePaymentCard
          ),
        ]
      ),

      getItem(
        " Job ",
        "sub3",
        <Image
          onClick={() => setCollapsed(!collapsed)}
          src={"/assets/icon/carbon_batch-job.png"}
          width={30}
          height={30}
          alt=""
        />,

        [
          getItem("Jobs", "sub17", <Image src={""} alt="" />, null, handleJobs),
          getItem(
            "Pending",
            "sub18",
            <Image src={""} alt="" />,
            null,
            handlePendingJobs
          ),
          getItem(
            "Complete",
            "sub19",
            <Image src={""} alt="" />,
            null,
            handleCompletedJobs
          ),
        ]
      ),

      getItem(
        "settings",
        "sub21",
        <Image
        onClick={() => setCollapsed(!collapsed)}
          src={"/assets/icon/Vector (1).png"}
          width={22}
          height={22}
          alt=""
        />,
        [
          getItem("FAQS", "sub20", <Image src={""} alt="" />, null, handleFaqs),
          getItem(
            "Privacy Policy",
            "sub22",
            <Image src={""} alt="" />,
            null,
            handleAddPolicy
          ),
        ]
      ),
    ];
  };

  const item = generateMenuItems();
  const handleLogout = () => {
    Cookies.remove("apiToken");

    router.push("/");
  };
  const items = [
    {
      label: (
        <a className="font">
          <p className="bg-[#005eca] text-white rounded-l-[10px] rounded-r-[10px] text-center p-[5px]">
            {userDetails.name}
          </p>
        </a>
      ),
    },
    {
      key: "1",
      label: (
        <a className="font" onClick={handleShowProfileEditModal}>
          <UserOutlined /> Profile edit
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a className="font !text-[#]" onClick={handleShowChangePasswordModal}>
          <UserOutlined /> Change Password
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          className="flex justify-center text-center rounded-l-[20px] pt-[5px] pb-[5px] rounded-r-[20px]  bg-[#005eca] !text-white"
          onClick={handleLogout}
        >
          <LogoutOutlined />
          Logout
        </a>
      ),
    },
  ];

  useEffect(() => {
    const isUserLoggedIn = Cookies.get("apiToken");

    if (!isUserLoggedIn) {
      router.push("/");
    }
  }, [router]);

  // const siderStyle = {
  //   textAlign: "center",
  //   lineHeight: "120px",
  //   color: "#fff",
  //   backgroundColor: "#1677ff",
  //   backgroundImage: `url("/assets/images/Rectangle.png")`,
  //   backgroundSize: "cover",
  //   backgroundPosition: "center",
  // };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG files!");
      return false;
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
      return false;
    }

    return true;
  };

  const handleProfileEdit = async () => {
    try {
      setLoading(true);
      const token = Cookies.get("apiToken");

      const res = await fetch(
        "https://doorshark.blownclouds.com/api/adminRoute/updateProfile",
        {
          method: "PATCH",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }),
          body: JSON.stringify({
            profile: imageUrl,
            name: form.getFieldValue("name"),
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to upload!");

      const resData = await res.json();

      setUserDetails({
        ...userDetails,
        name: form.getFieldValue("name"),
        profile: imageUrl,
      });

      setShowProfileEditModal(false);
      console.log("The operation was a resounding achievement!", resData);
    } catch (error) {
      console.error(
        "Could not confidently conclude the application request.",
        error
      );
    } finally {
      setLoading(false);
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
      setUserProfileImage(response.data.image_url[0]);
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
  const renderMenu = () => {
    if (collapsed) {
      return (
        <Menu
          className=""
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={item}
          openKeys={menuOpen ? ["sub1", "sub2", "sub3"] : []}
        />
      );
    } else {
      return (
        <Menu
          className=""
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={item}
        />
      );
    }
  };

  return (
    <div
      className="!bg-[#fff] flex"
      style={{
        minHeight: "100vh",
        width: "auto",
      }}
    >
      <Sider
        className="siderStyle"
        width="300px"
        // style={siderStyle}
        collapsible
        collapsedWidth="110px"
        collapsed={collapsed}
        onCollapse={handleCollapse}
      >
        <div className="p-[20px] text-[22px] " onClick={handleCard}>
          <h1 className="text-white text-center cursor-pointer ">
            <Image
              onClick={() => handleCard()}
              width={1000}
              height={1000}
              alt=""
              className=""
              src="/assets/images/doorsharklogo.png"
            />
          </h1>
        </div>

        <div className="demo-logo-vertical bg-[#fff]" />

        {renderMenu()}
      </Sider>

      <Layout className="!bg-[#fff] ">
        <Header
          className="!bg-[#fff] "
          style={{
            padding: 0,
            background: colorBgContainer,
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            </div>
            <div>
              <Modal
                className="change-password-modal relative"
                height={379}
                open={showChangePasswordModal}
                onCancel={handleCloseChangePasswordModal}
                footer={null}
              >
                <Form
                  form={form}
                  name="changePasswordForm"
                  onFinish={handleForgetPassword}
                  onFinishFailed={onFinishFailed}
                >
                  <div className="flex gap-0 flex-col w-[100%] h-[300px] justify-center items-center">
                    <p className="text-[22px] text-[#ffffff] Poppins font-[500] mb-[10px]">
                      Change Password
                    </p>
                    <Form.Item
                      name="oldPassword"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your old password!",
                        },
                      ]}
                    >
                      <Input.Password
                        className="w-[300px] rounded-r-[20px] rounded-l-[20px]"
                        placeholder="Old Password"
                      />
                    </Form.Item>

                    <Form.Item
                      name="newPassword"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your new password!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              !value ||
                              getFieldValue("oldPassword") !== value
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              "New password must be different from old"
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        className="w-[300px] rounded-r-[20px] rounded-l-[20px]"
                        placeholder="New Password"
                      />
                    </Form.Item>

                    <Form.Item
                      name="confirmPassword"
                      dependencies={["newPassword"]}
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your new password!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              !value ||
                              getFieldValue("newPassword") === value
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject("Password does not match!");
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        className="w-[300px] rounded-r-[20px] rounded-l-[20px]"
                        placeholder="Confirm Password"
                      />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        className="bg-[#005eca] !border-none w-[200px] !text-white rounded-r-[20px] rounded-l-[20px]"
                        htmlType="submit"
                        loading={loadingUpdateProfile}
                      >
                        Update Password
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </Modal>
              <div className="flex justify-between relative">
                <div className="flex text-center items-center w-[180px] h-[45px] bg-[#ffffff]">
                  <Dropdown
                    className=" ml-[45px] w-[100px] "
                    menu={{
                      items,
                    }}
                    trigger={["click"]}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <div className="text-[#054fb9] font-semibold flex  overflow-ellipsis justify-between">
                        <p className=" overflow-ellipsis">{userDetails.name}</p>
                        <DownOutlined className="" />
                      </div>
                    </a>
                  </Dropdown>
                </div>
                <img
                  alt=""
                  className="w-[50px] h-[50px] rounded-[50%] ml-[-20px] mt-[-2px]  absolute"
                  src={userDetails.profile}
                />
              </div>
              <Modal
                open={showProfileEditModal}
                onCancel={() => setShowProfileEditModal(false)}
                footer={null}
              >
                <Form
                  form={form}
                  name="editProfileForm"
                  initialValues={{
                    name: userDetails.name,
                  }}
                  onFinish={handleProfileEdit}
                  onFinishFailed={onFinishFailed}
                >
                  <div className="w-full flex justify-center items-center flex-col mt-[20px]">
                    <Form.Item
                      className="h-[50px] mb-[80px] !w-[100%]"
                      name="upload"
                      valuePropName="fileList"
                      getValueFromEvent={(e) => e.fileList}
                      extra=" "
                      rules={[
                        {
                          message: "Please upload your doctor image!",
                        },
                      ]}
                    >
                      <Upload
                        name="upload"
                        listType="picture-card"
                        className="avatar-uploader !w-[100%] mb-[20px]"
                        showUploadList={false}
                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        beforeUpload={beforeUpload}
                        customRequest={customRequest}
                      >
                        {imageUrl && typeof imageUrl === "string" ? (
                          <img
                            alt=""
                            className="w-[70px] h-[70px] rounded-[50%]"
                            src={imageUrl}
                          />
                        ) : userProfileImage ? (
                          <img
                            alt=""
                            className="w-[70px] h-[70px] rounded-[50%]"
                            src={userProfileImage}
                          />
                        ) : (
                          uploadButton
                        )}
                      </Upload>
                    </Form.Item>
                  </div>

                  <Form.Item
                    className="mt-[70px]"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter userName",
                      },
                    ]}
                  >
                    <Input placeholder="User Name" />
                  </Form.Item>

                  <Form.Item>
                    <div className=" flex w-[100%] justify-center mt-[10px]">
                      <Button
                        className="bg-[#ffffff] !border-none w-[200px] !text-[#005eca] font-semibold rounded-r-[20px] rounded-l-[20px]"
                        htmlType="submit"
                        loading={loadingUpdateProfile}
                      >
                        Update Profile
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
              </Modal>
            </div>
          </div>
        </Header>
        <div>
          {showUser && <AllUsers />}
          {activeUser && <Contractor />}
          {inActiveUser && <Customer />}
          {addPayment && <Category handlePaymentCard={handlePaymentCard} />}
          {paymentCard && <SubCategory />}
          {pendingjobs && <PendingJobs />}
          {addPolicy && <PrivacyPolicy />}
          {completedjobs && <CompletedJobs />}
          {addFaqs && <Faqs />}
          {jobs && <Jobs />}
          {categories && (
            <AddCategories handleShowCategories={handleShowCategories} />
          )}
          {userSubscription && <UserSubscription />}
          {profileView && <ProfileView />}
          {card && <Cards handlePendingJobs={handlePendingJobs} />}
          {!showUser &&
            !activeUser &&
            !inActiveUser &&
            !addPayment &&
            !paymentCard &&
            !userSubscription &&
            !pendingjobs &&
            !completedjobs &&
            !addPolicy &&
            !addFaqs &&
            !profileView &&
            !jobs &&
            !card &&
            userDetails.role == "ADMIN" && <Cards />}
        </div>
      </Layout>
    </div>
  );
};
export default App;
