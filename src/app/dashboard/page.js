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
  console.log(userDetails);
  console.log(userProfileImage);
  const [imageUrl, setImageUrl] = useState();
  console.log(imageUrl);
  const [form] = Form.useForm();

  const handleForgetPassword = async (values) => {
    try {
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
        message.success("Password reset link sent successfully");

        setShowChangePasswordModal(false);
      } else {
        message.error("Failed to send password reset link");
        console.log("Response:", response);
      }
    } catch (error) {
      console.error("Error during forget password:", error);
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
    setPaymentCard(false);
    setProfileView(false);
    setCompletedjobs(false);

    setCard(false);
    setProfileEdit(false);
  };
  const handleInactiveUser = () => {
    setActiveUser(false);
    setjobs(false);
    setInactiveUser(true);
    setPaymentCard(false);
    setShowUser(false);
    setUserSubscription(false);
    setAddPayment(false);
    setPendingjobs(false);
    setCompletedjobs(false);

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
    setCompletedjobs(false);

    setUserSubscription(false);
    setPendingjobs(false);
    setProfileView(false);
    setProfileEdit(false);
    setCard(false);
  };
  const handleJobs = () => {
    setjobs(true);
    setCard(false);
    

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
    setAddPayment(false);
    setPaymentCard(false);
    setActiveUser(false);
    setInactiveUser(false);
    setShowUser(false);
    setUserSubscription(false);
    setCompletedjobs(false);

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

    setInactiveUser(false);
    setShowUser(false);
    setUserSubscription(false);

    setProfileView(false);
    setProfileEdit(false);
    setCard(false);
  };

  const handleSubscription = () => {
    setjobs(false);
    setUserSubscription(true);

    setAddPayment(false);
    setPaymentCard(false);
    setActiveUser(false);
    setInactiveUser(false);
    setShowUser(false);

    setProfileView(false);
    setProfileEdit(false);
    setCard(false);
  };
  const handleCard = () => {
    setCard(true);
    setUserSubscription(false);
    setjobs(false);
    setCompletedjobs(false);
    setPendingjobs(false);

    setAddPayment(false);
    setPaymentCard(false);
    setActiveUser(false);
    setInactiveUser(false);
    setShowUser(false);

    setProfileView(false);
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
    console.log("sabgqebew");

    return [
      getItem(
        "",
        "1",

        <button
          onClick={handleCard}
          className="w-[250px] h-[50px] !ml-[-24px] !text-center !text-[#005eca] !bg-[#ffff] "
        >
          <h1 className="!w-full text-center text-[18px]">Dashboard</h1>
        </button>
      ),

      getItem(
        "Authentication",
        "sub1",
        <Image
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
    ];
  };

  const item = generateMenuItems();
  const handleLogout = () => {
    // Remove the token from cookies
    Cookies.remove("apiToken");
    // Redirect the user to the login page or any other desired page
    router.push("/");
  };
  const items = [
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
        <a
          className="font !text-[#005eca]"
          onClick={handleShowChangePasswordModal}
        >
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

  const siderStyle = {
    textAlign: "center",
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#1677ff",
    backgroundImage: `url("/assets/images/Rectangle.png")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

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
  
      setUserDetails({ ...userDetails, name: form.getFieldValue("name"), profile: imageUrl });
  
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

  return (
    <div
      className="!bg-[#fff] flex"
      style={{
        minHeight: "100vh",
        width: "auto",
      }}
    >
      <Sider
        width="300px"
        style={siderStyle}
        collapsible
        collapsed={collapsed}
        onCollapse={handleCollapse}
      >
        <div className="p-[30px] text-[22px]">
          <h1 className="text-white text-center">
            <Image
              width={1000}
              height={1000}
              alt=""
              className=""
              src="/assets/images/doorsharklogo.png"
            />
          </h1>
        </div>

        <div className="demo-logo-vertical bg-[#fff]" />

        <Menu
          className=""
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={item}
        />
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
                        9,
                      ]}
                    >
                      <Input.Password
                        className="w-[300px]  rounded-r-[20px] rounded-l-[20px]"
                        placeholder="Old Password"
                      />
                    </Form.Item>

                    <Form.Item
                      name="newPassword"
                      dependencies={["newPassword"]}
                      hasFeedback
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
                            return Promise.reject(
                              new Error("The two passwords do not match!")
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        className="w-[300px]  rounded-r-[20px] rounded-l-[20px]"
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
                      <Space className="text-[#054fb9] font-semibold flex justify-between">
                        <p className="">{userDetails.name}</p>
                        <DownOutlined className="" />
                      </Space>
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
          {activeUser && <ActiveUsers />}
          {inActiveUser && <InActiveUsers />}
          {addPayment && <Category handlePaymentCard={handlePaymentCard} />}
          {paymentCard && <SubCategory />}
          {pendingjobs && <PendingJobs />}
          {completedjobs && <CompletedJobs />}
          {jobs && <Jobs />}
          {categories && (
            <AddCategories handleShowCategories={handleShowCategories} />
          )}
          {userSubscription && <UserSubscription />}
          {profileView && <ProfileView />}
          {card && <Cards />}
          {!showUser &&
            !activeUser &&
            !inActiveUser &&
            !addPayment &&
            !paymentCard &&
            !userSubscription &&
            !pendingjobs &&
            !completedjobs &&
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
