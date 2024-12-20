import React, { useState, useEffect } from "react";
import axios from "axios";



const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios
            .get('auth/users/me')
            .then((response) => setUser(response.data))
            .catch((err) => console.error(err))
    })

    console.log(user);
    if (!user) return;
    return <div>
        <h1>
            Profile
        </h1>
    </div>
};
export default Profile;