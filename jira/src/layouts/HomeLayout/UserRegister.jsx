import React, { useEffect, useState } from "react";
import { Layout, Space } from "antd";
import Register from "../../pages/Register/Register";

const { Header, Footer, Sider, Content } = Layout;

export default function UserRegister() {
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
       
        <Content>
          <Register />
        </Content>
        <Sider
            width={width/2}        
          style={{
            height: height,
            backgroundImage: `url(https://picsum.photos/${Math.round(width/2)}/${height})`,
            backgroundSize: "100%"
          }}
        ></Sider>
      </Layout>
    </>
  );
}