import { useState, useRef, useEffect } from "react";
import { FiUpload, FiXCircle, FiArrowLeft } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import {
  searchStudent,
  generateHallticket,
  uploadReceipt,
} from "../services/api";

export default function StudentSearch({ onBack }) {
  const [pin, setPin] = useState("");
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [receiptFile, setReceiptFile] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    setReceiptFile(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  }, [pin, student]);

  const handleSearch = async () => {
    if (!pin.trim()) return toast.error("Please enter PIN");
    setLoading(true);
    try {
      const { data } = await searchStudent(pin.trim());
      setStudent(data);
    } catch {
      toast.error("Student not found");
      setStudent(null);
    }
    setLoading(false);
  };

  const handleGenerate = async () => {
    try {
      const response = await generateHallticket(pin.trim());
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `hallticket_${pin.trim()}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Hallticket downloaded");
    } catch (error) {
      toast.error("Error generating hallticket. Ensure fee is fully paid.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      e.target.value = null;
      return;
    }
    setReceiptFile(file);
  };

  const handleRemoveFile = () => {
    setReceiptFile(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleUploadReceipt = async () => {
    if (!receiptFile)
      return toast.error("Please select a PDF receipt file first");

    const formData = new FormData();
    formData.append("file", receiptFile);

    try {
      const data = await uploadReceipt(pin.trim(), formData);
      if (data.success) {
        toast.success(
          data.message || "Receipt uploaded successfully. Please search again."
        );
        setReceiptFile(null);
        setStudent(null);
      } else {
        toast.error(data.message || "Receipt upload failed");
      }
    } catch {
      toast.error("Failed to upload receipt");
    }
  };

  return (
    <div className="max-w-xl mx-auto w-full text-black">
      <Toaster position="top-center" reverseOrder={false} />
      <button
        onClick={onBack}
        className="flex items-center text-rose-600 hover:text-rose-700 font-semibold mb-6"
      >
        <FiArrowLeft className="mr-2" /> Back to Steps
      </button>

      <div className="flex w-full rounded-md shadow-md overflow-hidden focus-within:ring-2 focus-within:ring-rose-500">
        <input
          type="text"
          placeholder="Enter PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-grow px-6 py-3 text-black text-lg font-semibold bg-white placeholder-rose-400 focus:outline-none"
          aria-label="Enter PIN"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-rose-600 text-white px-8 py-3 text-lg font-semibold disabled:opacity-50 transition"
          type="button"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {student && (
        <div className="mt-10 w-full">
          <table className="border-collapse text-base w-full max-w-2xl">
            <thead>
              <tr className="bg-rose-100 text-rose-700 text-left">
                <th className="px-6 py-3 whitespace-nowrap">PIN</th>
                <th className="px-6 py-3 whitespace-nowrap">Name</th>
                <th className="px-6 py-3 whitespace-nowrap">Fee Due</th>
                <th className="px-6 py-3 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                className={student.due > 0 ? "text-red-600" : "text-green-700"}
              >
                <td className="px-6 py-3">{student.pin}</td>
                <td className="px-6 py-3">{student.name}</td>
                <td className="px-6 py-3 font-semibold">₹{student.due}</td>
                <td className="px-6 py-3 whitespace-nowrap">
                  {student.due === 0 ? (
                    <button
                      onClick={handleGenerate}
                      className="bg-rose-600 text-white px-5 py-2 rounded shadow font-semibold"
                    >
                      Generate Hallticket
                    </button>
                  ) : (
                    <div className="flex items-center space-x-4">
                      <label
                        htmlFor="receipt-upload"
                        className="cursor-pointer inline-flex items-center space-x-2 text-rose-600 hover:text-rose-700"
                        title="Upload Receipt PDF"
                      >
                        <FiUpload className="w-6 h-6" />
                      </label>
                      {receiptFile && (
                        <button
                          onClick={handleRemoveFile}
                          className="text-red-600 hover:text-red-800 focus:outline-none"
                          title="Remove selected file"
                          type="button"
                          aria-label="Remove selected file"
                        >
                          <FiXCircle className="w-6 h-6" />
                        </button>
                      )}
                      <button
                        onClick={handleUploadReceipt}
                        disabled={!receiptFile}
                        className="bg-rose-600 disabled:bg-rose-300 text-white px-4 py-2 rounded shadow font-semibold transition"
                        type="button"
                      >
                        Upload Receipt
                      </button>
                      <input
                        id="receipt-upload"
                        ref={fileInputRef}
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
