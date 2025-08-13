import React, { useState, useRef } from "react";
import { uploadSheet } from "../services/api";
import toast, { Toaster } from "react-hot-toast";

export default function AdminDashboard() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    setUploading(true);

    try {
      await uploadSheet(file);
      toast.success("Sheet uploaded successfully");
      setFile(null);
      if (inputRef.current) inputRef.current.value = "";
    } catch (error) {
      toast.error("Failed to upload sheet");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <Toaster position="top-center" />
      <h2 className="text-2xl font-semibold mb-4 text-rose-700">
        Upload Sheet
      </h2>

      <input
        ref={inputRef}
        type="file"
        accept=".xls,.xlsx,.csv"
        onChange={handleFileChange}
        className="mb-4 w-full"
      />

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className={`w-full py-3 rounded font-semibold text-white transition ${
          file && !uploading
            ? "bg-rose-600 hover:bg-rose-700"
            : "bg-rose-300 cursor-not-allowed"
        }`}
      >
        {uploading ? "Uploading..." : "Upload Sheet"}
      </button>
    </div>
  );
}
