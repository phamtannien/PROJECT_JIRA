import React, { useEffect, useState } from "react";
import { Layout, Space } from "antd";
import Login from "../../pages/Login/Login";

const { Header, Footer, Sider, Content } = Layout;

export default function UserLogin() {
    const [{width, height}, setSize] = useState({width: window.innerWidth, height: window.innerHeight})

    useEffect(()=>{
        window.onresize = ()=>{
            setSize({
                width: Math.round(window.innerWidth) ,
                height:Math.round(window.innerHeight)
            })
        }
    },[])

  return (
    <>
      <Layout>
        <Sider
            width={width/2}        
          style={{
            height: height,
            backgroundImage: `url(https://picsum.photos/${Math.round(width/2)}/${height})`,
            backgroundSize: "100%"
          }}
        ></Sider>
        <Content>
          <Login />
        </Content>
      </Layout>
    </>
  );
}
