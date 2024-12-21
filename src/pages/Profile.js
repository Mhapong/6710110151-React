import React, { useState, useEffect } from "react";
import axios from "axios";
import { Avatar, Button, Card, Divider, Layout, Spin, theme, Breadcrumb } from "antd";
import dayjs from "dayjs";
import { UserOutlined } from '@ant-design/icons';
import '../App.css'
import EditProfile from "../components/EditProfile";




const Profile = () => {
    const [user, setUser] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const getUser = async () => {
        try {
            const response = await axios.get(`/api/users/me`)
            setUser(response.data)
        } catch (err) {
            console.error('Error: Failed fetching user data', err)
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const handleEditSave = async (updatedData) => {
        try {
            const UserEdited = {
                email: updatedData.email,
                username: updatedData.username

            }
            await axios.put(`api/users/${updatedData.id}`, UserEdited);
            getUser();

        }
        catch (err) {
            console.error("Error: Can't update user data...", err)
        }
    };


    console.log(user);
    if (!user) return (<Spin>Collecting Data...</Spin>);
    return (
        <Layout className="profileCardcontainer" >
            <div className="profileCard">

                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 280,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                ><Divider style={{ fontSize: "30px" }}>
                        Profile
                    </Divider>
                    <Avatar size={128} icon={<UserOutlined />} />
                    <Card
                        hoverable
                        title="Your Profile"
                        style={{
                            width: 450,
                            height: 350,
                            justifyContent: 'center'


                        }}>
                        <div className="profileCardcontainer">
                            <p>Email: {user.email}</p>
                            <p>Username: {user.username}</p>
                            <p>Account created: {dayjs(user.createdAt).format("DD/MM/YYYY")}</p>
                            <Button type="default" onClick={() => setIsModalVisible(true)}>
                                Edit Profile
                            </Button>
                            {isModalVisible && (
                                <EditProfile
                                    defaultValue={user}
                                    closeModal={() => setIsModalVisible(false)}
                                    onSave={handleEditSave}
                                />
                            )}
                        </div>
                    </Card>
                </div >
            </div>
        </Layout>
    )
};
export default Profile;