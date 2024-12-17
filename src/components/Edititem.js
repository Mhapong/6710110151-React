import "../App";
import React, { useEffect } from "react";
import { Button, Form, Select, Input, InputNumber, X, Modal, } from 'antd';

const Edititem = ({ defaultValue, onClose, onSubmit }) => {
    const [form] = Form.useForm();


    useEffect(() => {
        if (defaultValue) {
            form.setFieldsValue({
                id: defaultValue.id,
                note: defaultValue.note,
                amount: defaultValue.amount

            });
        }
    }, [defaultValue, form]);

    return (
        <Modal className="edit-container">
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
                                rules={[{ required: true }]}
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
                            // onClick={saveEdit}
                            >Save</Button>
                        </Form.Item>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default Edititem;