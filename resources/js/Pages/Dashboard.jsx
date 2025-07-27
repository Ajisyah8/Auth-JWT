import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
            return;
        }

        // Axios interceptor akan otomatis menambahkan token
        axios.get("/api/user")
            .then(res => {
                setUser(res.data);
                setError(null);
            })
            .catch(err => {
                setError("Gagal memuat data user");
                console.error("Error loading user:", err);
            })
            .finally(() => setLoading(false));
    }, []);

    const logout = async () => {
        try {
            // Axios interceptor akan otomatis menambahkan token
            await axios.post("/api/logout");
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
    };

    const refreshToken = async () => {
        try {
            await window.refreshToken();
            alert("Token berhasil diperbarui!");
        } catch (error) {
            alert("Gagal memperbarui token. Silakan login ulang.");
        }
    };

    if (loading) return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <p>Loading...</p>
        </div>
    );

    if (error) return (
        <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Coba Lagi</button>
        </div>
    );

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
            <div style={{ 
                backgroundColor: "#f8f9fa", 
                padding: "20px", 
                borderRadius: "8px", 
                marginBottom: "20px",
                border: "1px solid #dee2e6"
            }}>
                <h2 style={{ margin: "0 0 10px 0", color: "#333" }}>Selamat datang, {user.name}!</h2>
                <p style={{ margin: "0", color: "#666" }}>Email: {user.email}</p>
            </div>
            
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button 
                    onClick={refreshToken}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}
                >
                    Refresh Token
                </button>
                
                <button 
                    onClick={logout}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#dc3545",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}
                >
                    Logout
                </button>
            </div>
            
            <div style={{ 
                marginTop: "20px", 
                padding: "15px", 
                backgroundColor: "#e9ecef", 
                borderRadius: "4px",
                fontSize: "14px"
            }}>
                <strong>Fitur Keamanan:</strong>
                <ul style={{ margin: "10px 0", paddingLeft: "20px" }}>
                    <li>Token JWT otomatis ditambahkan ke setiap request</li>
                    <li>Auto refresh token setiap 50 menit</li>
                    <li>Rate limiting: 60 requests per menit</li>
                    <li>Auto logout jika token expired</li>
                </ul>
            </div>
        </div>
    );
}
