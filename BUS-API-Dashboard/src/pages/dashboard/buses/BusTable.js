import React, { useState } from "react";
import { Table, Input, Popconfirm, Form, Typography, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const EditableCell = ({
  editing,
  rotues,
  drivers,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,

  ...restProps
}) => {
  const inputNode = inputType;
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

const BusTable = ({
  data,
  routes,
  drivers,
  loading,
  deleted,
  editingKey,
  setEditingKey,
  editSave,
  form,
  setDisable,
}) => {
  const { Link } = Typography;
  const { Option } = Select;
  const [ID, setID] = useState("");

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      capacity: Number,
      assignedRoute: {},
      assignedDriver: {},
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
      sorter: (a, b) => a.name.length - b.name.length

    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
      editable: true,
      sorter: (a, b) => a.capacity - b.capacity

    },
    {
      title: "AssignedRoute",
      dataIndex: "assignedRoute",
      key: "assignedRoute",
      editable: true,
      sorter: (a, b) => a.assignedRoute.length - b.assignedRoute.length,
      render: (_, record) => {
        return record.assignedRoute_ID;
      },
    },
    {
      title: "AssignedDriver",
      dataIndex: "assignedDriver",
      key: "assignedDriver",
      editable: true,
      render: (_, record) => {
        return record.assignedDriver_ID;
      },
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
      onCell: (record) => {
        return {
          record: data,
          inputType:
            col.dataIndex === "assignedDriver" ? (
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a Driver"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {drivers.map((driver, i) => {
                  setID(driver._id);
                  return (
                    <Option key={i} value={driver._id}>
                      {driver.name}
                    </Option>
                  );
                })}
              </Select>
            ) : col.dataIndex === "assignedRoute" ? (
              <Select
                showSearch
                style={{ width: 200 }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
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
            ) : (
              <Input />
            ),
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        };
      },
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
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default BusTable;
