import React from "react";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import video1 from "./video/todo.mp4";

const { Title, Paragraph } = Typography;

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/home");
  };

  return (
    <>
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Title level={2}>Welcome to Smart Todo App</Title>
        <Paragraph>
          Organize your tasks efficiently with our smart todo application.
        </Paragraph>
        <Button type="primary" size="large" onClick={handleGetStarted}>
          Get Started
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <video
          width="auto"
          height="auto"
          src={video1}
          loop
          autoPlay
          style={{
            borderRadius: "22px",
            overflow: "hidden",
            boxShadow:
              "0 19px 51px 0 rgba(0,0,0,0.16), 0 14px 19px 0 rgba(0,0,0,0.07)",
            maxWidth: "640px",
          }}
        ></video>
      </div>
    </>
  );
};

export default WelcomePage;
