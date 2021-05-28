import React, { useState } from "react";
import { Modal, Form, Input, Radio, Upload, message, Button , Select } from "antd";
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;



const StudentModal = ({ visible, onCreate, onCancel, departments }) => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };
  const props = {
    name: 'myFile',
    action: 'http://localhost:8080/api/auth/upload',
    headers: {
      authorization: 'authorization-text',
    }
  }

 
  const [slipPhoto, SetSlipPhoto] = useState();

  const handleChange = (e)=>{
    console.log('change',e);
    if(e.file.status == 'done'){
      // set the file url 
      alert('uploaded file');
      let imgUrl = e.file.response.file;
      console.log('use', imgUrl)
      if(imgUrl){
        SetSlipPhoto(imgUrl);
      }
    }

  }



  const onSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        values.slipPhoto = slipPhoto;
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
        name="student_modal"
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
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please input correct email",
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input correct password",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            {
              required: true,
              message: "Please input correct Phone Number",
            },
          ]}
        >
          <Input />
        </Form.Item>{" "}
        <Form.Item
          name="systemId"
          label="SystemID"
          rules={[
            {
              required: true,
              message: "Please input correct SystemID",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="department" label="department">
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a Department"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {departments.map((department, i) => {
              return (
                <Option key={i} value={department._id}>
                  {department.title}
                </Option>
              );
            })}
          </Select>
        </Form.Item>


        <Form.Item
          name="sex"
          label="Gender"
          initialValue="Male"
          rules={[
            {
              required: true,
              message: "Please select your Gender",
            },
          ]}
        >
          <Radio.Group>
            <Radio value="Male">Male</Radio>
            <Radio value="Female">Female</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
        <Upload  {...props}  onChange={(e)=> handleChange(e)}
        data={{name:'testing'}}>
    <Button icon={<UploadOutlined />}>Click to Upload Challan</Button>
  </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StudentModal;
