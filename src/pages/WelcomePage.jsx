import React from "react";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/home");
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <Title level={2}>Welcome to Smart Todo App</Title>
      <Paragraph>
        Organize your tasks efficiently with our smart todo application.
      </Paragraph>
      <Button type="primary" size="large" onClick={handleGetStarted}>
        Get Started
      </Button>
    </div>
  );
};

export default WelcomePage;
