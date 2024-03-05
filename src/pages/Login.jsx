// import React, { useState } from "react";
import { Button, Card, Input, Form, notification, Spin, Modal } from "antd";
import { LoginOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { SiGnuprivacyguard } from "react-icons/si";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [modal, contextHolder] = Modal.useModal();

  const countDown = () => {
    let secondsToGo = 5;
    const instance = modal.success({
      title: "This is a notification message",
      content: `This modal will be destroyed after ${secondsToGo} second.`,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      instance.update({
        content: `This modal will be destroyed after ${secondsToGo} second.`,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      instance.destroy();
    }, secondsToGo * 1000);
  };

  const loginHandler = () => {
    form
      .validateFields()
      .then(async (value) => {
        console.log(value);
        setIsLoading(true);
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            value.email,
            value.password
          );

          console.log(userCredential);

          const user = userCredential.user;
          localStorage.setItem("token", user.accessToken);
          localStorage.setItem("user", JSON.stringify(user));

          notification.success({
            message: "Login Successfully",
            duration: 1,
          });
          setIsLoading(false);

          navigate("/home");
        } catch (err) {
          console.error(err);
          setIsLoading(false);
          countDown();
        }
      })

      .catch((err) => {
        form.resetFields();
        console.log(err);
      });
  };

  return (
    <div gap="middle" wrap="wrap">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "8%",
        }}
      >
        <Card
          style={{
            width: "450px",
            height: "450px",
          }}
        >
          <h1 style={{ textAlign: "center" }}>Login</h1>
          <br />

          {contextHolder}
          <Form form={form}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Form.Item
                id="email"
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input
                  placeholder="Email"
                  id="email"
                  name="email"
                  type="email"
                  prefix={<UserOutlined />}
                  style={{
                    width: "310px",
                    height: "35px",
                  }}
                />
              </Form.Item>
              <Form.Item
                id="password"
                name="password"
                rules={[
                  {
                    type: "password",
                    message: "The input is not valid Password!",
                  },
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                  {
                    min: 8,
                    message: "Password must have a minimum length of 8",
                  },
                ]}
              >
                <Input.Password
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  prefix={<SiGnuprivacyguard />}
                  style={{
                    width: "310px",
                    height: "35px",
                  }}
                />
              </Form.Item>
              <br />
              {isLoading ? (
                <Spin />
              ) : (
                <Button
                  type="primary"
                  shape="round"
                  icon={<LoginOutlined />}
                  style={{ width: "10vw" }}
                  onClick={loginHandler}
                  htmlType="submit"
                >
                  Login
                </Button>
              )}
              <br />
              Don't have an account?
              <br />
              <br />
              <Button
                type="primary"
                shape="round"
                icon={<LoginOutlined />}
                style={{ width: "10vw" }}
              >
                <Link to="/signup">SignUp</Link>
              </Button>
            </div>
          </Form>

          <br />
          <br />
        </Card>
      </div>
    </div>
  );
};
export default Login;
