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
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("stage", stage);
    formData.append("host", host);
    formData.append("date", date);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/programmes",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      Swal.fire({
        title: '<span style="color: #fff;">Uploaded!</span>',
        html: '<span style="color: #bbb;">Your programme has been successfully uploaded.</span>',
        icon: "success",
        background: "rgba(31, 31, 31, 0.95)",
        color: "#ffffff",
        showConfirmButton: false,
        timer: 2000,
        backdrop: `
          rgba(0,0,0,0.6)
        `,
        customClass: {
          popup: "rounded-3xl p-8 backdrop-blur-md shadow-2xl",
        },
        showClass: {
          popup: "animate__animated animate__zoomIn faster",
        },
        hideClass: {
          popup: "animate__animated animate__zoomOut faster",
        },
      });

      if (response.status === 201) {
        setIsModalOpen(false);
        setName("");
        setStage("");
        setHost("");
        setDate("");
        setDescription("");
        setCategory("already_done");
        setImage(null);
        fetchProgrammes();
        toast.success("Programme uploaded successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error uploading programme");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/programmes/${id}`
      );
      if (response.status === 200) {
        setUploadedProgrammes(
          uploadedProgrammes.filter((programme) => programme._id !== id)
        );
        toast.success("Programme deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting programme", error);
      toast.error("Failed to delete programme");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr mt-17 from-[#0f0c29] via-[#302b63] to-[#24243e] p-8">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold text-white mb-12 animate__animated animate__fadeIn">
          Upload Programmes
        </h1>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-10 right-10 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-5 rounded-full text-white shadow-2xl hover:scale-110 transition-all duration-300 ease-out hover:shadow-xl hover:bg-gradient-to-l"
      >
        <PlusCircle size={40} />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-[#1f1f1f] p-10 rounded-2xl shadow-2xl w-full max-w-xl animate__animated animate__fadeIn animate__delay-1s">
            <h2 className="text-4xl font-bold text-white mb-8 text-center">
              Add New Programme
            </h2>
            <form onSubmit={handleUpload} className="space-y-2 gap-2 ">
              <input
                type="text"
                placeholder="Programme Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 rounded-lg bg-[#333] text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 transition-all duration-300"
              />
              <input
                type="text"
                placeholder="Lead By"
                value={host}
                onChange={(e) => setHost(e.target.value)}
                className="w-full p-4 rounded-lg bg-[#333] text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 transition-all duration-300"
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-4 rounded-lg bg-[#333] text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 transition-all duration-300"
              />
              <input
                type="text"
                placeholder="Stage"
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="w-full p-4 rounded-lg bg-[#333] text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 transition-all duration-300"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-4 rounded-lg bg-[#333] text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 transition-all duration-300"
              >
                <option value="already_done">Already Done</option>
                <option value="want_to_do">Want to Do</option>
              </select>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full p-4 rounded-lg bg-[#333] text-white transition-all duration-300"
              />
              <textarea
                placeholder="Programme Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                className="w-full p-4 rounded-lg bg-[#333] text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 transition-all duration-300"
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white py-3 px-6 rounded-full font-bold hover:scale-105 transition-transform"
                >
                  Upload
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 py-3 px-6 rounded-full text-white hover:bg-gray-600 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Uploaded Programmes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-16">
        {uploadedProgrammes.length > 0 ? (
          uploadedProgrammes.map((prog) => (
            <div
              key={prog._id}
              className="bg-[#2a2a2a] rounded-xl overflow-hidden shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-2xl hover:bg-[#333] animate__animated animate__fadeIn"
            >
              {prog.image && (
                <img
                  src={`http://localhost:5000/uploads/${prog.image}`}
                  alt={prog.name}
                  className="w-full h-60 object-cover transition-transform duration-500 ease-out transform hover:scale-110"
                />
              )}
              <div className="p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{prog.name}</h3>
                <p className="text-sm text-gray-400 mb-1">
                  Lead By: {prog.host}
                </p>
                <p className="text-sm text-gray-400 mb-4">Date: {prog.date}</p>
                <p className="text-sm text-gray-400 mb-1">
                  Stage: {prog.stage}
                </p>
                <p className="text-sm text-gray-400 mb-4">
                  Category: {prog.category}
                </p>
                <p className="text-sm">{prog.description}</p>
                <button
                  onClick={() => {
                    Swal.fire({
                      title: "Are you sure?",
                      text: "You won't be able to revert this!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#d33",
                      cancelButtonColor: "#3085d6",
                      confirmButtonText: "Yes, delete it!",
                      background: "#1f1f1f",
                      color: "#fff",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleDelete(prog._id); // ✅ Actually delete if user confirms
                        Swal.fire({
                          title: "Deleted!",
                          text: "Programme has been deleted.",
                          icon: "success",
                          background: "#1f1f1f",
                          color: "#fff",
                        });
                      }
                    });
                  }}
                  className="mt-4 text-red-500 hover:text-red-700 transition duration-300 ease-out hover:scale-110"
                >
                  Delete Programme
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">No programmes uploaded yet.</p>
        )}
      </div>

      {/* Toast Notifications Container */}
      <ToastContainer position="bottom-right" autoClose={5000} />
    </div>
  );
};

export default AdminUpload;
