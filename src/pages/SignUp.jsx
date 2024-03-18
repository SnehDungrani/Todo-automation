import React, { useEffect, useState } from "react";
import { Button, Card, Input, Form, Checkbox, Spin } from "antd";
import { LoginOutlined, UserOutlined } from "@ant-design/icons";
import { SiGnuprivacyguard } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { TbUserEdit } from "react-icons/tb";
import useHttp from "../Hooks/use-http";
import CONSTANTS from "../util/constant/CONSTANTS";

const SignUp = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const API = useHttp();

  const loginHandler = () => {
    form
      .validateFields()
      .then(async (value) => {
        console.log(value);

        const userDetail = {
          name: value.name,
          email: value.email,
          password: value.password,
        };

        API.sendRequest(
          CONSTANTS.API.auth.signup,
          (res) => {
            console.log(res);
          },
          userDetail,
          "Signup Successfully"
        );

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        form.resetFields();
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card style={{ width: "90%", maxWidth: "450px", padding: "2%" }}>
        <h1 style={{ textAlign: "center" }}>Sign Up</h1>
        <Form form={form}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input your Name!" }]}
            >
              <Input prefix={<TbUserEdit />} placeholder="Name" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                { type: "email", message: "The input is not valid E-mail!" },
                { required: true, message: "Please input your E-mail!" },
              ]}
            >
              <Input
                type="email"
                prefix={<UserOutlined />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
                { min: 8, message: "Password must have a minimum length of 8" },
              ]}
            >
              <Input.Password
                type="password"
                prefix={<SiGnuprivacyguard />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The passwords that you entered do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                type="password"
                prefix={<SiGnuprivacyguard />}
                placeholder="Confirm Password"
              />
            </Form.Item>
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("Should accept agreement")),
                },
              ]}
              style={{ textAlign: "center" }}
            >
              <Checkbox>I have read the agreement</Checkbox>
            </Form.Item>
            {API.isLoading ? (
              <Spin
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              />
            ) : (
              <Button
                type="primary"
                shape="round"
                icon={<LoginOutlined />}
                onClick={loginHandler}
                htmlType="submit"
              >
                Sign Up
              </Button>
            )}
            <br />
            <span style={{ textAlign: "center" }}>Have an account?</span>
            <br />
            <Button type="link">
              <Link to="/login" relative="path">
                Login
              </Link>
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default SignUp;
