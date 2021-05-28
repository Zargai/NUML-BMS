import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Popconfirm,
  Form,
  Typography,
  Select,
  Col, Row,
  message,
} from "antd";
import { EditOutlined, DeleteOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { Option } from "antd/lib/mentions";
import { data } from "./data";

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
  const inputNode =
    inputType === "disabled" ? (
      <Select defaultValue={record.stops.map((stop) => stop.disabled)}>
        <Option value="true">True</Option>
        <Option value="false">False</Option>
      </Select>
    ) : (
      <Input />
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
      title: "",
      disabled: "",
      stops: [],
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
      sorter: (a, b) => a.name.length - b.name.length,
      editable: true,
    },
    {
      title: "Start Point",
      dataIndex: "startPoint",
      key: "startPoint",
      editable: false,
      render: (_, record) =>{
       return <span>
          {record.stops.length >0 ? record?.stops[0].title : ''}
        </span>
      }
    },
    {
      title: "End Point",
      dataIndex: "endPoint",
      key: "endPoint",
      editable: false,
      render: (_, record) =>{
       return <span>
          {record.stops.length >0 ? record?.stops[record.stops.length -1].title : ''}
        </span>
      }
    },

    {
      title: "Stops",
      dataIndex: "id",
      key: "stops",
      editable: false,
      render: (_, record) => {
        return (
          <Row>
            <Col span={12}>
          <Select>
            {record.stops.map((rec, i) => {
              return <Option value={rec.title}>{rec.title}</Option>;
            })}
          </Select>
          </Col>
          </Row>
        );
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
              cancelText="No"
              onConfirm={() => deleted(record.key)}
            >
              {/* <PlayCircleOutlined
                style={
                  editingKey !== ""
                    ? {
                        display: "none",
                      }
                    : {
                        color: "green",
                        marginLeft: "24px",
                      }
                }
                disabled={editingKey !== ""}
              /> */}
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
        inputType: col.dataIndex === "disabled" ? "disabled" : "text",
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
