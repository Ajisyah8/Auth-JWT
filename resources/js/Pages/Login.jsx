import { useState } from "react";
import axios from "axios";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        
        try {
            const res = await axios.post("/api/login", form);
            localStorage.setItem("token", res.data.token);
            
            // Tampilkan informasi token
            console.log("Login berhasil:", {
                token_type: res.data.token_type,
                expires_in: res.data.expires_in + " seconds"
            });
            
            window.location.href = "/dashboard";
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Login gagal. Periksa email dan password Anda.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

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
                }}>Login</h2>
                
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
                        placeholder="Password" 
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
                
                <button 
                    type="submit"
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "12px",
                        backgroundColor: loading ? "#6c757d" : "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        fontSize: "16px",
                        cursor: loading ? "not-allowed" : "pointer",
                        transition: "background-color 0.2s"
                    }}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
                
                <div style={{ 
                    textAlign: "center", 
                    marginTop: "20px",
                    fontSize: "14px",
                    color: "#666"
                }}>
                    Belum punya akun? <a href="/register" style={{ color: "#007bff" }}>Daftar di sini</a>
                </div>
            </form>
        </div>
    );
}
