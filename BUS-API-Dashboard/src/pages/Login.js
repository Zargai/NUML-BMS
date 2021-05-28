import { Form, Input, Button, message, Typography, Spin } from "antd";
import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { Admin } from "../services/api";
import numl from '../numl.jpg'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.css';

function Login() {
  const { Title } = Typography;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    let loggedIn = true;

    const token = localStorage.getItem("token");
    if (token !== null && loggedIn === true) {
      setIsLoggedIn(true);
    }

    return () => (loggedIn = false);
  }, []);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await Admin.signIn(values);
      if (response) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        message.success("Logged in!");
        setIsLoggedIn(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      message.error("Incorrect email or password");
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  return (
    <>
      {isLoggedIn ? (
        <Redirect to="/app" />
      ) : loading ? (
        <Spin
          size="large"
          style={{
            position: "absolute",
            top: "47%",
            right: "50%",
            transform: "translate(0, -50%)",
          }}
        />
      ) : (
        <div
          style={{
            backgroundImage:`url(${numl})`,
            backgroundSize:"cover",
            backgroundPosition:"center",
            height:"100vh",
            width:"100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          
          {/************ Login Container Started Here  **********/}
          <div className='container'>
          <div className='row '>
          <div className='col-lg-6 col-10 admin_login m-auto '>
          <h1 className='admin_Login_title'>Admin Login</h1>
          <Form
            style={{
               margin: "40px 0px",
         }}
            // {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <div
              style={{
                width: "20rem",
             }}
            >
              <span style={{color:"white",
            marginLeft:"110px",float:"left" ,fontSize:"20px"}}>
              Email :</span>
              <Form.Item
               class="form-control"
                style={{
                  width: "300px",
                  marginLeft: "100px",
                  color:"white"
                }}
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input Correct Email!",
                    type: "email",
                  },
                ]}
              >
                <Input />
              </Form.Item>

           <span style={{color:"white",
           marginLeft:"110px",float:"left" ,fontSize:"20px"}}>
              Password :</span>

              <Form.Item
              name="password"
                style={{
                  width: "300px",
                  marginLeft: "100px",
                
                }}
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </div>
            {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}
            <div
              style={{
                textAlign:"center"
                
              }}
            >
              <Form.Item>
                <Button 
                className="btn btn-success"
                type="primary" htmlType="submit" style={{padding:"0px 40px",marginTop:"20px"}}>
                  Submit
                </Button>
              </Form.Item>
            </div>
            <div
              style={{
                paddingRight:"90px",
                textAlign:"center"
              }}
            >
             {/* <Link to="/login"> Admin Portal-(Login)</Link> <br/> */}
          
              
              <Link
              style={{marginLeft:"100px",width:"200px", color:"green"}}
              to="/student-portal">Student(Login)</Link>  <br/>
              <Link
              style={{marginLeft:"100px", color:"green"}}
              to="/student-register">Student(Regestration)</Link> <br/>
              <Link
              style={{marginLeft:"100px", color:"green"}}
              to="/info">Buses/ Drivers Info</Link> <br/>
           
           
            </div>
          </Form>
          </div>
          </div>
          </div>
          {/* Login Container Started Here  */}
        </div>
      )}
    </>
  );
}

export default Login;
