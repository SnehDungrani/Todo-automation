/* eslint-disable jsx-a11y/media-has-caption */
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
          className="video"
          width="auto"
          height="auto"
          src={video1}
          loop
          autoPlay
        />
      </div>
    </>
  );
};

export default WelcomePage;
