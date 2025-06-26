import { UserPlus } from "lucide-react";
import { useState } from "react";
import {
  BUTTONCLASSES,
  FIELDS,
  Inputwrapper,
  MESSAGE_ERROR,
  MESSAGE_SUCCESS,
} from "@/assets/dummy";
import axios from "axios";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import type { SignUpProps } from "@/config/types";

type FormField = "name" | "email" | "password";


const API_URL = "http://localhost:4000";
const INITIAL_FORM = {
  name: "",
  email: "",
  password: "",
};

const SignUp = ({ onSwitchMode }: SignUpProps) => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const { data } = await axios.post(
        `${API_URL}/api/user/register`,
        formData
      );
      console.log("SignUp Successful", data);
      setMessage({ text: "Registration Successful", type: "success" });
      setFormData(INITIAL_FORM);

      // if (onSubmit) {
      //   onSubmit({ email: formData.email, name: formData.name });
      // }
    } catch (err: unknown) {
      console.error("SignUp Error", err);
      if (axios.isAxiosError(err)) {
        setMessage({
          text:
            err.response?.data?.message || "An error occured. Please try again",
          type: "error",
        });
      } else {
        setMessage({
          text: "An error occured. Please try again",
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white border border-purple-100 shadow-lg rounded-xl">
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600">
          <UserPlus className="w-8 h-8 text-white" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 ">Create account</h2>
        <p className="mt-1 text-sm text-gray-500">
          Join Taskflow to manage your tasks
        </p>
      </div>

      {message.text && (
        <div
          className={
            message.type === "success" ? MESSAGE_SUCCESS : MESSAGE_ERROR
          }
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {FIELDS.map(({ name, type, placeholder, icon: Icon }) => (
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
          </div>
        ))}

        <Button type="submit" className={BUTTONCLASSES} disabled={loading}>
          {loading ? (
            "Signing Up..."
          ) : (
            <>
              <UserPlus className="w-4 h-4" />
              Sign Up
            </>
          )}
        </Button>
      </form>
      <p className="mt-6 text-sm text-center text-gray-600">
        Already have an account?{" "}
        <Button
          onClick={onSwitchMode}
          className="ml-2 font-medium text-purple-600 transition-colors hover:text-purple-700 hover:underline"
        >
          Login
        </Button>
      </p>
    </div>
  );
};

export default SignUp;
