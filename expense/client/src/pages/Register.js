import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './register.css'


// import reg from "register.jpeg"
// Get the modal



const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post('/api/v1/users/register', values);
      message.success("Registeration Successfull");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
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
      <div className="signup-box">
    {loading}
        <Form layout='vertical'  onFinish={submitHandler} >
          <h1 className="head text-center">SIGN UP</h1>
          <Form.Item label="Name" name="name" className="h1 fw-bold mb-2 mx-1 mx-md-4 mt-4">
            <Input type='name' />
          </Form.Item>
          <Form.Item label="Email" name="email" className="h1 fw-bold mb-2 mx-1 mx-md-4 mt-4">
            <Input type='email' />
          </Form.Item>
       
          <Form.Item label="What Is Your Favorite Place?" name="sq" className="h1 fw-bold mb-2 mx-1 mx-md-4 mt-4">
            <Input type='sq' />
          </Form.Item>
          <Form.Item label="Password" name="password" className="h1 fw-bold mb-2 mx-1 mx-md-4 mt-4">
            <Input type='password' />
          </Form.Item>


          <div className="text-center mb-2 mx-1 mx-md-4 mt-4">
            <Link to="/login">Already User? Sign IN</Link>
          </div>
          <div className="d-flex justify-content-center">
            <button className='btn btn-primary'>SIGN UP</button>
          </div>
        </Form>
      </div>
    </>
  )
}

export default Register;