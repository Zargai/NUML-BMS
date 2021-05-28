import React from "react";
import { Table, Input, Popconfirm, Form, Typography, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

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

const DriverTable = ({
  data,
  buses,
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

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      phone: "",
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
      sorter: (a, b) => a.name.length - b.name.length,

    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      editable: true,
      sorter: (a, b) => a.phone.length - b.phone.length,

    },
    {
      title: "AssignedBus",
      dataIndex: "assignedBus",
      key: "assignedBus",
      editable: false,
      render: (_, record) => {
        return record.assignedBus;
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
        record: data,
        inputType:
          col.dataIndex === "assignedBus" ? (
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
                  <Option key={i} value={bus._id}>
                    {bus.name}
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

export default DriverTable;
