import "../App";
import React, { useEffect } from "react";
import { Button, Form, Input, Modal } from "antd";

const EditProfile = ({ defaultValue, closeModal, onSave }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (defaultValue) {
            form.setFieldsValue({
                email: defaultValue.email,
                username: defaultValue.username,
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
            title="Edit Profile"
            open={true}
            onCancel={closeModal}
            footer={[
                <Button type="primary" key="submit" onClick={handleSave}>
                    Save
                </Button>,
            ]}
        >
            <div>
                <Form
                    onFinish={handleSave}
                    autoComplete="off"
                >

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: "Email is empty!!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[{ required: true, message: "Username must not empty" }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default EditProfile;
