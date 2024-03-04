// import React, { useState } from "react";
import { Button, Card, Input, Form } from "antd";
import { LoginOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { SiGnuprivacyguard } from "react-icons/si";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const loginHandler = () => {
    form
      .validateFields()
      .then(async (value) => {
        console.log(value);

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
          navigate("/home");
        } catch (err) {
          console.error(err);
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
              <br />
              or
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
