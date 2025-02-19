import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Lấy dữ liệu user từ API
      const usersResponse = await axios.get('http://localhost:5000/api/user');
      const users = usersResponse.data;

      // Kiểm tra email và password
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        // Giả lập tạo JWT, ở thực tế bạn nên lấy từ API login
        const token = 'fake-jwt-token-for-demo'; // Đoạn này chỉ minh họa

        // Lưu email và token vào localStorage
        localStorage.setItem('email', email);
        localStorage.setItem('jwt', token);
      } else {
        setError('Email hoặc mật khẩu không đúng');
      }
    } catch (error) {
      setError('Đã xảy ra lỗi, vui lòng thử lại');
    }
  };

  return (
    <div className="login-container">
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mật khẩu:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
}
