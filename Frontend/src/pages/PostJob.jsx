import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PostJob = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    company: "",
    salary: "",
    location: "",
    jobType: "FULL_TIME",
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8080/api/provider/jobs",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Job created");

      navigate("/recruiter"); // 🔥 go back

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow w-96">

        <h2 className="text-xl mb-4">Post Job</h2>

        <input name="title" placeholder="Title" onChange={handleChange} className="w-full border p-2 mb-2" />
        <input name="company" placeholder="Company" onChange={handleChange} className="w-full border p-2 mb-2" />
        <input name="location" placeholder="Location" onChange={handleChange} className="w-full border p-2 mb-2" />
        <input name="salary" placeholder="Salary" onChange={handleChange} className="w-full border p-2 mb-2" />

        <select name="jobType" onChange={handleChange} className="w-full border p-2 mb-2">
          <option value="FULL_TIME">FULL_TIME</option>
          <option value="PART_TIME">PART_TIME</option>
        </select>

        <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full border p-2 mb-2" />

        <button className="w-full bg-blue-500 text-white p-2">
          Submit
        </button>

      </form>
    </div>
  );
};

export default PostJob;