import React, { useState, useEffect } from "react";
import axios from "axios";
import { Avatar, Button, Card, Divider, Layout, Spin, } from "antd";
import dayjs from "dayjs";
import { UserOutlined } from '@ant-design/icons';
import '../App.css'
import EditProfile from "../components/EditProfile";


const Profile = () => {
    const [user, setUser] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const getUser = async () => {
        try {
            const response = await axios.get('/api/users/me')
            setUser(response.data)
        } catch (err) {
            console.error('Error: Failed fetching user data', err)
        }
    };
    useEffect(() => {
        getUser();
    }, []);


    const handleEditSave = (updatedData) => {
        axios.put(`/api/users/${updatedData.id}`, updatedData)
            .then(response => {
                setUser(response.data);
                setIsModalVisible(false);
                getUser();
            })
            .catch(err =>
                console.error("Error: Can't update user data...", err)
            )
    };

    console.log(user);
    if (!user) return (<Spin>Collecting Data...</Spin>);
    return (
        <Layout >
            <div className="profileCard">
                <Divider>
                    Profile
                </Divider>
                <Avatar size={128} icon={<UserOutlined />} />
                <Card
                    hoverable
                    title="Your Profile"
                    style={{ width: 450 }}>

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
                </Card>
            </div>
        </Layout>
    )
};
export default Profile;