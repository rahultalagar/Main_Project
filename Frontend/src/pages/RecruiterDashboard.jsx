import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  const token = localStorage.getItem("token");

  // 🔥 FETCH JOBS
  const fetchJobs = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/provider/jobs/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // 🗑 DELETE JOB
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/provider/jobs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Job deleted");
      fetchJobs();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* 🔹 SIDEBAR */}
      <div className="w-64 bg-white shadow-xl p-6 flex flex-col justify-between">

        <div>
          {/* PROFILE */}
          <div className="flex items-center gap-3 mb-8">
            <img
              src="https://i.pravatar.cc/100"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h2 className="font-semibold text-lg">Recruiter</h2>
              <p className="text-sm text-gray-500">Job Provider</p>
            </div>
          </div>

          {/* MENU */}
          <div className="space-y-3">

            <button className="w-full text-left px-4 py-2 bg-blue-100 text-blue-600 rounded-lg">
              My Jobs
            </button>

            <button
              onClick={() => navigate("/post-job")}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
            >
              + Post Job
            </button>

           

          </div>
        </div>

        {/* LOGOUT */}
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
          My Posted Jobs
        </h1>

        {/* JOB CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {jobs.length === 0 ? (
            <p className="text-gray-500">No jobs posted yet</p>
          ) : (
            jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition"
              >
                <h2 className="text-lg font-semibold">
                  {job.title}
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                  {job.description}
                </p>

                <p className="mt-2 font-medium">
                  {job.company}
                </p>

                <p className="text-sm text-gray-500">
                  📍 {job.location}
                </p>

                <p className="text-green-600 font-semibold mt-2">
                  ₹ {job.salary}
                </p>

                {/* ACTION BUTTONS */}
                <div className="flex gap-3 mt-4">

                  <button
                    onClick={() => navigate(`/edit-job/${job.id}`)}
                    className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(job.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;