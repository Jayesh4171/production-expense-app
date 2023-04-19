import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './register.css'
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/users/login", values);
      console.log("86432876")
      setLoading(false);
      message.success("Login success");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      )
      
      navigate("/");
    } catch (error) {
      setLoading(false);
      
      message.error("User Not Found");
    }
  };

 
  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
    
    return (
<>

<div className="login-box">
                        {loading}
            <Form layout='vertical' onFinish={submitHandler}>
                <h1 className="head text-center" >SIGN IN</h1>
                <Form.Item label="Email" name="email" className="h1 fw-bold mb-2 mx-1 mx-md-4 mt-4">
                    <Input type='email' />
                </Form.Item>
                <Form.Item label="Password" name="password" className="h1 fw-bold mb-2 mx-1 mx-md-4 mt-4">
                    <Input type='password' />
                </Form.Item>
                <div className="text-center mb-2 mx-1 mx-md-4 mt-4">
                    <Link to="/register">Not a  User? Sign Up</Link>
                </div>
                <div className="d-flex justify-content-center">
                    <button className='btn btn-primary' >Sign In</button>
                    </div>
                    <div className="d-flex justify-content-center">

                    <Link to='/SecQue'><button className="btn" >Forget Password?</button></Link>
                    </div>
            </Form>
            </div>        
</>
    )
}

export default Login;