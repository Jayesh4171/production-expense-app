import axios from "axios";
import { Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import './register.css'

const SecQue = () => {
    
    const navigate = useNavigate();
    const verifyOTP = async (values) => {
        try {
          
          const { data } = await axios.post("/users/verifySQ", values);
          message.success("Password reset successfully")
          navigate("/login");
          
        } catch (error) {
          message.error("Unable To Change Password");
        }
      };
      
    return (
        
<div className="login-box">
                        
            <Form layout='vertical' onFinish={verifyOTP} >
                <h4 className="head text-center">Verify Security Question</h4>
                <Form.Item label="Email" name="email" className="h1 fw-bold mb-2 mx-1 mx-md-4 mt-4">
                    <Input type='email' />
                </Form.Item>
                <Form.Item label='What is your favorite place' name="sq" className="h1 fw-bold mb-2 mx-1 mx-md-4 mt-4">
                    <Input type='sq' />
                </Form.Item>
                <Form.Item label="Password" name="password" className="h1 fw-bold mb-2 mx-1 mx-md-4 mt-4">
            <Input type='password' />
          </Form.Item>
                <div className="d-flex justify-content-center">
                    <button className='btn btn-primary'>Verify</button>
                    </div>
                    
            </Form>
            </div>      
    )
}

export default SecQue