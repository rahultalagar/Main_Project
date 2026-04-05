import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const UserDashboard = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  // 🚀 FETCH JOBS + APPLICATIONS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // ✅ Fetch Jobs
        const jobsRes = await axios.get(
          "http://localhost:8080/api/user/jobs",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setJobs(jobsRes.data);

        // ✅ Fetch Applications
        const appRes = await axios.get(
          "http://localhost:8080/api/user/applications",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // ✅ ONLY STORE APPLIED JOB IDs
        const applied = appRes.data
          .filter((app) => app.status === "APPLIED")
          .map((app) => app.jobId);

        setAppliedJobs(applied);

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // 🚀 APPLY JOB
  const handleApply = async (jobId) => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/user/apply/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert(res.data || "Applied successfully");

      // ✅ ADD TO STATE
      setAppliedJobs((prev) => [...prev, jobId]);

    } catch (err) {
      console.error(err);

      if (err.response && err.response.data) {
        alert(err.response.data);
      } else {
        alert("Server error");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <img
              src="https://i.pravatar.cc/100"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h2 className="font-semibold">Rahul</h2>
              <p className="text-sm text-gray-500">Job Seeker</p>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full text-left px-4 py-2 bg-blue-100 text-blue-600 rounded-lg">
              Dashboard
            </button>

            <button
              onClick={() => navigate("/applications")}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
            >
              My Applications
            </button>
          </div>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="mt-6 bg-red-500 text-white py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-8">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Recommended Jobs</h1>

          <input
            type="text"
            placeholder="Search jobs..."
            className="border px-4 py-2 rounded-lg w-64"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {jobs.map((job) => {
            const isApplied = appliedJobs.includes(job.id);

            return (
              <div
                key={job.id}
                className="bg-white p-6 rounded-xl shadow"
              >
                <h2 className="text-lg font-semibold">{job.title}</h2>

                <p className="text-sm text-gray-500 mt-2">
                  {job.description}
                </p>

                <p className="text-gray-600 mt-2">{job.company}</p>

                <p className="text-gray-500 text-sm">
                  📍 {job.location}
                </p>

                <p className="text-green-600 mt-2">
                  ₹ {job.salary}
                </p>

                <span className="inline-block mt-2 text-xs bg-blue-100 px-2 py-1 rounded">
                  {job.jobType}
                </span>

                <button
                  onClick={() => handleApply(job.id)}
                  disabled={isApplied}
                  className={`mt-4 w-full py-2 rounded-lg text-white ${
                    isApplied
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500"
                  }`}
                >
                  {isApplied ? "Already Applied" : "Apply Now"}
                </button>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;