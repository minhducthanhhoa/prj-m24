import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/slices/userSlice";
import { RootState, AppDispatch } from "../../redux/store";

const Register: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear lỗi khi nhập lại
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = "Tên là bắt buộc.";
    if (!form.email.trim()) {
      newErrors.email = "Email là bắt buộc.";
    } else if (user && user.email === form.email) {
      newErrors.email = "Email đã tồn tại.";
    }
    if (!form.password.trim()) newErrors.password = "Mật khẩu là bắt buộc.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      dispatch(registerUser(form)).then(() => navigate("/loginUser"));
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl my-4">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            className={`w-full px-3 py-2 border ${errors.name ? "border-red-500" : ""}`}
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            className={`w-full px-3 py-2 border ${errors.email ? "border-red-500" : ""}`}
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            className={`w-full px-3 py-2 border ${errors.password ? "border-red-500" : ""}`}
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
