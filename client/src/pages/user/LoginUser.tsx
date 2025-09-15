import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/slices/userSlice";
import { RootState } from "../../redux/store";

interface FormState {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const InputField: React.FC<{
  label: string;
  type: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}> = ({ label, type, value, error, onChange }) => (
  <div className="mb-4">
    <label className="block text-gray-700">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-3 py-2 border ${error ? "border-red-500" : ""}`}
    />
    {error && <p className="text-red-500">{error}</p>}
  </div>
);

const LoginUser: React.FC = () => {
  const [form, setForm] = useState<FormState>({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.email) {
      newErrors.email = "Email là bắt buộc";
    } else if (user && user.email === form.email) {
      newErrors.email = "Email đã tồn tại";
    }

    if (!form.password) {
      newErrors.password = "Mật khẩu là bắt buộc";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(loginUser(form)).then(() => {
        navigate("/");
      });
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl my-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Email"
          type="email"
          value={form.email}
          error={errors.email}
          onChange={(val) => setForm({ ...form, email: val })}
        />
        <InputField
          label="Password"
          type="password"
          value={form.password}
          error={errors.password}
          onChange={(val) => setForm({ ...form, password: val })}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginUser;
