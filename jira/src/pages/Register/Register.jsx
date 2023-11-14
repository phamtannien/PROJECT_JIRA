import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined, TwitterOutlined } from "@ant-design/icons";
import { Button, Input, notification } from "antd";
import { userService } from "../../services/userService";

export default function Register() {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: "",
    passWord: "",
    name: "",
    phoneNumber: "",
  });
  //validate
  const [formError, setFormError] = useState({});
  const isEmptyValue = (value) => {
    return !value || value.trim().length < 1;
  };
  const isEmptyValid = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  const validateForm = () => {
    const error = {};

    if (isEmptyValue(formValue.name)) {
      error["name"] = "vui lòng nhập họ tên";
    }
    
    if (isEmptyValue(formValue.passWord)) {
      error["passWord"] = "vui lòng nhập mật khẩu";
    }
    if (isEmptyValue(formValue.email)) {
      error["email"] = "vui lòng nhập email ";
    } else {
      if (!isEmptyValid(formValue.email)) {
        error["email"] = "Emailkhông đúng định dạng";
      }
    }
    if (isEmptyValue(formValue.phoneNumber)) {
      error["phoneNumber"] = "vui lòng nhập số điện thoại";
    }

    setFormError(error);

    return Object.keys(error).length === 0;
  };

  const handleChange = (event) => {
    setFormValue({
      ...formValue,

      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const result = await userService.signupApi(formValue);
        notification.success({
          message: 'Đăng ký thành công'
      })
        navigate("/login");
      } catch (error) {
        notification.warning({
          message: `${error.response?.data.content}`
      })
        console.log("error", error.response?.data);
      }

    } else {

    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="container"
      style={{ height: window.innerHeight }}
    >
      <div
        className="d-flex flex-column justify-content-center align-items-center "
        style={{ height: window.innerHeight }}
      >
        <h3 className="text-center" style={{ fontWeight: 300, fontSize: 35 }}>
          Register CyberBugs
        </h3>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form3Example3cg">
            Your Email
          </label>
          <input
            onChange={handleChange}
            value={formValue.email}
            name="email"
            type="text"
            id="form3Example3cg"
            className="form-control form-control-lg"
          />
          {formError.email && (
            <div className="error-feedback text-danger">{formError.email}!!!</div>
          )}
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form3Example4cg">
            Your password
          </label>
          <input
            onChange={handleChange}
            value={formValue.passWord}
            name="passWord"
            type="password"
            id="form3Example4cg"
            className="form-control form-control-lg"
          />
          {formError.passWord && (
            <div className="error-feedback text-danger">{formError.passWord}!!!</div>
          )}
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form3Example4cdg">
            Your Name
          </label>
          <input
            onChange={handleChange}
            value={formValue.name}
            name="name"
            type="text"
            id="form3Example4cdg"
            className="form-control form-control-lg "
          />
          {formError.name && (
            <div className="error-feedback text-danger">{formError.name}!!!</div>
          )}
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form3Example4cdg">
            Your phone number
          </label>
          <input
            onChange={handleChange}
            value={formValue.phoneNumber}
            name="phoneNumber"
            type="number"
            id="form3Example4cdg"
            className="form-control form-control-lg"
          />
          {formError.phoneNumber && (
            <div className="error-feedback text-danger">{formError.phoneNumber}!!!</div>
          )}
        </div>
        <div className="d-flex">
        
        <Button htmlType="submit"  style={{width:"50%", backgroundColor:"rgb(102,117,223)"}} className="mt-3 mr-3 text-white" size="large"  >Register</Button>
        <Button onClick={()=>navigate("/login")} style={{width:"50%", backgroundColor:"rgb(102,117,223)"}} className="mt-3 " size="large" type="primary">Login</Button>
        </div>
        <div className="social d-flex mt-3">
          <Button
            style={{ backgroundColor: "rgb(59,89,152)" }}
            shape="circle"
            size="large"
          >
            <span className="font-weight-bold text-white">F</span>
          </Button>
          <Button
            type="primary ml-3"
            shape="circle"
            icon={<TwitterOutlined />}
            size="large"
          ></Button>
        </div>
      </div>
    </form>
  );
}
