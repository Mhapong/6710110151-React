import "../App";
import React, { useEffect } from "react";
import { Button, Form, Select, Input, InputNumber, X, Modal, } from 'antd';

const Edititem = ({ defaultValue, closeModal, onSave }) => {
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

    const handleSave = () => {
        form.validateFields().then((values) => {
            const updatedRecord = {
                ...defaultValue,
                ...values,
            };
            console.log("Updated Record:", updatedRecord);
            onSave(updatedRecord);
            closeModal();
        });
    };

    return (
        <Modal
            title='Edit transaction'
            open={true}
            onCancel={closeModal}
            footer={[
                <Button
                    type="primary"
                    htmlType="submit"
                    onClick={handleSave}
                >Save</Button>

            ]}>
            <div>
                {/* <div className="close-edit">
                    <Button
                        shape="circle"
                        icon='X'
                        onClick={closeModal}
                        className="close-edit" />
                </div> */}
                <Form>
                    <Form.Item
                        name="type"
                        label="ชนิด"
                        rules={[{ required: true, message: 'Type must not empty' }]}
                    >
                        <div />
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
                        rules={[{ required: true, message: 'Amount must not empty' }]}>
                        <InputNumber placeholder="จำนวนเงิน" />
                    </Form.Item>

                    <Form.Item
                        name="note"
                        label="หมายเหตุ"
                        rules={[{ required: true, message: 'Note must not empty' }]}>
                        <Input.TextArea rows={1} />
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default Edititem;