// import React, { useState } from "react";
import { Button, Card, Input, Form, Spin, Modal } from "antd";
import { LoginOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { SiGnuprivacyguard } from "react-icons/si";
import { useState } from "react";

import useHttp from "../Hooks/use-http";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const API = useHttp();

  const [isLoading, setIsLoading] = useState(false);
  const [modal, contextHolder] = Modal.useModal();

  const [isRes, setIsRes] = useState();

  const countDown = () => {
    let secondsToGo = 5;
    const instance = modal.error({
      title: "Authentication Failed!",
      content: `Please use correct Email and Password.`,
    });

    setTimeout(() => {
      instance.destroy();
    }, secondsToGo * 1000);
  };

  const loginHandler = () => {
    form
      .validateFields()
      .then(async (value) => {
        console.log(value);
        setIsLoading(true);

        API.sendRequest(
          {
            endpoint: "https://todo-6-4clg.onrender.com/api/v1/users/login",
            type: "POST",
          },
          (res) => {
            console.log(res);

            if (res.status === "success") {
              navigate("/home");
            }

            const token = res.tokens.token;
            localStorage.setItem("token", token);

            setIsRes(res);
          },
          value,
          "Login Successfully"
        );

        if (isRes.status === "success") {
          setIsLoading(false);
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
                    display: "flex",
                    alignItems: "center",
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
                    display: "flex",
                    alignItems: "center",
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
