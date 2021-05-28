import React, { useEffect, useState } from "react";
import { Button, Typography, Form, message } from "antd";
import SupportModal from "./SupportModal";
import SupportTable from "./SupportTable";
import { SupportApi } from "../../../services/api";
function Supports() {
  const [form] = Form.useForm();
  const { Title } = Typography;
  const [supports, setSupports] = useState([]);
  const [loading, setloading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const [mounted, setMounted] = useState(true);
  const [visible, setVisible] = useState(false);

  const getSupports = async () => {
    try {
      setloading(true);

      const response = await SupportApi.getAll();

      const newResponse = [...response.data].map((support) => {
        const object = {
          ...support,
          key: support._id,
        };
        return object;
      });

      console.log("newResponse", newResponse);
     
      setSupports(newResponse);
      setloading(false);
      console.log(response.data);
    } catch (error) {
      message.error(error.message);
      console.log(error.message);
    }
  };

  const updateSupport = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...supports];
      const index = newData.findIndex((item) => key === item.key);

      // console.log(name);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setEditingKey("");

        // const { title } = newData[index];
        console.log('newData', newData.values())

        const response = await SupportApi.update(key, {
          newData,
        });

        if (response) {
          getSupports();
          setDisable(false);
          message.success("Item updated");
        }
      } else {
        newData.push(row);
        setSupports(newData);
        setEditingKey("");
      }
    } catch (error) {
      setDisable(false);
      console.log("ERRRRORRR", error)
      message.error("Email already exist");
      console.log("Validate Failed:", error);
    }
  };

  const deleteSupport = async (key) => {
    try {
      const newData = [...supports];
      const index = newData.findIndex((item) => key === item.key);

      const response = await SupportApi.delete(key);

      if (response) {
        getSupports();
        message.warning("Item deleted");
      }

      newData.splice(index, 1);

      setSupports(newData);
      setEditingKey("");
    } catch (error) {
      message.error(error.message);
      console.log("Validate Failed:", error);
    }
  };

  const submitSupport = async (values) => {
    console.log("Values", values);
    try {
      const response = await SupportApi.create(values);

      if (response) {
        getSupports();
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
      getSupports();
    }
    return () => {
      setMounted(false);
    };
  }, [setMounted]);

  return (
    <div>
      <Title level={2}>Supports</Title>
      {/* <Button
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
      </Button> */}
      {/* <Table bordered columns={columns} dataSource={supports} /> */}

      <SupportTable
        supports={supports}
        loading={loading}
        editingKey={editingKey}
        setEditingKey={setEditingKey}
        deleted={deleteSupport}
        editSave={updateSupport}
        form={form}
        setDisable={setDisable}
      />
      <SupportModal
        visible={visible}
        onCreate={(values) => submitSupport(values)}
        onCancel={() => {
          setVisible(false);
          setDisable(false);
        }}
      />
    </div>
  );
}
export default Supports;
