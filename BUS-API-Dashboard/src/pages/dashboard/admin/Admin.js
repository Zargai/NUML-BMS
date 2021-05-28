import React from "react";
import { Table, Typography } from "antd";
// import axios from "axios";
// import { ApiBus } from "../../../services/api";
import {
  EditOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

function Admin() {
  const { Title } = Typography;
  //Add columns here
  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "FullName",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Admin",
      dataIndex: "admin",
      key: "admin",
      align: "center",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      align: "center",
      render: () => (
        <>
          <EditOutlined
            style={{
              color: "blue",
            }}
          />
          <DeleteOutlined
            style={{
              color: "red",
              marginLeft: "20px",
            }}
          />
        </>
      ),
    },
  ];

  const isAdmin = (value) => {
    const admin = value;
    if (admin) {
      return (
        <CheckCircleOutlined
          style={{
            color: "green",
          }}
        />
      );
    }
    return (
      <CloseCircleOutlined
        style={{
          color: "red",
        }}
      />
    );
  };

  const data = [
    {
      key: "1",
      fullName: "Muhammd Moin",
      email: "capacity",
      password: "capacity",
      admin: isAdmin(true),
    },
    {
      key: "2",
      fullName: "Muhammd Moin",
      email: "capacity",
      password: "capacity",
      admin: isAdmin(false),
    },
  ];

  return (
    <div>
      <Title level={2}>Admin (We dont exist!)</Title>
      {/* <Button
        style={{
          float: "right",
          marginBottom: "10px",
        }}
        type="primary"
      >
        Add Item
      </Button> */}
      <Table bordered columns={columns} dataSource={data} />
    </div>
  );
}

export default Admin;
