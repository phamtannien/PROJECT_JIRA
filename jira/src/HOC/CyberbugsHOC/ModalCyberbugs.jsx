import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
const { Option } = Select;

export default function ModalCyberbugs(props) {
    const {open, ComponentContentModal,callBackSubmit, title} = useSelector(state=>state.modalReducer);

    const dispatch = useDispatch();
 
  const onClose = () => {
    dispatch({type:"CLOSE_MODAL", })
  };
  return <>
  <Drawer
    title={title}
    width={720}
    onClose={onClose}
    open={open}
    styles={{
      body: {
        paddingBottom: 80,
      },
    }}
    extra={
      <Space>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={(callBackSubmit)} type="primary">
          Submit
        </Button>
      </Space>
    }
  >
   {/* Nội dung thay đổi của modal */}
   {ComponentContentModal}
  </Drawer>
</>
}
