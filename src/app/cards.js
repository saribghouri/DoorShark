"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import PendingJobs from "./pendingJobs";
import Customer from "./customer";

const Cards = ({ handlePendingJobs }) => {
  // const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(false);
  const [contractor, setContractor] = useState(false);
  const [pendingJobs, setPendingJobs] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  const [completedJobs, setCompleted] = useState(false);

  const cardData = [
    {
      backgroundImage: "/assets/images/Group.png",
      backgroundColor: "#ffffff",
      textBackgroundColor: "#e1edff",
      textColor: "#fcfffc",
      textName: "Basic",
      count: 615,
      label: "User Receipt",
    },
    {
      backgroundImage: "/assets/images/red.png",
      backgroundColor: "#e1edff",
      textBackgroundColor: "#ffffff",
      textColor: "#fcfffc",
      textName: "Standard",
      count: 615,
      label: "User Receipt",
    },
    {
      backgroundImage: "/assets/images/gray.png",
      backgroundColor: "none",
      textBackgroundColor: "#ffffff",

      textColor: "#fcfffc",
      textName: "Premium",
      count: 615,
      label: "User Receipt",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("apiToken");
        const response = await fetch(
          "https://backend.doorshark.co/api/adminRoute/getCustomerDetails",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
      

          setUsers(data.data.length);
        } else {
          console.error("Failed to fetch doctors");
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("apiToken");
        const response = await fetch(
          "https://backend.doorshark.co/api/adminRoute/getContractorDetails",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();


          setContractor(data.data.length);
        } else {
          console.error("Failed to fetch doctors");
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("apiToken");
        const response = await fetch(
          "https://backend.doorshark.co/api/adminRoute/gettingJobs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
       

          setPendingJobs(data.data.pendingJobs.length);
        } else {
          console.error("Failed to fetch doctors");
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("apiToken");
        const response = await fetch(
          "https://backend.doorshark.co/api/adminRoute/gettingJobs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
       

          setCompleted(data.data.completedJobs.length);
        } else {
          console.error("Failed to fetch doctors");
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
     
        <div className="flex flex-wrap gap-[20px] justify-center w-[100%] mt-[20px]">
          {/* {cardData.map((card, index) => {
        let backgroundImage;
        switch (card.type) {
          case "standard":
            backgroundImage = "/assets/images/red.png";
            break;
          case "premium":
            backgroundImage = "/assets/images/gray.png";
            break;
          default:
            backgroundImage = "/assets/images/Group.png";
            
        } */}
          {/* return ( */}

          <div
            className="overflow-hidden w-[100%]  rounded-[20px] doorCards"
            style={{
              width: "400px",
              height: "234px",

              backgroundColor: "rgb(69, 129, 168)", // Updated background color
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="ml-[20px] mt-[25px] relative h-[287px] ">
              <img
                className=" absolute w-[200px] bottom-0 right-0 flex justify-end flex-col"
                src="/assets/images/cardGroup.png"
                alt=""
              />
              <p className="text-[#054fb9] w-[60%] p-[8px] font-medium text-[20px] bg-[#fff] rounded-r-[10px] rounded-l-[10px]">
                All Contractor:
              </p>
              <p className="flex text-white text-[24px] font-bold text-30">
                {/* {card.count} */}
              </p>
              <p className="flex   Receipt font-bold">{contractor}</p>
            </div>
          </div>
          <div
            className="overflow-hidden w-[100%]  rounded-[20px] doorCards"
            style={{
              width: "400px",
              height: "234px",

              backgroundColor: "rgb(69, 129, 168)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div
          
              className="ml-[20px] mt-[25px] relative h-[287px] "
            >
              <img
                className=" absolute w-[200px] bottom-0 right-0 flex justify-end flex-col"
                src="/assets/images/cardGroup.png"
                alt=""
              />
              <p className="text-[#054fb9] w-[60%] p-[8px] font-medium text-[20px] bg-[#fff] rounded-r-[10px] rounded-l-[10px]">
                All Customer:
                {/* {card.type} */}
              </p>
              <p className="flex text-white text-[24px] font-bold text-30">
                {/* {card.count} */}
              </p>
              <p className="flex Receipt font-bold">{users}</p>
            </div>
          </div>
          <div
            className="overflow-hidden w-[100%]  rounded-[20px] doorCards"
            style={{
              width: "400px",
              height: "234px",

              backgroundColor: "rgb(69, 129, 168)", // Updated background color
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div
             
              className="ml-[20px] mt-[25px] relative  h-[287px] "
            >
              <img
                className=" absolute w-[200px] bottom-0 right-0 flex justify-end flex-col"
                src="/assets/images/cardGroup.png"
                alt=""
              />
              <p className="text-[#054fb9] w-[60%] p-[8px] font-medium text-[20px] bg-[#fff] rounded-r-[10px] rounded-l-[10px]">
                Pending Jobs:
                {/* {card.type} */}
              </p>
              <p className="flex text-white text-[24px] font-bold text-30">
                {/* {card.count} */}
              </p>
              <p className="flex Receipt font-bold">{pendingJobs}</p>
            </div>
          </div>
          <div
            className="overflow-hidden w-[100%]  rounded-[20px] doorCards"
            style={{
              width: "400px",
              height: "234px",

              backgroundColor: "rgb(69, 129, 168)", // Updated background color
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="ml-[20px] mt-[25px] relative h-[287px]  ">
              <img
                className=" absolute w-[200px] bottom-0 right-0 flex justify-end flex-col"
                src="/assets/images/cardGroup.png"
                alt=""
              />
              <p className="text-[#054fb9] w-[60%] p-[8px] font-medium text-[20px] bg-[#fff] rounded-r-[10px] rounded-l-[10px]">
                Complete Jobs:
                {/* {card.type} */}
              </p>
              <p className="flex text-white text-[24px] font-bold text-30">
                {/* {card.count} */}
              </p>
              <p className="flex Receipt font-bold">{completedJobs}</p>
            </div>
          </div>

          {/* ); */}
          {/* })} */}
        </div>
     
    </div>
  );
};

export default Cards;
