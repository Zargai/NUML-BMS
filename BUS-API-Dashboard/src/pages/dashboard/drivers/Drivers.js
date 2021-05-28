import React, { useEffect, useState } from "react";
import { Button, Typography, Form, message } from "antd";
import DriverModal from "./DriverModal";
import DriverTable from "./DriverTable";
import { BusApi, DriverApi } from "../../../services/api";
function Drivers() {
  const [form] = Form.useForm();
  const { Title } = Typography;
  const [drivers, setDrivers] = useState([]);
  const [buses, setBuses] = useState([]);
  const [loading, setloading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const [mounted, setMounted] = useState(true);
  const [visible, setVisible] = useState(false);

  const getDrivers = async () => {
    try {
      setloading(true);
      const response = await DriverApi.getAll();

      const newResponse = [...response.data].map((driver) => {
        const object = {
          ...driver,
          key: driver._id,
        };
        return object;
      });

      setDrivers(newResponse);
      setloading(false);

      console.log("newResponse", response.data);
      console.log(response.data);
    } catch (error) {
      message.error(error.message);
      console.log(error.message);
    }
  };

  const updateDriver = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...drivers];
      const index = newData.findIndex((item) => key === item.key);

      // console.log(name);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setEditingKey("");
        console.log("Newdata", newData);
        console.log("drivers", drivers);
        console.log("index", index);
        console.log("key", key);
        var { name, phone,assignedBus } = newData[index];
        var  assignedBus  = assignedBus._id
        console.log("name,phone,assigndebus", name, phone, assignedBus);

        const response = await DriverApi.update(key, {
          name,
          phone,
          assignedBus,
        });

        if (response) {
          setDisable(false);
          message.success("Item updated");
          getDrivers();
        }
      } else {
        newData.push(row);
        setDrivers(newData);
        setEditingKey("");
      }
    } catch (error) {
      setDisable(false);
      message.error(error.message);

      console.log("Validate Failed:", error);
    }
  };

  const deleteDriver = async (key) => {
    try {
      const newData = [...drivers];
      const index = newData.findIndex((item) => key === item.key);

      const response = await DriverApi.delete(key);

      if (response) {
        getDrivers();
        message.warning("Item deleted");
      }

      newData.splice(index, 1);

      setDrivers(newData);
      setEditingKey("");
    } catch (error) {
      message.error(error.message);
      console.log("Validate Failed:", error);
    }
  };

  const submitDriver = async (values) => {
    console.log("values submit", values);
    try {
      const response = await DriverApi.create(values);
  console.log("responce :",response)
      if (response) {
        getDrivers();
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
    const response = async () => {
      try {
        const myBuses = await BusApi.getAll();

        setBuses(myBuses.data);

        getDrivers();
      } catch (error) {
        console.log(error);
      }
    };
    response();
    getDrivers();
    return () => {
      setMounted(false);
    };
  }, [setMounted]);

  const data = drivers.map((driver) => ({
    _id: driver._id,
    key: driver.key,
    name: driver.name,
    phone: driver.phone,
    // photo: driver.photo,
    assignedBus: driver.assignedBus?.name
  }));

  return (
    <div>
      <Title level={2}>Drivers</Title>
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
      {/* <Table bordered columns={columns} dataSource={drivers} /> */}

      <DriverTable
        data={data}
        loading={loading}
        editingKey={editingKey}
        setEditingKey={setEditingKey}
        deleted={deleteDriver}
        editSave={updateDriver}
        form={form}
        setDisable={setDisable}
        buses={buses}
      />
      <DriverModal
        visible={visible}
        buses={buses}
        onCreate={(values) => submitDriver(values)}
        onCancel={() => {
          setVisible(false);
          setDisable(false);
        }}
      />
    </div>
  );
}
export default Drivers;
