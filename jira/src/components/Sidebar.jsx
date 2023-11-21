import React, { useState } from 'react';


import {
 
  BarsOutlined,
  PlusOutlined,
  SearchOutlined,
  LogoutOutlined
  
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, notification } from 'antd';
import { useDispatch } from 'react-redux';
import FormCreateTask from './Form/FormCreateTask';
import { USER_LOGIN } from '../constants/api';
import { signinAction } from '../store/actions/cyberBugsAction';
import { useNavigate } from 'react-router-dom';
import { OPEN_FORM_CREATE_TASK } from '../constants/modalConstant';
const { Sider,  } = Layout;


export default function Sidebar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [state, setState] = useState({
    collapsed: false,
  })
  const toggle = ()=>{
    setState({
      collapsed: !state.collapsed,
    })
  }
  const handleLogout = ()=>{
     localStorage.removeItem(USER_LOGIN);
     dispatch(signinAction(null))
     navigate("/login")
  }
  return (
    <div>
      <Sider trigger={null} collapsible collapsed={state.collapsed} style={{height:"100%"}}>
      <div className='text-right pr-2' onClick={toggle}> <BarsOutlined style={{cursor: "pointer",  fontSize: 25}}/></div>
      <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<PlusOutlined style={{fontSize: 20}}/>}onClick={()=>{
          dispatch({
            type:OPEN_FORM_CREATE_TASK,
            Component: <FormCreateTask/>,
            title: "Create Task"
          })
        }}>
          <span className='mb-2'> Create task</span>
        </Menu.Item>
        <Menu.Item key="2" icon={<SearchOutlined style={{fontSize: 20}}/>}>

          Search
        </Menu.Item>
        <Menu.Item  key="3" icon={<LogoutOutlined style={{fontSize: 20}}/>} onClick={handleLogout}>
          Logout
        </Menu.Item>
      </Menu>
     </Sider>
    
    </div>

  
 
  ) 
 
}
