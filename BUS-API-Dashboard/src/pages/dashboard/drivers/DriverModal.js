import React from "react";
import { Modal, Form, Input, Select } from "antd";

const DriverModal = ({ visible, onCreate, onCancel, buses }) => {
  const [form] = Form.useForm();
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
        name="driver_modal"
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
              message: "Please input your name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            {
              required: true,
              message: "Please input correct phone number",
            },
          ]}
        >
          <Input />
        </Form.Item>{" "}
        {/* <Form.Item
          name="photo"
          label="Photo"
          rules={[
            {
              required: true,
              message: "Please provide a photo",
            },
          ]}
        >
          <Input />
        </Form.Item> */}
        <Form.Item name="assignedBus" label="AssignedBus">
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a Bus"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {buses.map((bus, i) => {
              return (
                <Select.Option key={i} value={bus._id}>
                  {bus.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DriverModal;
