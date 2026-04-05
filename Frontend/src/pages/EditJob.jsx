import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditJob = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    description: "",
    company: "",
    salary: "",
    location: "",
    jobType: "FULL_TIME",
  });

  // 🔥 FETCH JOB DETAILS
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/provider/jobs/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const job = res.data.find((j) => j.id === Number(id));

        if (job) {
          setForm(job);
        }

      } catch (err) {
        console.error(err);
      }
    };

    fetchJob();
  }, [id]);

  // 🔄 HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🚀 UPDATE JOB
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:8080/api/provider/jobs/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data || "Updated successfully");

      navigate("/recruiter");

    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Edit Job
        </h2>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2 mb-3"
        />

        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company"
          className="w-full border p-2 mb-3"
        />

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border p-2 mb-3"
        />

        <input
          name="salary"
          value={form.salary}
          onChange={handleChange}
          placeholder="Salary"
          className="w-full border p-2 mb-3"
        />

        <select
          name="jobType"
          value={form.jobType}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
        >
          <option value="FULL_TIME">Full Time</option>
          <option value="PART_TIME">Part Time</option>
          <option value="REMOTE">Remote</option>
        </select>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 mb-3"
        />

        <button className="w-full bg-blue-500 text-white py-2 rounded">
          Update Job
        </button>
      </form>
    </div>
  );
};

export default EditJob;