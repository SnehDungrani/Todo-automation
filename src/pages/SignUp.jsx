// import React, { useState } from "react";
import { Button, Card, Input, Form, Checkbox, notification, Spin } from "antd";
import { LoginOutlined, UserOutlined } from "@ant-design/icons";
import { SiGnuprivacyguard } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";

const SignUp = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState();

  const navigate = useNavigate();

  // const [hasError, setHasError] = useState(true);

  const loginHandler = () => {
    form
      .validateFields()
      .then(async (value) => {
        console.log(value);
        setIsLoading(true);

        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            value.email,
            value.password
          );

          console.log(userCredential);

          const user = userCredential.user;
          localStorage.setItem("token", user.accessToken);
          localStorage.setItem("user", JSON.stringify(user));

          notification.success({
            message: "signup Successfully",
            duration: 1,
          });

          navigate("/login");
        } catch (err) {
          console.error(err);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        form.resetFields();
        console.log(err);
      });
  };

  // const buttonChangeHandler = () => {
  //   if (form.validateFields()) {
  //     setHasError(false);
  //   } else {
  //     setHasError(true);
  //   }
  // };

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
            height: "570px",
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
                onClick={loginHandler}
                htmlType="submit"
              >
                <Link to=".." relative="path">
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
