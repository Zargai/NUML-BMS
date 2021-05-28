import React, { useEffect, useState } from "react";
import { Button, Typography, Form, message } from "antd";
import StudentModal from "./StudentModal";
import StudentTable from "./StudentTable";
import { StudentApi } from "../../../services/api";
import { DepartmentApi } from "../../../services/api";

function Students() {
  const [form] = Form.useForm();
  const { Title } = Typography;
  const [students, setStudents] = useState([]);
  const [loading, setloading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const [mounted, setMounted] = useState(true);
  const [visible, setVisible] = useState(false);
  const [departments, setDepartments] = useState([]);

  const getStudents = async () => {
    try {
      setloading(true);
      const response = await StudentApi.getAll();
      console.log('re', response);
      const newResponse = [...response.data].map((student) => {
        const object = {
          ...student,
          key: student._id,
        };
        return object;
      });
      setStudents(newResponse);
      setloading(false);
      console.log(response.data);
    } catch (error) {
      message.error(error.message);
      console.log(error.message);
    }
  };

  const updateStudent = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...students];
      const index = newData.findIndex((item) => key === item.key);

      // console.log(name);
      if (index > -1) {
        const item = newData[index];
        console.log('ITEM',item);
        newData.splice(index, 1, { ...item, ...row });
        setEditingKey("");

        let { name, password, phone, sex, slipVerified,verified} = newData[index];

        slipVerified = slipVerified === 'true'? true:false;
        verified = verified === 'true'? true:false;
      let req=  {name, password, phone, sex, slipVerified,verified };
        // req['department'] = req.department._id;
        console.log('request', req);
        console.log('key', key);
        const response = await StudentApi.update(key, req);

        if (response) {
          getStudents();
          setDisable(false);
          message.success("Item updated");
        }
      } else {
        newData.push(row);
        setStudents(newData);
        setEditingKey("");
      }
    } catch (error) {
      setDisable(false);
      message.error("Email already exist", error);
      console.log("Validate Failed:", error);
    }
  };

  const deleteStudent = async (key) => {
    try {
      const newData = [...students];
      const index = newData.findIndex((item) => key === item.key);

      const response = await StudentApi.delete(key);

      if (response) {
        getStudents();
        message.warning("Item deleted");
      }

      newData.splice(index, 1);

      setStudents(newData);
      setEditingKey("");
    } catch (error) {
      message.error(error.message);
      console.log("Validate Failed:", error);
    }
  };

  const submitStudent = async (values) => {
    try {
      console.log('response', values);
      const response = await StudentApi.create(values);

      if (response) {
        getStudents();
        message.success("Item Added");
      }
      setDisable(false);
      setVisible(false);
    } catch (error) {
      message.error("Email already exist");
      console.log(error.message);
    }
  };
  useEffect(() => {
    const response = async () => {
      try {
        const myDepartments = await DepartmentApi.getAll();
        setDepartments(myDepartments.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (mounted === true) {
      getStudents();
    }
    response();
    return () => {
      setMounted(false);
    };
  }, [setMounted]);

  return (
    <div>
      <Title level={2}>Students</Title>
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
      {/* <Table bordered columns={columns} dataSource={students} /> */}

      <StudentTable
        students={students}
        loading={loading}
        editingKey={editingKey}
        setEditingKey={setEditingKey}
        deleted={deleteStudent}
        editSave={updateStudent}
        form={form}
        setDisable={setDisable}
      />
      <StudentModal
        visible={visible}
        onCreate={(values) => submitStudent(values)}
        departments={departments}
        onCancel={() => {
          setVisible(false);
          setDisable(false);
        }}
      />
    </div>
  );
}
export default Students;
