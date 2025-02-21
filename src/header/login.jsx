// src/components/LoginForm.js
import React, { useState } from "react";
import axios from "axios";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleCheck = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn chưa đăng nhập!");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/check-role",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        alert(response.data.message);
      } else {
        alert("Không thể kiểm tra vai trò. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Lỗi kiểm tra vai trò", error);
      alert("Không thể kiểm tra vai trò. Vui lòng thử lại!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username,
          password,
        }
      );

      if (response.status === 200) {
        // Lưu JWT vào localStorage hoặc sessionStorage
        localStorage.setItem("token", response.data.token);
        alert("Đăng nhập thành công!");
      } else {
        alert("Sai tài khoản hoặc mật khẩu");
      }
    } catch (error) {
      console.error("Đăng nhập thất bại", error);
      alert("Sai tài khoản hoặc mật khẩu");
    }
  };

  const handleDelete = () => {
    localStorage.clear();
    alert("Đã xoá LocalStorage");
  };

  return (
    <>
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
      <button onClick={handleCheck}>Kiểm tra vai trò</button>
      <button onClick={handleDelete}>Xoá LocalStorage</button>
    </>
  );
}
