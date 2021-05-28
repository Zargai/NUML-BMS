import { Form, Input, Button, Typography, message, Spin } from "antd";
import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { Admin } from "../services/api";

function SignUp() {
  const { Title } = Typography;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      setIsLoggedIn(true);
    }
  }, []);

  const onFinish = async (values) => {
    if (values.password !== values.c_password) {
      message.error("passwords do not match");
    } else {
      try {
        setLoading(true);
        const { name, email, password } = values;
        const response = await Admin.signUp({ name, email, password });
        console.log("Success", response.data);
        if (response) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          setIsLoggedIn(true);
          message.success("Account Created");
          message.success("Logged in!");
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        message.error("Email already exists");
        setLoading(false);
      }
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "4.3rem",
          }}
        >
          <Title
            style={{
              marginRight: "4.6rem",
              marginTop: "8rem",
              marginBottom: "10px",
            }}
          >
            Sign Up
          </Title>
          <Form
            style={{ margin: "85px", marginRight: "12.1rem" }}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <div>
              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input
                  style={{
                    marginLeft: ".15rem",
                    width: "87.9%",
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input correct email!",
                    type: "email",
                  },
                ]}
              >
                <Input
                  style={{
                    marginLeft: "2rem",
                    width: "80%",
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  style={{
                    marginLeft: ".5rem",
                    width: "87%",
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Confirm Password"
                name="c_password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  style={{
                    marginLeft: ".9rem",
                    width: "81.9%",
                  }}
                />
              </Form.Item>
            </div>

            {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

            <Form.Item
              style={{
                width: "12rem",
                marginLeft: "11rem ",
                marginTop: "1rem",
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
            <div
              style={{
                
                textAlign:"center"
              }}
            >
              <Link to="/login"> Admin Portal-(Login)</Link> <br/>
              <Link to="/student-portal">Student Portal-(Login)</Link>  <br/>
              <Link to="/student-register">Student Portal-(Regestration)</Link> <br/>
            </div>
          </Form>
        </div>
      )}
    </>
  );
}

export default SignUp;
