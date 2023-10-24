
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { Fragment, useEffect, useRef, useState,  } from 'react';
import { Button, Input, Space, Table } from 'antd';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



export default function ProjectManagement() {
    const projectList = useSelector(state=>state.projectCyberbugsReducer.projectList)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch({type:"GET_LIST_PROJECT_SAGA"})
    },[])
    
    
    
    const [state, setState] = useState({
        filteredInfo: null,
        sortedInfo: null,
    })
    const handleChange = (pagination, filters, sorter) =>{
        console.log('vari para', pagination, filters, sorter);
        setState({
            filteredInfo: filters,
            sortedInfo: sorter
        })
    };
    const clearFilter = ()=>{
        setState({filteredInfo:null})
    }
    const clearAll = ()=>{
        setState({
            filteredInfo: null,
            sortedInfo: null
        })
    }
    const setAgeSort = ()=>{
        setState({
            sortedInfo:{
                order: "descend",
                columKet: "age"
            }
        })
    }

    let {sortedInfo, filteredInfo} = state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const colums = [
        {
            title: "id",
            dataIndex: "id",
            key: "id",
           
            sorter: (a,b) => a.id - b.id,
            sortOder: sortedInfo.columKey === "id" && sortedInfo.oder,
            // ellipsis: true,
            width: 150,
        },
        {
            title: "projectName",
            dataIndex: "projectName",
            key: "projectName",
            sorter: (a,b) => a.projectName.length - b.projectName.length,
            sortOder: sortedInfo.columKey === "age" && sortedInfo.oder,
            ellipsis: true,
            width: 250,
        },
        {
            title: "category",
            dataIndex: "categoryName",
            key: "category",
            
            width: 250,
        },
        {
            title: "creator",
           
            key: "creator",
            render: (text, project) =>{
                return <Fragment>
                 <NavLink>{project.creator.name}</NavLink>
                </Fragment>
             },
             width: 200,
        },
        {
            title: "members",
            key: "members",
            render: (text, project) =>{
                return <Fragment>
                 <NavLink>{project.members.map((element, idx)=>{
                    return <img className='mr-2' style={{width:'50px', height:'50px', borderRadius: "50%"}} key={idx} src={element.avatar} alt="..." />
                 })}</NavLink>
                </Fragment>
             },
             width: 400,
        },
        {
            title: "action",
            key: "action",
            render: (text, user) =>{
               return <Fragment>
                <NavLink><EditOutlined className='mr-3'  style={{ color: "blue" }}/></NavLink>
                <NavLink><DeleteOutlined style={{ color: "red", cursor: "pointer" }}/></NavLink>
               </Fragment>
            },
            width: 200,
        },
    ]
  return  <div className='container-fluid'>
    <h3>Project Management</h3>
  <Space style={{marginBottom: 16}}/>
  <Button onClick={setAgeSort}>Sort age</Button>
  <Button onClick={clearFilter}>Clear filters</Button>
  <Button onClick={clearAll}>Clear fillters and sorters</Button>
  <Table columns={colums} dataSource={projectList} onChange={handleChange}/>
  </div>
}
