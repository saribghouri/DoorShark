import React, { useState, useEffect } from "react";
import { Button, Collapse, Divider, Input, Modal, Popconfirm } from "antd";
import Cookies from "js-cookie";
import { CaretRightOutlined } from "@ant-design/icons";


const Faqs = () => {
  const [items, setItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState({});
  const [editedQuestion, setEditedQuestion] = useState("");
  const [editedAnswer, setEditedAnswer] = useState("");
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const token = Cookies.get("apiToken");
        const response = await fetch(
          "https://doorshark.blownclouds.com/api/user/getFaqs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setItems(data.data);
        
        const initialEditModeState = {};
        data.data.forEach(item => {
          initialEditModeState[item.id] = false;
        });
        setEditMode(initialEditModeState);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };
  
    fetchFaqs();
  }, []);
  

  const onChange = (key) => {
    console.log(key);
  };

  
  const onDeleteClick = (event) => {
    event.stopPropagation();
  };
  const confirm = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  const toggleEditMode = (id) => {
    setEditMode(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };
  const onEditClick = (id) => {
    console.log(id)
    setEditingItemId(id)
    toggleEditMode(id);
  };

 

  const confirmDelete = (id) => {
    // Implement delete confirmation and action here
  };

  const cancelDelete = () => {
    // Handle cancel delete action
  };

  const onSaveClick = async (faqId, event) => {
    try {
      const token = Cookies.get("apiToken");
      const response = await fetch(
        `https://doorshark.blownclouds.com/api/adminRoute/editFaqs${editingItemId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
      
            question: items.question, 
            answer: items.answer, 
          }),
        }
      );
      if (response.ok) {
      
        const data = await response.json();
        setItems(data.data);
        message.success("FAQ edited successfully");
       
        setEditMode(false);
      } else {
        message.error("Failed to edit FAQ");
      }
    } catch (error) {
      console.error("Error editing FAQ:", error);
      message.error("Failed to edit FAQ");
    }
  };
  const handleQuestionChange = (e) => {
    setEditedQuestion(e.target.value);
  };
  

  const handleAnswerChange = (e) => {
    setEditedAnswer(e.target.value);
  };
  
  return (
    <div>
      <div className="flex justify-between  pl-[10px] pr-[10px] ml-[16px] mr-[16px] items-center mt-[20px] mb-[40px]">
        <h1 className="Doctors text-[22px] text-[#054fb9] font-sans">FAQS</h1>
        <Button
          onClick={() => {
            setIsEditing(true);
          }}
          className="!text-[#ffffff] bg-[#054fb9] text-[18px]  rounded-r-[10px] rounded-l-[10px] w-[150px] h-[40px]"
        >
          ADD FAQS
        </Button>
      </div>
      <Divider className="!w-[97%] text-[#054fb9]  flex justify-center mx-auto bg-[#054fb9] min-w-0" />

      <div className="w-[50%] justify-center mx-auto flex mt-[20px]">
        <div className="w-[100%] flex  justify-center mx-auto border-none">
          <Collapse
            className="!w-[100%] border-none !mb-[50px] "
            defaultActiveKey={["1"]}
            onChange={onChange}
            bordered={false}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined
                className="!text-white mt-[10px]"
                rotate={isActive ? 90 : 0}
              />
            )}
          >
            {items.map((item) => (
              <Collapse.Panel
                className="!bg-[#054fb9] rounded-[20px] !border-none !text-white"
                key={item.key}
                header={
                  <div className="flex justify-between items-center">
                    {editMode[item.id] ? (
                         <Input value={editedQuestion} onChange={handleQuestionChange} />
                    //   <Input value={item.question} />
                    ) : (
                      <p className="!text-white !rounded-[20px]">
                        {item.question}{" "}
                      </p>
                    )}
                    <div className="flex gap-[5px]">
                      <Button
                        className="!text-[#054fb9] font-semibold !bg-[#ffff] rounded-l-[20px] rounded-r-[20px]"
                        onClick={() => onEditClick(item._id)}
                      >
                        {editMode[item._id] ? "Save" : "Edit"}
                      </Button>

                      <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => confirmDelete(item.id)}
                        onCancel={cancelDelete}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button
                          className="!text-[#dc4545] font-semibold !bg-[#ffff] rounded-l-[20px] rounded-r-[20px]"
                          onClick={() => onDeleteClick(item.id)}
                        >
                          Delete
                        </Button>
                      </Popconfirm>
                    </div>
                  </div>
                }
                showArrow={item.showArrow}
              >
               

                {editMode[item.id] ? (
                    <Input.TextArea value={editedAnswer} onChange={handleAnswerChange} />
                //   <Input.TextArea value={item.answer} />
                ) : (
                  <p className="!bg-[#ffffff] p-[20px] rounded-[10px]">
                    {item.answer}
                  </p>
                )}
              </Collapse.Panel>
            ))}
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
