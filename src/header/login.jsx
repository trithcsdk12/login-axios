// src/components/LoginForm.js
import React, { useState } from "react";
import axios from "axios";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      // Lưu JWT vào localStorage hoặc sessionStorage
      localStorage.setItem("token", response.data.token);
      alert("Đăng nhập thành công!");
    } catch (error) {
      console.error("Đăng nhập thất bại", error);
      alert("Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Đăng nhập</h2>
      <div>
        <label>Tên đăng nhập:</label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
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
      <button type="submit">Đăng nhập</button>
    </form>
  );
}
