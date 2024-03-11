// import React, { useState } from "react";
import { Button, Card, Input, Form, Checkbox, Spin } from "antd";
import { LoginOutlined, UserOutlined } from "@ant-design/icons";
import { SiGnuprivacyguard } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { TbUserEdit } from "react-icons/tb";
import { useState } from "react";
import useHttp from "../Hooks/use-http";
import CONSTANTS from "../util/constant/CONSTANTS";

const SignUp = () => {
  const [form] = Form.useForm();
  const [isRes, setIsRes] = useState();
  const [isLoading, setIsLoading] = useState();
  const navigate = useNavigate();

  const API = useHttp();

  const loginHandler = () => {
    form
      .validateFields()
      .then(async (value) => {
        console.log(value);
        setIsLoading((pr) => !pr);

        const userDetail = {
          name: value.name,
          email: value.email,
          password: value.password,
        };

        API.sendRequest(
          CONSTANTS.API.auth.signup,
          (res) => {
            console.log(res);
            setIsRes(res);
          },
          userDetail,
          "Signup Successfully"
        );

        if (isRes.status === "success") {
          setIsLoading((pr) => !pr);
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        form.resetFields();
        setTimeout(() => {
          setIsLoading((pr) => !pr);
        }, 2000);
      });
  };

  return (
    <div gap="middle" wrap="wrap">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "4%",
        }}
      >
        <Card
          style={{
            width: "450px",
            height: "620px",
          }}
        >
          <h1 style={{ textAlign: "center" }}>Sign Up</h1>
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
                id="name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input
                  id="name"
                  name="name"
                  prefix={<TbUserEdit />}
                  style={{
                    width: "310px",
                    height: "35px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  placeholder="Name"
                />
              </Form.Item>
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
              <Form.Item
                name="confirm"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
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
              >
                <Checkbox>I have read the agreement</Checkbox>
              </Form.Item>
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
                  SignUp
                </Button>
              )}
              <br />
              Have an account?
              <br />
              <br />
              <Button
                type="primary"
                shape="round"
                icon={<LoginOutlined />}
                style={{ width: "10vw" }}
                htmlType="submit"
              >
                <Link to="/login" relative="path">
                  Login
                </Link>
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
export default SignUp;
