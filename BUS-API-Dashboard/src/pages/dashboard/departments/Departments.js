import React, { useEffect, useState } from "react";
import { Button, Typography, Form, message } from "antd";
import DepartmentModal from "./DepartmentModal";
import DepartmentTable from "./DepartmentTable";
import { DepartmentApi } from "../../../services/api";
function Departments() {
  const [form] = Form.useForm();
  const { Title } = Typography;
  const [departments, setDepartments] = useState([]);
  const [loading, setloading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const [mounted, setMounted] = useState(true);
  const [visible, setVisible] = useState(false);

  const getDepartments = async () => {
    try {
      setloading(true);

      const response = await DepartmentApi.getAll();

      const newResponse = [...response.data].map((department) => {
        const object = {
          ...department,
          key: department._id,
        };
        return object;
      });

      console.log("newResponse", newResponse);
      setDepartments(newResponse);
      setloading(false);
      console.log(response.data);
    } catch (error) {
      message.error(error.message);
      console.log(error.message);
    }
  };

  const updateDepartment = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...departments];
      const index = newData.findIndex((item) => key === item.key);

      // console.log(name);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setEditingKey("");

        const { title } = newData[index];

        const response = await DepartmentApi.update(key, {
          title,
        });

        if (response) {
          getDepartments();
          setDisable(false);
          message.success("Item updated");
        }
      } else {
        newData.push(row);
        setDepartments(newData);
        setEditingKey("");
      }
    } catch (error) {
      setDisable(false);
      message.error("Email already exist");
      console.log("Validate Failed:", error);
    }
  };

  const deleteDepartment = async (key) => {
    try {
      const newData = [...departments];
      const index = newData.findIndex((item) => key === item.key);

      const response = await DepartmentApi.delete(key);

      if (response) {
        getDepartments();
        message.warning("Item deleted");
      }

      newData.splice(index, 1);

      setDepartments(newData);
      setEditingKey("");
    } catch (error) {
      message.error(error.message);
      console.log("Validate Failed:", error);
    }
  };

  const submitDepartment = async (values) => {
    console.log("Values", values);
    try {
      const response = await DepartmentApi.create(values);

      if (response) {
        getDepartments();
        message.success("Item Added");
      }
      setDisable(false);
      setVisible(false);
    } catch (error) {
      message.error(error.message);
      console.log(error.message);
    }
  };
  useEffect(() => {


    if (mounted === true) {
      getDepartments();
    }
    return () => {
      setMounted(false);
    };
  }, [setMounted]);

  return (
    <div>
      <Title level={2}>Departments</Title>
      <Button
        style={{
          float: "right",
          marginBottom: "10px",
        }}
        type="primary"
        disabled={disable}
        onClick={() => {
          setVisible(true);
          setDisable(true);
        }}
      >
        Add Item
      </Button>
      {/* <Table bordered columns={columns} dataSource={departments} /> */}

      <DepartmentTable
        departments={departments}
        loading={loading}
        editingKey={editingKey}
        setEditingKey={setEditingKey}
        deleted={deleteDepartment}
        editSave={updateDepartment}
        form={form}
        setDisable={setDisable}
      />
      <DepartmentModal
        visible={visible}
        onCreate={(values) => submitDepartment(values)}
        onCancel={() => {
          setVisible(false);
          setDisable(false);
        }}
      />
    </div>
  );
}
export default Departments;
