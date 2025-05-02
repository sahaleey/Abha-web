import React, { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const AdminUpload = () => {
  const [name, setName] = useState("");
  const [stage, setStage] = useState("");
  const [host, setHost] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("already_done");
  const [image, setImage] = useState(null);
  const [uploadedProgrammes, setUploadedProgrammes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProgrammes();
  }, []);

  const fetchProgrammes = async () => {
    try {
      const res = await axios.get(
        "https://abha-web-1.onrender.com/api/programmes"
      );
      setUploadedProgrammes(res.data);
    } catch (error) {
      console.error("Failed to fetch programmes", error);
      toast.error("Failed to load programmes");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const requiredFields = { name, stage, host, date, startTime, image };
    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      toast.error(`Missing required fields: ${missingFields.join(", ")}`);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("stage", stage);
    formData.append("host", host);
    formData.append("date", date);
    formData.append("startTime", startTime); // already HH:MM
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", image);
    console.log("Uploading startTime:", startTime);

    try {
      const response = await axios.post(
        "https://abha-web-1.onrender.com/api/programmes",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          timeout: 15000,
        }
      );

      if (response.status === 201) {
        Swal.fire({
          title: '<span style="color: #fff;">Success!</span>',
          html: '<span style="color: #bbb;">Programme uploaded successfully.</span>',
          icon: "success",
          background: "rgba(31, 31, 31, 0.95)",
          showConfirmButton: false,
          timer: 2000,
        });

        setIsModalOpen(false);
        setName("");
        setStage("");
        setHost("");
        setDate("");
        setStartTime("");
        setDescription("");
        setCategory("already_done");
        setImage(null);
        fetchProgrammes();
      }
    } catch (err) {
      console.error("Upload error details:", {
        message: err.message,
        response: err.response?.data,
        config: err.config,
      });

      let errorMessage = "Error uploading programme";
      if (err.response) {
        errorMessage =
          err.response.data?.message ||
          err.response.data?.error ||
          `Server responded with ${err.response.status}`;
      } else if (err.code === "ECONNABORTED") {
        errorMessage = "Request timed out. Please try again.";
      } else if (err.message.includes("Network Error")) {
        errorMessage = "Network connection failed. Please check your internet.";
      }

      Swal.fire({
        title: "Upload Failed",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Delete",
        background: "rgba(31, 31, 31, 0.95)",
      });

      if (result.isConfirmed) {
        await axios.delete(
          `https://abha-web-1.onrender.com/api/programmes/${id}`
        );
        setUploadedProgrammes(uploadedProgrammes.filter((p) => p._id !== id));
        toast.success("Programme deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting programme", error);
      toast.error("Failed to delete programme");
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    return `${hour > 12 ? hour - 12 : hour}:${minutes} ${
      hour >= 12 ? "PM" : "AM"
    }`;
  };

  return (
    <div className="min-h-screen mt-17 bg-gradient-to-tr from-[#0f0c29] via-[#302b63] to-[#24243e] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-10 text-center">
          Programme Management
        </h1>

        {/* Upload Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-10 right-10 bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-full shadow-lg hover:scale-110 transition-transform z-10"
        >
          <PlusCircle size={32} />
        </button>

        {/* Upload Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1e1e1e] p-6 md:p-8 rounded-xl w-full max-w-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Add New Programme
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <form
                onSubmit={handleUpload}
                className="space-y-4 overflow-y-auto max-h-[80vh] pr-2"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 mb-2">
                      Programme Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 bg-[#333] rounded-lg text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-2">Host</label>
                    <input
                      type="text"
                      value={host}
                      onChange={(e) => setHost(e.target.value)}
                      className="w-full p-3 bg-[#333] rounded-lg text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-2">Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full p-3 bg-[#333] rounded-lg text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-2">Time</label>
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full p-3 bg-[#333] rounded-lg text-white"
                      required
                      step="3600" // Show hours only (no minutes)
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-2">Stage</label>
                    <input
                      type="text"
                      value={stage}
                      onChange={(e) => setStage(e.target.value)}
                      className="w-full p-3 bg-[#333] rounded-lg text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-2">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-3 bg-[#333] rounded-lg text-white"
                    >
                      <option value="already_done">Past Event</option>
                      <option value="want_to_do">Upcoming Event</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 mb-2">
                    Programme Image
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full p-3 bg-[#333] rounded-lg text-white"
                    accept="image/*"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-2">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full p-3 bg-[#333] rounded-lg text-white"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Save Programme
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Programme List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uploadedProgrammes.length > 0 ? (
            uploadedProgrammes.map((prog) => (
              <div
                key={prog._id}
                className="bg-[#2a2a2a] rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={prog.image.url}
                  alt={prog.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {prog.name}
                  </h3>
                  <p className="text-gray-400 mb-1">
                    <span className="font-medium">Date:</span>{" "}
                    {formatDate(prog.date)}
                  </p>
                  <p className="text-gray-400 mb-1">
                    <span className="font-medium">Time:</span>{" "}
                    {formatTime(prog.startTime)}
                  </p>
                  <p className="text-gray-400 mb-1">
                    <span className="font-medium">Host:</span> {prog.host}
                  </p>
                  <p className="text-gray-400 mb-3">
                    <span className="font-medium">Stage:</span> {prog.stage}
                  </p>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {prog.description}
                  </p>
                  <button
                    onClick={() => handleDelete(prog._id)}
                    className="text-red-500 hover:text-red-400 transition"
                  >
                    Delete Programme
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-400 text-xl">No programmes added yet</p>
            </div>
          )}
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default AdminUpload;
