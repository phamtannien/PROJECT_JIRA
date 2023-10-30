import React, { useState } from 'react';


import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  BarsOutlined,
  PlusOutlined,
  SearchOutlined
  
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
const { Sider,  } = Layout;


export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div  className='sidebar' >
    <Sider   trigger={null} collapsible collapsed={collapsed} style={{height:100}} >
    <div className="text-right"  onClick={() => setCollapsed(!collapsed)}> <BarsOutlined /></div>
    <Menu
    
      style={{height:'100%'}}
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['1']}
      items={[
        
        {
          key: '1',
          icon: <PlusOutlined style={{fontSize: "25px"}} />,
          label: 'Create issue',
        },
        {
          key: '2',
          icon: <SearchOutlined style={{fontSize: "25px"}} />,
          label: 'Search',
        },
      
      ]}
    />
    
     </Sider>
  </div>
  ) 
 
}
