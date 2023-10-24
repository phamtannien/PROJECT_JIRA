import React from "react";
import { UserOutlined, LockOutlined, TwitterOutlined } from "@ant-design/icons";
import { Button, Input,  } from "antd";
import {withFormik, Form} from "formik";
import * as Yup from 'yup';
import { connect, useDispatch } from "react-redux";
import { USER_SIGNIN_API } from "../../store/types/userSignin";
import { signinAction } from "../../store/actions/cyberBugsAction";

 function Login(props) {
    
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      } = props;

    return (
    <form onSubmit={handleSubmit} className="container" style={{ height: window.innerHeight }}>
      <div
        className="d-flex flex-column justify-content-center align-items-center "
        style={{ height: window.innerHeight }}
      >
        <h3 className="text-center" style={{fontWeight: 300, fontSize: 35}}>Login CyberBugs</h3>

        <div className="d-flex mt-3" >
          <Input
          onChange={handleChange}
            name="email"
            size="large"
            placeholder="email"
            prefix={<UserOutlined />}
          />
        </div>
        <div className="text-danger">{errors.email}</div>
        <div className="d-flex mt-3" >
          <Input
            onChange={handleChange}
            name="password"
            type="password"
            size="large"
            placeholder="password"
            prefix={<LockOutlined />}
          />
        </div>
        <div className="text-danger">{errors.password}</div>

        <Button htmlType="submit" style={{width:"20%", backgroundColor:"rgb(102,117,223)"}} className="mt-3" size="large" type="primary">Login</Button>
        <div className="social d-flex mt-3">
          <Button style={{backgroundColor:"rgb(59,89,152)"}} shape="circle" size="large">
                <span className="font-weight-bold text-white">F</span>
          </Button>
          <Button type="primary ml-3" shape="circle" icon={<TwitterOutlined />} size="large">

          </Button>
        </div>
      </div>
    </form>
  );
}

const LoginWithFormik = withFormik({
    mapPropsToValues: () => ({ 
        email: '' ,
        password: '',
}),
  
    validationSchema: Yup.object().shape({
        email: Yup.string().required("Email is not required").email("email is invalid!"),
        password: Yup.string().min(6, "password must have min 6 characters").max(32,"password must have max 32 characters" )
    }) ,
  
    handleSubmit: ({email, password}, {props, setSubmitting }) => {
      
        setSubmitting(true)
       props.dispatch(signinAction(email, password))
       
       
    },
  
    displayName: 'BasicForm',
  })(Login);

export default connect ()(LoginWithFormik) ;
