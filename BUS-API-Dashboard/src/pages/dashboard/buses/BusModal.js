import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, InputNumber } from "antd";
import { Route } from "react-router";

const BusModal = ({
  visible,
  onCreate,
  onCancel,
  routes,
  drivers,
}) => {
  const [form] = Form.useForm();

  const { Option } = Select;

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };

  const onSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onCreate(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      visible={visible}
      title="Add Item"
      okText="Add"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        onSubmit();
      }}
    >
      <Form
        form={form}
        {...layout}
        name="bus_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input the name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="capacity"
          label="Capacity"
          rules={[
            {
              required: true,
              message: "Please input the capacity number !",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        {/*  */}
        <Form.Item name="assignedRoute" label="AssignedRoute">
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a Route"
            onSearch={() => {}}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {routes.map((route, i) => {
              return (
                <Option key={i} value={route._id}>
                  {route.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item name="assignedDriver" label="AssignedDriver">
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a Driver"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {drivers.map((driver, i) => {
              return (
                <Option key={i} value={driver._id}>
                  {driver.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BusModal;
