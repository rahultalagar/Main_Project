import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">

      {/* Navbar */}
      <nav className="fixed w-full bg-white shadow z-50 flex justify-between items-center px-8 py-4">
        <h1 className="text-xl font-bold text-blue-600">
          JobPortal
        </h1>

        <div className="space-x-6 hidden md:block">
          <a href="#home" className="hover:text-blue-500">Home</a>
          <a href="#about" className="hover:text-blue-500">About</a>
          <a href="#features" className="hover:text-blue-500">Features</a>
        </div>

        <div className="space-x-3">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 border rounded-lg"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Register
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4"
      >
        <h2 className="text-5xl font-bold mb-4">
          Find Your Dream Job 🚀
        </h2>

        <p className="max-w-xl mb-6">
          One platform for job seekers, recruiters, and admins to connect seamlessly.
        </p>

        <div className="space-x-4">
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold"
          >
            Get Started
          </button>

          <a
            href="#features"
            className="px-6 py-3 border border-white rounded-lg"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-8 text-center bg-gray-100">
        <h2 className="text-3xl font-bold mb-6">About Us</h2>

        <p className="max-w-2xl mx-auto text-gray-600">
          Smart Job Portal is designed to bridge the gap between job seekers and recruiters.
          Our platform allows users to explore jobs, apply easily, and helps recruiters find
          the best talent efficiently.
        </p>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-8">
        <h2 className="text-3xl font-bold text-center mb-10">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">Job Search</h3>
            <p className="text-gray-500">
              Browse and apply to jobs with ease.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">Recruiter Panel</h3>
            <p className="text-gray-500">
              Post jobs and manage candidates efficiently.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">Admin Control</h3>
            <p className="text-gray-500">
              Full system management with security.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-gray-900 text-white">
        <p>© 2026 Smart Job Portal</p>
      </footer>

    </div>
  );
};

export default HomePage;