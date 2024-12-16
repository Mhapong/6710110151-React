import "../App";
import React from "react";
import { Button, Form, Select, Input, InputNumber, X } from 'antd';

export default function Edititem({ onClose }) {
    return (
        <div layout="inline" className="edit-container">
            <div className="edit">
                <div>
                    <Button
                        shape="circle"
                        icon='X'
                        onClick={onClose}
                        className="close-edit" />
                    <div />
                    <div className="edit-form">
                        <Form.Item
                            name="type"
                            label="ชนิด"
                            rules={[{ required: true }]}
                        >
                            <Select
                                allowClear
                                style={{ width: "100px" }}
                                options={[
                                    {
                                        value: 'income',
                                        label: 'รายรับ',
                                    },
                                    {
                                        value: 'expense',
                                        label: 'รายจ่าย',
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            name="amount"
                            label="จำนวนเงิน"
                            rules={[{ required: true }]}>
                            <InputNumber placeholder="จำนวนเงิน" />
                        </Form.Item>

                        <Form.Item
                            name="note"
                            label="หมายเหตุ"
                            rules={[{ required: true }]}>
                            <Input placeholder="Note" />
                        </Form.Item>
                    </div>
                    <div className="save-button">
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                            >Save</Button>
                        </Form.Item>
                    </div>
                </div>
            </div>
        </div>
    )
}