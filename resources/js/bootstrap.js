import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Axios interceptor untuk menambahkan token secara otomatis
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Axios interceptor untuk menangani response error
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            // Token expired atau invalid
            localStorage.removeItem('token');
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        } else if (error.response?.status === 429) {
            // Rate limit exceeded
            alert('Terlalu banyak permintaan. Silakan coba lagi dalam beberapa menit.');
        }
        return Promise.reject(error);
    }
);

// Fungsi helper untuk refresh token
window.refreshToken = async () => {
    try {
        const response = await axios.post('/api/refresh');
        localStorage.setItem('token', response.data.token);
        return response.data.token;
    } catch (error) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        throw error;
    }
};

// Auto refresh token sebelum expired (setiap 50 menit)
setInterval(async () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            await window.refreshToken();
        } catch (error) {
            console.log('Auto refresh token failed:', error);
        }
    }
}, 50 * 60 * 1000); // 50 minutes
