import { Button, Card, Input, Form, Spin } from "antd";
import { LoginOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { SiGnuprivacyguard } from "react-icons/si";
import CONSTANTS from "../util/constant/CONSTANTS";

import useHttp from "../Hooks/use-http";
import { setAuthDetails } from "../util/API/authStorage";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const API = useHttp();

  const loginHandler = () => {
    form
      .validateFields()
      .then(async (value) => {
        console.log(value);

        API.sendRequest(
          CONSTANTS.API.auth.login,
          (res) => {
            console.log(res);

            setAuthDetails(res.tokens.token, res.data.user.name);
            if (res.status === "success") {
              navigate("/home");
            }

            window.location.reload();
          },
          value,
          "Login Successfully"
        );
      })
      .catch((err) => {
        console.log(err);
        form.resetFields();
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
              {API.isLoading ? (
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
