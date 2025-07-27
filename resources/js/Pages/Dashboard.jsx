import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return (window.location.href = "/login");

        axios.get("/api/user", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setUser(res.data))
            .catch(() => window.location.href = "/login");
    }, []);

    const logout = async () => {
        await axios.post("/api/logout", {}, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    if (!user) return <p>Loading...</p>;

    return (
        <div>
            <h2>Selamat datang, {user.name}</h2>
            <button onClick={logout}>Logout</button>
        </div>
    );
}
