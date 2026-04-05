import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle login
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await loginUser(formData);

    const token = res.data.token;

    // 🔐 store token
    localStorage.setItem("token", token);

    // 🧠 decode token
    const decoded = jwtDecode(token);

    const role = decoded.role;

    alert("Login Successful");

    // 🚀 role-based redirect
    if (role === "USER") {
      navigate("/dashboard");
    } else if (role === "RECRUITER") {
      navigate("/recruiter");
    } else if (role === "ADMIN") {
      navigate("/admin");
    } else {
      navigate("/");
    }

  } catch (err) {
    console.error(err);
    alert("Invalid Credentials");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-[800px] bg-white rounded-2xl shadow-lg flex overflow-hidden">

        {/* LEFT PANEL */}
        <div className="w-1/2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex flex-col justify-center items-center p-8">
          <h2 className="text-3xl font-bold mb-4">Hello, Friend!</h2>
          <p className="text-center mb-6">
            Don't have an account? Register now and start your journey.
          </p>

          <button
            onClick={() => navigate("/register")}
            className="border px-6 py-2 rounded-lg"
          >
            SIGN UP
          </button>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-1/2 p-8">

          <h2 className="text-2xl font-bold mb-4 text-center">
            Sign In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

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
              SIGN IN
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-500 cursor-pointer"
            >
              Register
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;