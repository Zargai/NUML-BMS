import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Popconfirm,
  Form,
  Typography,
  Select,
  message,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { BusApi } from "../../../services/api";
import { Option } from "antd/lib/mentions";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    let mounted = false;

    const getBuses = async () => {
      try {
        if (mounted == true) {
          const response = await BusApi.getAll();
          setBuses(response);
        }
      } catch (error) {
        message.error(error.message);
      }
    };
    getBuses();
    return () => (mounted = false);
  }, []);

  const inputNode =
    inputType == "assignedBus" ? (
      <Input.Group compact>
        <Select defaultValue="Select bus">
          {buses.map((bus, index) => (
            <div key={index}>
              <Option value="bus._id">{bus.name}</Option>
            </div>
          ))}
        </Select>
      </Input.Group>
    ) : (
      inputType == "text" && <Input />
    );

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const RouteTable = ({
  routes,
  loading,
  deleted,
  editingKey,
  setEditingKey,
  editSave,
  form,
  setDisable,
}) => {
  const { Link } = Typography;

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      phone: "",
      photo: "",
      ...record,
    });
    setEditingKey(record.key);
    setDisable(true);
  };

  const cancel = () => {
    setEditingKey("");
    setDisable(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      editable: true,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      editable: true,
    },
    {
      title: "assignedBus",
      dataIndex: "assignedBus",
      key: "assignedBus",
      editable: true,
    },
    {
      title: "Actions",
      align: "center",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Link
              onClick={() => editSave(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Link>Cancel</Link>
            </Popconfirm>
          </span>
        ) : (
          <div>
            <EditOutlined
              style={
                editingKey !== ""
                  ? {
                      display: "none",
                    }
                  : {
                      color: "blue",
                    }
              }
              // editingKey !== ""
              onClick={() => edit(record)}
            >
              Edit
            </EditOutlined>
            <Popconfirm
              title="Are you sure？"
              okText="Yes"
              // onConfirm={}
              cancelText="No"
              onConfirm={() => deleted(record.key)}
            >
              <DeleteOutlined
                style={
                  editingKey !== ""
                    ? {
                        display: "none",
                      }
                    : {
                        color: "red",
                        marginLeft: "20px",
                      }
                }
                disabled={editingKey !== ""}
              />
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex == "assignedBus" ? "assignedBus" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        loading={loading}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={routes}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default RouteTable;
