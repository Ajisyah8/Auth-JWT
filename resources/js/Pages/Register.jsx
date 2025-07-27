import { useState } from "react";
import axios from "axios";

export default function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });

    const submit = async (e) => {
        e.preventDefault();
        await axios.post("/api/register", form);
        window.location.href = "/login";
    };

    return (
        <form onSubmit={submit}>
            <h2>Register</h2>
            <input onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" />
            <input onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" />
            <input type="password" onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Password" />
            <button>Register</button>
        </form>
    );
}
