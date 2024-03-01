import React from "react";
import { Layout, Flex } from "antd";
const { Header } = Layout;

const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#8458B3",
};

const layoutStyle = {
  overflow: "hidden",
  width: "calc(100%)",
  maxWidth: "calc(100%)",
};

const HeaderAnt = () => {
  return (
    <Flex gap="middle" wrap="wrap">
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>TO-DO List</Header>
      </Layout>
    </Flex>
  );
};

export default HeaderAnt;
