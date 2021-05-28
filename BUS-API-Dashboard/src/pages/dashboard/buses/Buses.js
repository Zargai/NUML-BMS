import React, { useEffect, useState } from "react";
import { Button, Typography, Form, message } from "antd";
import BusModal from "./BusModal";
import BusTable from "./BusTable";
import { BusApi, DriverApi, RouteApi } from "../../../services/api";

function Buses() {
  const [form] = Form.useForm();
  const { Title } = Typography;
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setloading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const [mounted, setMounted] = useState(true);
  const [visible, setVisible] = useState(false);

  const getBuses = async () => {
    try {
      setloading(true);
      const response = await BusApi.getAll();
      const newResponse = [...response.data].map((bus) => {
        const object = {
          ...bus,
          key: bus._id,
        };
        return object;
      });

      setBuses(newResponse);
      setloading(false);
      console.log("Response:", newResponse);
      console.log("BUSES", buses);
    } catch (error) {
      console.log(error.message);
      message.error(error.message);
    }
  };

  const updateBus = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...buses];
      const index = newData.findIndex((item) => key === item.key);

      // console.log(name);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setEditingKey("");
        console.log("NewBuses", buses);
        console.log("index", index);
        console.log("Newdata", newData);

        const { name, capacity, assignedDriver, assignedRoute } = newData[
          index
        ];
        console.log(name, capacity, assignedDriver, assignedRoute);
        console.log("key ==>",key);
        const response = await BusApi.update(key, {
          name,
          capacity,
          assignedDriver,
          assignedRoute,
        });

        if (response) {
          getBuses();
          setDisable(false);
          message.success("Item updated");
        }
      } else {
        newData.push(row);
        setBuses(newData);
        setEditingKey("");
      }
    } catch (error) {
      setDisable(false);
      message.error(error.message);
      console.log("Validate Failed:", error);
    }
  };

  const deleteBus = async (key) => {
    try {
      const newData = [...buses];
      const index = newData.findIndex((item) => key === item.key);

      const response = await BusApi.delete(key);

      if (response) {
        getBuses();
        message.warning("Item deleted");
      }

      newData.splice(index, 1);

      setBuses(newData);
      setEditingKey("");
    } catch (error) {
      console.log("Validate Failed:", error);
    }
  };

  const submitBus = async (values) => {
    console.log("values", values);
    try {
      const response = await BusApi.create(values);

      if (response) {
        getBuses();
        message.success("Item Added");
      }
      setDisable(false);
      setVisible(false);
    } catch (error) {
      message.error(error.message);
      console.log(error.response.message);
    }
  };

  useEffect(() => {
    const response = async () => {
      try {
        const myRoutes = await RouteApi.getAll();
        const myDrivers = await DriverApi.getAll();

        setRoutes(myRoutes.data);
        setDrivers(myDrivers.data);
      } catch (error) {
        console.log(error);
      }
    };
    response();
    getBuses();

    return () => {
      setMounted(false);
    };
  }, []);

  const data = buses.map((bus) => ({
    _id: bus._id,
    key: bus.key,
    name: bus.name,
    capacity: bus.capacity,
    assignedRoute_ID: bus.assignedRoute?.name,
    assignedDriver_ID: bus.assignedDriver?.name,
    assignedRoute: bus.assignedRoute?._id,
    assignedDriver: bus.assignedDriver?._id,
  }));

  return (
    <div>
      <Title level={2}>Buses</Title>
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
      {/* <Table bordered columns={columns} dataSource={buses} /> */}

      <BusTable
        data={data}
        loading={loading}
        editingKey={editingKey}
        setEditingKey={setEditingKey}
        deleted={deleteBus}
        editSave={updateBus}
        form={form}
        setDisable={setDisable}
        routes={routes}
        drivers={drivers}
      />
      <BusModal
        visible={visible}
        routes={routes}
        drivers={drivers}
        onCreate={(values) => submitBus(values)}
        onCancel={() => {
          setVisible(false);
          setDisable(false);
        }}
      />
    </div>
  );
}
export default Buses;
