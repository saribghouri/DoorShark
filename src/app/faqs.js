import React, { useState, useEffect } from "react";
import { Button, Collapse, Divider, Input, Popconfirm, message } from "antd";
import Cookies from "js-cookie";
import { CaretRightOutlined } from "@ant-design/icons";
import AddFaqs from "./addfaqs";

const Faqs = () => {
  const [items, setItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editMode, setEditMode] = useState({});
  const [editedQuestion, setEditedQuestion] = useState("");
  const [editedAnswer, setEditedAnswer] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [collapseState, setCollapseState] = useState({});

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
        const initialCollapseState = {};
        data.data.forEach((item) => {
          initialEditModeState[item.id] = false;
          initialCollapseState[item.id] = false;
        });
        setEditMode(initialEditModeState);
        setCollapseState(initialCollapseState);

        data.data.forEach((item) => {
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



  const cancelDelete = () => {};

  const toggleEditMode = (id) => {
    setEditMode((prevState) => {
      const newState = { ...prevState };

      newState[id] = !prevState[id];

      Object.keys(newState).forEach((itemId) => {
        if (itemId !== id) {
          newState[itemId] = false;
        }
      });
      return newState;
    });
  };

  const onEditClick = (event, id, initialQuestion, initialAnswer) => {
    event.stopPropagation(); 
    setEditingItemId(id);
    toggleEditMode(id);
    setEditedQuestion(initialQuestion);
    setEditedAnswer(initialAnswer);
  };

  const onSaveClick = async (event, faqId) => {
    try {
      event.stopPropagation(); // Stop event propagation
      const token = Cookies.get("apiToken");
      const response = await fetch(
        `https://doorshark.blownclouds.com/api/adminRoute/editFaqs/${faqId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: editedQuestion,
            answer: editedAnswer,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setItems(
          items.map((item) =>
            item._id === faqId
              ? { ...item, question: editedQuestion, answer: editedAnswer }
              : item
          )
        );
        message.success("FAQ edited successfully");
        toggleEditMode(faqId);
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
    console.log(e.target.value);
    setEditedAnswer(e.target.value);
  };
  const confirmDelete = async (event,id) => {
    try {
    
      const token = Cookies.get("apiToken");
      const response = await fetch(
        `https://doorshark.blownclouds.com/api/adminRoute/dltFaqs/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {

        setItems(items.filter(item => item._id !== id));
        message.success("FAQ deleted successfully");
      } else {
        message.error("Failed to delete FAQ");
      }
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      message.error("Failed to delete FAQ");
    }
  };
 
  return (
    <div>
      {isEditing ? (
        <AddFaqs onCancel={() => setSelectedUser(null)} />
      ) : (
        <div>
          <div className="flex justify-between  pl-[10px] pr-[10px] ml-[16px] mr-[16px] items-center mt-[20px] mb-[40px]">
            <h1 className="Doctors text-[22px] text-[#054fb9] font-sans">
              FAQS
            </h1>
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
                // defaultActiveKey={["-0"]}
                onChange={onChange}
                bordered={false}
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined
                    className="!text-white mt-[10px]"
                    rotate={isActive ? 90 : 0}
                  />
                )}
              >
                {Array.isArray(items) &&
                  items.map((item) => (
                    <Collapse.Panel
                      className="!bg-[#054fb9] rounded-[20px] !border-none !text-white"
                      key={item.key}
                      header={
                        <div className="flex justify-between items-center">
                          {editMode[item._id] ? (
                            <Input className="mr-[10px] rounded-[20px]"
                              value={editedQuestion}
                              onChange={(e) =>
                                handleQuestionChange(e, item._id)
                              }
                            />
                          ) : (
                            <p
                              className="!text-white !rounded-[20px]"
                              onClick={() => toggleCollapseState(item._id)}
                              style={{ cursor: "pointer" }}
                            >
                              {item.question}{" "}
                            </p>
                          )}
                          <div className="flex gap-[5px]">
                            {editMode[item._id] ? (
                              <Button
                                className="!text-[#054fb9] font-semibold !bg-[#ffff] rounded-l-[20px] rounded-r-[20px]"
                                onClick={(event) =>
                                  onSaveClick(event, item._id)
                                }
                              >
                                save
                              </Button>
                            ) : (
                              <Button
                                className="!text-[#054fb9] font-semibold !bg-[#ffff] rounded-l-[20px] rounded-r-[20px]"
                                onClick={(event) =>
                                  onEditClick(
                                    event,
                                    item._id,
                                    item.question,
                                    item.answer
                                  )
                                }
                              >
                                edit
                              </Button>
                            )}

                            <Popconfirm
                              title="Delete the task"
                              description="Are you sure to delete this task?"
                              onConfirm={(event) => confirmDelete( event,item._id)}
                              onCancel={cancelDelete}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button
                                className="!text-[#dc4545] font-semibold !bg-[#ffff] rounded-l-[20px] rounded-r-[20px]"
                                onClick={(event) => onDeleteClick(event,item._id)}
                              >
                                Delete
                              </Button>
                            </Popconfirm>
                          </div>
                        </div>
                      }
                      showArrow={item.showArrow}
                      collapsible={true}
                      collapsed={collapseState[item._id]}
                    >
                      {editMode[item._id] ? (
                        <Input.TextArea 
                          value={editedAnswer}
                          onChange={handleAnswerChange}
                        />
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
      )}
    </div>
  );
};

export default Faqs;
