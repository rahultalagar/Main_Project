import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("USER");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser({ ...formData, role });
      alert("Registered Successfully");
      navigate("/login");
    } catch (err) {
      alert("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-[800px] bg-white rounded-2xl shadow-lg flex overflow-hidden">

        {/* LEFT PANEL */}
        <div className="w-1/2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex flex-col justify-center items-center p-8">
          <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-center mb-6">
            Already have an account? Login and continue your journey.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="border px-6 py-2 rounded-lg"
          >
            SIGN IN
          </button>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-1/2 p-8">

          <h2 className="text-2xl font-bold mb-4 text-center">
            Create Account
          </h2>

          {/* Role */}
          <div className="flex mb-4">
            <button
              type="button"
              onClick={() => setRole("USER")}
              className={`w-1/2 p-2 ${
                role === "USER" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              Job Seeker
            </button>

            <button
              type="button"
              onClick={() => setRole("RECRUITER")}
              className={`w-1/2 p-2 ${
                role === "RECRUITER" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              Recruiter
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              name="username"
              placeholder="Full Name"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />

            <input
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 cursor-pointer text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            <button className="w-full bg-blue-500 text-white p-2 rounded-lg">
              SIGN UP
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-500 cursor-pointer"
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default RegisterPage;