import { Button, Card, Input, Form, Spin } from "antd";
import { LoginOutlined, UserOutlined } from "@ant-design/icons";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { SiGnuprivacyguard } from "react-icons/si";
import CONSTANTS from "../util/constant/CONSTANTS";

import useHttp from "../Hooks/use-http";
import { setAuthDetails } from "../util/API/authStorage";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "../util/firebase";
import GoogleButton from "react-google-button";

const Login = () => {
  const token = localStorage.getItem("token");

  const [form] = Form.useForm();
  const navigate = useNavigate();

  // const [user, setUser] = useState(null);

  const API = useHttp();

  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential);
        const token = credential?.accessToken;

        // The signed-in user info.
        const user = result?.user;
        const firebaseToken = user?.accessToken;

        localStorage.setItem("token", firebaseToken);

        // localStorage.setItem("ItemToken", firebaseToken);

        // API.sendRequest(
        //   CONSTANTS.API.auth.gLogin,
        //   (res) => {
        //     console.log(res);

        //     setAuthDetails(res?.tokens?.token, res?.data?.user?.name);
        //     if (res?.status === "success") {
        //       navigate("/home");
        //     }

        //     // window.location.reload();
        //   },

        //   "Login Successfully"
        // );

        navigate("/home");
      })
      .catch((Error) => {
        // throw new Error("Failed to sign up with Google");
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  if (token) {
    return <Navigate to="/home" />;
  }

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
    <div
      style={{
        boxSizing: "border-box",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          maxWidth: "330px",
          width: "100%",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <br />

        <Form form={form}>
          <div>
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not a valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input
                placeholder="Email"
                prefix={<UserOutlined />}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
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
                placeholder="Password"
                prefix={<SiGnuprivacyguard />}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <br />
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
                style={{ width: "100%" }}
                onClick={loginHandler}
                htmlType="submit"
              >
                Login
              </Button>
            )}
            <br />
            <br />
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              Don't have an account?
              <br />
              <Button type="link" style={{ padding: 0 }}>
                <Link to="/signup">SignUp</Link>
              </Button>
            </div>
          </div>
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <GoogleButton
              onClick={signInWithGoogle}
              style={{
                backgroundColor: "#8458B3",
                fontSize: "1em",
                width: "80%",
                borderTopRightRadius: "30px",
                borderBottomRightRadius: "30px",
              }}
              className="g-button"
            />
          </div>
        </Form>

        <br />
        <br />
      </Card>
    </div>
  );
};
export default Login;
