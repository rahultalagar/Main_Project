import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const MyApplications = () => {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);

  // 🚀 FETCH APPLICATIONS
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/user/applications",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setApplications(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchApplications();
  }, []);

  // 🚀 CANCEL APPLICATION
  const handleCancel = async (id) => {
  try {
    await axios.put(
      `http://localhost:8080/api/user/applications/${id}/cancel`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    alert("Application cancelled");

    // refresh list
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: "CANCELLED" } : app
      )
    );

  } catch (err) {
    console.error(err);

    if (err.response && err.response.data) {
      alert(err.response.data);
    } else {
      alert("Cancel failed");
    }
  }
};

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* 🔹 SIDEBAR */}
      <div className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">

        <div>
          {/* Profile */}
          <div className="flex items-center gap-3 mb-8">
            <img
              src="https://i.pravatar.cc/100"
              alt="profile"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h2 className="font-semibold">Rahul</h2>
              <p className="text-sm text-gray-500">Job Seeker</p>
            </div>
          </div>

          {/* Menu */}
          <div className="space-y-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
            >
              Dashboard
            </button>

            <button className="w-full text-left px-4 py-2 bg-blue-100 text-blue-600 rounded-lg">
              My Applications
            </button>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="bg-red-500 text-white py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* 🔹 MAIN CONTENT */}
      <div className="flex-1 p-8">

        <h1 className="text-2xl font-bold mb-6">
          My Applications
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {applications.length === 0 ? (
            <p className="text-gray-500">No applications found</p>
          ) : (
            applications.map((app) => (
              <div
                key={app.id}
                className="bg-white p-6 rounded-xl shadow"
              >
                <h2 className="text-lg font-semibold">
                  {app.title}
                </h2>

                <p className="text-gray-600">
                  {app.company}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  Applied on: {app.appliedDate}
                </p>

                <span
                  className={`inline-block mt-2 px-3 py-1 text-xs rounded ${
                    app.status === "APPLIED"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {app.status}
                </span>

                {app.status === "APPLIED" && (
                  <button
                    onClick={() => handleCancel(app.id)}
                    className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                  >
                    Cancel Application
                  </button>
                )}
              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
};

export default MyApplications;