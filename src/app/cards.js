"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Cards = () => {
  // const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(true);

        const token = Cookies.get("apiToken");
        const response = await fetch(
          "https://mksm.blownclouds.com/api/dashboard/cards",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          console.log("Doctors fetched successfully:", responseData);

          if (Array.isArray(responseData?.data)) {
            setCardData(responseData.data);
          } else {
            console.error(
              "API response does not contain an array for 'doctor'"
            );
          }
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
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
        <div className="ml-[20px] mt-[25px] relative">
          <img
            className=" absolute w-[200px] h-[160px]  right-0 bottom-[-117px] "
            src="/assets/images/cardGroup.png"
            alt=""
          />
          <p className="text-[#054fb9] w-[60%] p-[8px] font-medium text-[20px] bg-[#fff] rounded-r-[10px] rounded-l-[10px]">
            All Contractor:
            {/* {card.type} */}
          </p>
          <p className="flex text-white text-[24px] font-bold text-30">
            {/* {card.count} */}
          </p>
          <p className="flex Receipt font-bold">230</p>
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
        <div className="ml-[20px] mt-[25px] relative">
          <img
            className=" absolute w-[200px] h-[160px]  right-0 bottom-[-117px] "
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
          <p className="flex Receipt font-bold">230</p>
        </div>
      </div>
      {/* ); */}
      {/* })} */}
    </div>
  );
};

export default Cards;
