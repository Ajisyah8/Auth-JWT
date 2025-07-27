import { useState } from "react";
import axios from "axios";

export default function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        
        try {
            await axios.post("/api/register", form);
            setSuccess(true);
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Registrasi gagal. Silakan coba lagi.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div style={{ 
                maxWidth: "400px", 
                margin: "50px auto", 
                padding: "30px", 
                border: "1px solid #ddd", 
                borderRadius: "8px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                textAlign: "center"
            }}>
                <div style={{
                    padding: "20px",
                    backgroundColor: "#d4edda",
                    color: "#155724",
                    border: "1px solid #c3e6cb",
                    borderRadius: "4px",
                    marginBottom: "20px"
                }}>
                    <h3 style={{ margin: "0 0 10px 0" }}>Registrasi Berhasil!</h3>
                    <p style={{ margin: "0" }}>Anda akan diarahkan ke halaman login...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ 
            maxWidth: "400px", 
            margin: "50px auto", 
            padding: "30px", 
            border: "1px solid #ddd", 
            borderRadius: "8px",
            backgroundColor: "#fff",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}>
            <form onSubmit={submit}>
                <h2 style={{ 
                    textAlign: "center", 
                    marginBottom: "30px", 
                    color: "#333" 
                }}>Register</h2>
                
                {error && (
                    <div style={{
                        padding: "10px",
                        marginBottom: "20px",
                        backgroundColor: "#f8d7da",
                        color: "#721c24",
                        border: "1px solid #f5c6cb",
                        borderRadius: "4px",
                        fontSize: "14px"
                    }}>
                        {error}
                    </div>
                )}
                
                <div style={{ marginBottom: "20px" }}>
                    <input 
                        type="text"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })} 
                        placeholder="Nama Lengkap" 
                        required
                        style={{
                            width: "100%",
                            padding: "12px",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            fontSize: "16px",
                            boxSizing: "border-box"
                        }}
                    />
                </div>
                
                <div style={{ marginBottom: "20px" }}>
                    <input 
                        type="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })} 
                        placeholder="Email" 
                        required
                        style={{
                            width: "100%",
                            padding: "12px",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            fontSize: "16px",
                            boxSizing: "border-box"
                        }}
                    />
                </div>
                
                <div style={{ marginBottom: "20px" }}>
                    <input 
                        type="password" 
                        value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })} 
                        placeholder="Password (min. 6 karakter)" 
                        required
                        minLength="6"
                        style={{
                            width: "100%",
                            padding: "12px",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            fontSize: "16px",
                            boxSizing: "border-box"
                        }}
                    />
                </div>
                
                <button 
                    type="submit"
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "12px",
                        backgroundColor: loading ? "#6c757d" : "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        fontSize: "16px",
                        cursor: loading ? "not-allowed" : "pointer",
                        transition: "background-color 0.2s"
                    }}
                >
                    {loading ? "Registering..." : "Register"}
                </button>
                
                <div style={{ 
                    textAlign: "center", 
                    marginTop: "20px",
                    fontSize: "14px",
                    color: "#666"
                }}>
                    Sudah punya akun? <a href="/login" style={{ color: "#007bff" }}>Login di sini</a>
                </div>
            </form>
        </div>
    );
}
