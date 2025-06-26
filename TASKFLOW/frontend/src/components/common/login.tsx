import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import axios from "axios";

import { Eye, EyeOff, LogIn, Mail, Lock } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

import { Input } from "../ui/input";

import { Inputwrapper, BUTTONCLASSES } from "@/assets/dummy";
import type { FormField } from "@/config/types";
import type { SignUpProps } from "@/pages/auth/signup";

const INITIAL_FORM = {
  email: "",
  password: "",
};

const Login = ({ onSubmit, onSwitchMode }: SignUpProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const url = "http://localhost:4000";

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user");
    if (token) {
      (async () => {
        try {
          const { data } = await axios.get(`${url}/api/user/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (data.success) {
            onSubmit?.({ token, userId, ...data.user });
            toast.success("Session restored! Redirecting...");
            navigate({ to: "/" });
          } else {
            localStorage.clear();
          }
        } catch {
          localStorage.clear();
        }
      })();
    }
  }, [navigate, onSubmit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rememberMe) {
      toast.error("Enable 'Remember Me' option to proceed.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(`${url}/api/user/login`, formData);
      if (!data.token) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.user.id);
      setFormData(INITIAL_FORM);
      onSubmit?.({ token: data.token, userId: data.user.id, ...data.user });
      toast.success("Login successful!");
      setTimeout(() => navigate({ to: "/" }), 1000);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      console.error("Error:", errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchMode = () => {
    toast.dismiss();
    onSwitchMode?.();
  };

  const fields = [
    { name: "email", type: "email", placeholder: "Email", icon: Mail },
    {
      name: "password",
      type: showPassword ? "text" : "password",
      placeholder: "Password",
      icon: Lock,
      isPassword: true,
    },
  ];

  return (
    <div className="w-full max-w-md p-8 bg-white border border-purple-100 shadow-lg rounded-xl">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />

      <div className="mb-6 text-center">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600">
          <LogIn className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
        <p className="mt-1 text-sm text-gray-500">
          Sign In to continue to TaskFlow
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map(({ name, type, placeholder, icon: Icon, isPassword }) => (
          <div key={name} className={Inputwrapper}>
            <Icon className="w-5 h-5 mr-2 text-purple-500" />

            <Input
              type={type}
              placeholder={placeholder}
              value={formData[name as FormField]}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  [name as FormField]: e.target.value,
                });
              }}
              className="w-full text-sm text-gray-700 focus:outline-none "
              required
            />

            {isPassword && (
              <button
                title="Toggle Password Visibility"
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="ml-2 text-gray-500 transition hover:text-transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            )}
          </div>
        ))}

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="w-4 h-4 border-gray-300 rounded focus:ring-purple-400 accent-purple-500"
          />
          <label htmlFor="rememberMe" className="text-sm text-gray-600">
            Remember Me
          </label>
        </div>

        <button type="submit" className={BUTTONCLASSES} disabled={loading}>
          {loading ? (
            "Logging in..."
          ) : (
            <>
              <LogIn className="w-4 h-4" />
              Log In
            </>
          )}
        </button>
      </form>

      <p className="mt-6 text-sm text-center text-gray-600">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={handleSwitchMode}
          className="font-medium text-purple-600 transition-colors hover:underline hover:text-purple-700"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default Login;
