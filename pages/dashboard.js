import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
    const [profile, setProfile] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setMessage("You need to login first!");
                return;
            }

            try {
                const response = await axios.get("/api/auth/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfile(response.data.user);
            } catch (error) {
                setMessage(error.response?.data?.error || "Failed to fetch profile!");
            }
        };

        fetchProfile();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            {message && <p>{message}</p>}
            {profile && (
                <div>
                    <p>Email: {profile.email}</p>
                </div>
            )}
        </div>
    );
}
