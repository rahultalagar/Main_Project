import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const JobApplications = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [applications, setApplications] = useState([]);

  // 🔥 FETCH APPLICATIONS
  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/provider/job/${jobId}/applications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplications(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // 🔥 UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:8080/api/provider/application/${id}/status?status=${status}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchApplications();

    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  // 📊 STATS
  const total = applications.length;
  const pending = applications.filter(a => a.status === "APPLIED").length;
  const selected = applications.filter(a => a.status === "SELECTED").length;
  const rejected = applications.filter(a => a.status === "REJECTED").length;

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* 🔙 BACK */}
      <button
        onClick={() => navigate("/recruiter")}
        className="mb-4 text-blue-600"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-6">
        Job Applications
      </h1>

      {/* 📊 STATS */}
      <div className="grid grid-cols-4 gap-4 mb-6">

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Total</p>
          <h2 className="text-xl font-bold">{total}</h2>
        </div>

        <div className="bg-blue-100 p-4 rounded shadow">
          <p>Pending</p>
          <h2 className="font-bold">{pending}</h2>
        </div>

        <div className="bg-green-100 p-4 rounded shadow">
          <p>Selected</p>
          <h2 className="font-bold">{selected}</h2>
        </div>

        <div className="bg-red-100 p-4 rounded shadow">
          <p>Rejected</p>
          <h2 className="font-bold">{rejected}</h2>
        </div>

      </div>

      {/* 📋 LIST */}
      <div className="bg-white p-6 rounded shadow">

        {applications.length === 0 ? (
          <p>No applicants yet</p>
        ) : (
          applications.map((app) => (
            <div
              key={app.id}
              className="flex justify-between items-center border-b py-3"
            >
              {/* USER INFO */}
              <div>
                <p className="font-semibold">
                  {app.userName || "User"}
                </p>

                <p className={`text-sm ${
                  app.status === "SELECTED"
                    ? "text-green-600"
                    : app.status === "REJECTED"
                    ? "text-red-600"
                    : "text-gray-500"
                }`}>
                  {app.status}
                </p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-2">

                <button
                  onClick={() => updateStatus(app.id, "SELECTED")}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                >
                  Select
                </button>

                <button
                  onClick={() => updateStatus(app.id, "REJECTED")}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>

              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default JobApplications;