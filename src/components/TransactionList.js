import React from "react"
import { Button, Table, Space, Tag, Popconfirm, Modal } from "antd"
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import dayjs from "dayjs";
import Edititem from "./Edititem";


export default function TransactionList(props) {
  const columns = [
    {
      title: "Date-Time",
      dataIndex: "action_datetime",
      key: "action_datetime",
      render: (_, record) => dayjs(record.action_datetime).format("DD/MM/YYYY - HH:mm")
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (_, record) => (
        <Tag color={record.type === "income" ? 'green' : 'red'}>{record.type}</Tag>
      )
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount"
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note"
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() =>
              props.onRowEdited(record)} />

          <Popconfirm
            title="Delete the transaction"
            description="Are you sure to delete this transaction?"
            onConfirm={() => props.onRowDeleted(record.id)}
          >

            <Button danger
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />} />
          </Popconfirm>
          {/* <Button
            type="primary"
            shape="circle"
            icon={<BugOutlined />}
            onClick={() => {
              Modal.info({
                title: "Debug",
                content: JSON.stringify(record)
              })
            }} /> */}

        </Space>
      ),
    },
  ]

  return (
    <>
      <Table
        columns={columns}
        dataSource={props.data}
        rowKey="id"
        bordered />
    </>
  )
}
