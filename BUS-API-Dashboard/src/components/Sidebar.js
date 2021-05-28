import { Menu, message, Modal } from "antd";
import {
  AppstoreOutlined,
  BarChartOutlined,
  VideoCameraOutlined,
  CarFilled,
  EnvironmentFilled,
  SkinFilled,
  ExclamationCircleOutlined,
  TeamOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { useState } from "react";
import { Admin } from "../services/api";

function Sidebar() {
  const history = useHistory();
  const location = useLocation();
  const { confirm } = Modal;
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  function showConfirm() {
    confirm({
      title: "Are you sure ?",
      icon: <ExclamationCircleOutlined />,

      okText: "Log out",
      content: "You will be redirected to Login Page",
      onOk() {
        try {
          Admin.logOut();
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          message.warning("Logged out!");
          setIsLoggedIn(false);
        } catch (error) {
          console.log(error);
        }
      },
      onCancel() {
        history.push(`${location.pathname}`);
      },
    });
  }

  if (isLoggedIn === false) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="logo" />
      <Menu
        style={{height:"100vh"}}
        theme="dark"
        mode="inline"
        defaultSelectedKeys={location.pathname}
        selectedKeys={[location.pathname]}
      >
        <Menu.Item
          key="/app"
          icon={
            <>
              <BarChartOutlined />
            </>
          }
        >
          <Link to="/app">Dashboard</Link>
        </Menu.Item>
        {/* <Menu.Item key="/app/admin" icon={<VideoCameraOutlined />}>
          <Link to="/app/admin">Admin</Link>
        </Menu.Item> */}
        <Menu.Item key="/app/buses" icon={<CarFilled />}>
          <Link to="/app/buses">Buses </Link>
        </Menu.Item>

        <Menu.Item key="/app/departments" icon={<AppstoreOutlined />}>
          <Link to="/app/departments">Departments</Link>
        </Menu.Item>


        <Menu.Item key="/app/drivers" icon={<SkinFilled />}>
          <Link to="/app/drivers">Drivers</Link>
        </Menu.Item>
        <Menu.Item key="/app/students" icon={<TeamOutlined />}>
          <Link to="/app/students">Students</Link>
        </Menu.Item>
        <Menu.Item key="/app/routes" icon={<EnvironmentFilled />}>
          <Link to="/app/routes">Routes</Link>
        </Menu.Item>
        <Menu.Item key="/app/supports" icon={<EnvironmentFilled />}>
          <Link to="/app/supports">Support Center</Link>
        </Menu.Item>

        <Menu.Item
          key="/app/logout"
          danger
          onClick={() => showConfirm()}
          defaultActiveFirst
          className
          style={{
            marginTop: '"15px"',

            fontSize: "1.2rem",
          }}
          icon={<LogoutOutlined />}
        >
          <Link to="/app/logout">LogOut</Link>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default Sidebar;
