import { Layout, Spin } from "antd";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import AppHeader from "../components/AppHeader";
import Sidebar from "../components/Sidebar";
import ContentDiv from "./dashboard/ContentDiv";

const { Header, Content, Sider } = Layout;
function AppLayout() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    const loginHandler = () => {
      const token = localStorage.getItem("token");
      if (token == null) return history.push("/login");
    };
    return loginHandler();
  }, [history]);

  return loading ? (
    <Spin
      size="large"
      style={{
        position: "absolute",
        top: "47%",
        right: "50%",
        transform: "translate(0, -50%)",
      }}
    />
  ) : (
    <Layout>
      <Header
        theme="light"
        style={{
          zIndex: 10,
          width: "100%",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AppHeader />
      </Header>
      <Layout>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            left: 0,
          }}
        >
          <Sidebar />
        </Sider>
        <Layout>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 599,
              align: "center",
            }}
          >
            <ContentDiv />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
