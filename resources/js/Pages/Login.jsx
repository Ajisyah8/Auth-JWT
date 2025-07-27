import { useState } from "react";
import axios from "axios";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });

    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/login", form);
            localStorage.setItem("token", res.data.token);
            window.location.href = "/dashboard";
        } catch {
            alert("Login gagal");
        }
    };

    return (
        <form onSubmit={submit}>
            <h2>Login</h2>
            <input onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" />
            <input type="password" onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Password" />
            <button>Login</button>
        </form>
    );
}
