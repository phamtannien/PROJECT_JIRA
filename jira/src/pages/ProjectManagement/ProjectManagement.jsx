import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  Button,
  Input,
  Space,
  AutoComplete,
  Table,
  Tag,
  message,
  Popconfirm,
  Avatar,
  Popover,
} from "antd";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormEditProject from "../../components/Form/FormEditProject";
import Sidebar from "../../components/Sidebar";
import Menu from "../../components/Menu";

export default function ProjectManagement() {
  const projectList = useSelector(
    (state) => state.projectCyberbugsReducer.projectList
  );
  const userSearch  = useSelector((state) => state.userReducer.userSearch);
  
  const [value, setValue] = useState("")
  
 const searchRef = useRef(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "GET_LIST_PROJECT_SAGA" });
  }, []);

  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });
  const handleChange = (pagination, filters, sorter) => {
    console.log("vari para", pagination, filters, sorter);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };
  

  let { sortedInfo, filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  const colums = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",

      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend"],
      width: 150,
    },
    {
      title: "projectName",
      dataIndex: "projectName",
      key: "projectName",
      render: (text, record, index)=>{
        return <NavLink to={`/projectDetail/${record.id}`}>{text}</NavLink>
      },
      sorter: (a, b) => {
        let name1 = a.projectName?.trim().toLowerCase();
        let name2 = b.projectName?.trim().toLowerCase();
        if (name2 < name1) {
          return -1;
        }
        return 1;
      },
      sortDirections: ["descend"],

      width: 250,
    },
    {
      title: "category",
      dataIndex: "categoryName",
      key: "category",
      sorter: (a, b) => {
        let name1 = a.categoryName?.trim().toLowerCase();
        let name2 = b.categoryName?.trim().toLowerCase();
        if (name2 < name1) {
          return -1;
        }
        return 1;
      },
      sortDirections: ["descend"],
      width: 250,
    },
    {
      title: "creator",

      key: "creator",
      render: (text, project) => {
        return <Tag color="green">{project.creator.name}</Tag>;
      },
      sorter: (a, b) => {
        let name1 = a.creator.name?.trim().toLowerCase();
        let name2 = b.creator.name?.trim().toLowerCase();
        if (name2 < name1) {
          return -1;
        }
        return 1;
      },
      sortDirections: ["descend"],
      width: 200,
    },
    {
      title: "members",
      key: "members",
      render: (text, record, idx) => {
        return (
          <div>
            {record.members?.slice(0, 3).map((member, index) => {
              return <Popover key={index} placement="top" title="members" content={()=>{
                return <table>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Avatar</th>
                      <th>name</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {record.members?.map((item, idx)=>{
                      return <tr key={idx}>
                        <td>{item.userId}</td>
                        <td><img width={30} height={30} style={{borderRadius: "50%"}} src={item.avatar} alt="..." /></td>
                        <td>{item.name}</td>
                        <td>
                          <button style={{borderRadius: "50%"}} className="btn btn-danger" onClick={()=>{
                            dispatch({
                              type: "REMOVE_USER_PROJECT_API",
                              userProject: {
                                userId: item.userId,
                                projectId: record.id
                              }
                            })
                          }}>X</button>
                        </td>
                      </tr>
                    })}
                  </tbody>
                </table>
              }}>
                <Avatar key={index} src={member.avatar} />
              </Popover>;
            })}
            {record.members?.length > 3 ? <Avatar>...</Avatar> : ""}

            <Popover
              placement="rightTop"
              title={"Add user "}
              content={() => {
                return (
                  <AutoComplete
                    options={userSearch?.map((user, idx) => {
                      return { label: user.name, value : user.userId.toString() };
                    })}
                    
                    value={value}
                    onChange={(text)=>{
                      setValue(text)
                    }}
                    onSelect={(valueSelect,option)=>{
                      //set gía trị của hộp thoại = option.label
                      setValue(option.label)
                      //call api
                      dispatch({
                        type:"ADD_USER_PROJECT_API",
                        userProject: {
                          "projectId": record.id,
                          "userId": valueSelect
                        }
                      })
                    }}
                    onSearch={(values) => {

                      if(searchRef.current){
                        clearTimeout(searchRef.current);
                      }
                      searchRef.current = setTimeout(()=>{
                        dispatch({
                          type: "GET_USER_API",
                          keyWord: values,
                        });
                      },300)
                     
                    }}
                    style={{
                      width: "100%",
                    }}
                  />
                );
              }}
              trigger="click"
            >
              <Button style={{ borderRadius: "50%" }}>+</Button>
            </Popover>
          </div>
        );
      },
      width: 400,
    },
    {
      title: "action",
      key: "action",
      render: (text, record) => {
        return (
          <div>
            <button
              className="btn mr-2 btn-primary"
              onClick={() => {
                const action = {
                  type: "OPEN_FORM_EDIT_PROJECT",
                  title: "Edit project",
                  Component: <FormEditProject />,
                };
                dispatch(action);
                //dispatch dữ liệu hiện tại lên reducer
                const actionEditProject = {
                  type: "EDIT_PROJECT",
                  projectEditModel: record,
                };
                dispatch(actionEditProject);
              }}
            >
              <EditOutlined style={{ fontSize: 17 }} />
            </button>
            <Popconfirm
              placement="topRight"
              title="Are you sure to delete this project?"
              onConfirm={() => {
                dispatch({
                  type: "DELETE_PROJECT_SAGA",
                  idProject: record.id,
                });
              }}
              okText="Yes"
              cancelText="No"
            >
              <button className="btn  btn-danger">
                <DeleteOutlined style={{ fontSize: 17 }} />
              </button>
            </Popconfirm>
            ,
          </div>
        );
      },
      width: 200,
    },
  ];
  return (

    <div className="jira">
    
    <div className="container">
      <h3>Project Management</h3>
   
     
      <Table
        columns={colums}
        dataSource={projectList}
        onChange={handleChange}
      />
    </div>
   </div>

   
  );
}
