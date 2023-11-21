import {
    SearchOutlined,
    EditOutlined,
    DeleteOutlined,

  } from "@ant-design/icons";
  import React, { Fragment, useEffect, useRef, useState } from "react";
  import Highlighter from 'react-highlight-words';
  
  import {
    Button,
    Input,
    Space,
    
    Table,
    
   
    Popconfirm,
    
  } from "antd";
  
  import { useDispatch, useSelector } from "react-redux";
  import {  DELETE_USER_API, GET_USER_API } from "../../constants/userConstants";

  
  export default function UserManagenment() {
   
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
  
    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div
          style={{
            padding: 8,
          }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: 'block',
            }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{
                width: 90,
              }}
            >
              Search
            </Button>
  
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              close
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? '#1677ff' : undefined,
          }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: '#ffc069',
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });
   
   
    const userSearch = useSelector(
      (state) => state.userReducer.userSearch
    );
    
    const [value, setValue] = useState("")
    
   const searchRef = useRef(null);
  
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch({ 
        type: GET_USER_API,
        keyWord: '' 
      });
    }, []);
  
    const [state, setState] = useState({
      filteredInfo: null,
      sortedInfo: null,
    });
    const handleChange = (pagination, filters, sorter) => {
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
            title: "STT",
            dataIndex: "userId",
            render: (text, film, idx) => {
              return <Fragment>{idx + 1}</Fragment>;
            },
            width: 50,
       },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: 400,
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        ...getColumnSearchProps('name'),
        sorter: (a, b) => {
            let name1 = a.name?.trim().toLowerCase();
            let name2 = b.name?.trim().toLowerCase();
            if (name2 < name1) {
              return -1;
            }
            return 1;
          },
        sortDirections: ["descend"],
        width: 400,
      },
      {
        title: "Phone",
        dataIndex: "phoneNumber",
        key: "phoneNumber",
  
        sorter: (a, b) => a.phoneNumber - b.phoneNumber,
        sortDirections: ["descend"],
        width: 400,
      },
      {
        title: "action",
        key: "action",
        render: (text, record) => {
            console.log(record);
          return (
            <div>
              <button
                className="btn mr-2 btn-primary"
                
              >
                <EditOutlined style={{ fontSize: 17 }} />
              </button>
              <Popconfirm
                placement="topRight"
                title="Are you sure to delete this user?"
                onConfirm={() => {
                    
                  dispatch({
                    type: DELETE_USER_API,
                    userId: record.userId,
                    
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
        <h3 className="text-danger mb-5 mt-3">User Management</h3>
     
       
        <Table
          columns={colums}
          dataSource={userSearch}
          onChange={handleChange}
        />
      </div>
     </div>
  
     
    );
  }
