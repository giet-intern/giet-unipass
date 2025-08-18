import { useState, useRef, useEffect } from "react";
import { FiUpload, FiXCircle } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import {
  searchStudent,
  generateHallticket,
  uploadReceipt,
} from "../services/api";

export default function StudentSearch() {
  const [pin, setPin] = useState("");
  const [student, setStudent] = useState(null);
  const [searching, setSearching] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [receiptFile, setReceiptFile] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    setReceiptFile(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  }, [student]);

  const handleSearch = async () => {
    if (!pin.trim()) return toast.error("Please enter PIN");
    setSearching(true);
    try {
      const { data } = await searchStudent(pin.trim());
      setStudent(data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Student not found");
      setStudent(null);
    } finally {
      setSearching(false);
    }
  };

  const handleKeyDown = (e) => e.key === "Enter" && handleSearch();

  const handleGenerate = async () => {
    try {
      if (pin == student.pin) {
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
        setPin("");
        setStudent(null);
        setReceiptFile(null);
        if (fileInputRef.current) fileInputRef.current.value = null;
      }
    } catch {
      toast.error("Error generating hallticket.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
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
    if (!receiptFile) return toast.error("Select a PDF receipt first");
    setUploading(true);
    const formData = new FormData();
    formData.append("file", receiptFile);

    try {
      const res = await uploadReceipt(pin.trim(), formData);
      if (res.success) {
        toast.success(res.message || "Receipt uploaded successfully");
        setReceiptFile(null);
        setStudent(null);
      } else {
        toast.error(res.message || "Upload failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to upload receipt");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6 px-2 sm:px-0">
      <Toaster position="top-center" />
      <div className="flex flex-col sm:flex-row w-full rounded-md shadow-md overflow-hidden">
        <input
          type="text"
          placeholder="Enter PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-2 text-black text-base sm:text-lg font-semibold bg-white placeholder-rose-400 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          disabled={searching}
          className="bg-rose-600 text-white px-4 py-2 font-semibold mt-2 sm:mt-0 sm:ml-2 rounded disabled:opacity-50"
        >
          {searching ? "Searching..." : "Search"}
        </button>
      </div>

      {student && (
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-sm sm:text-base border-collapse">
            <thead className="bg-rose-100 text-rose-800">
              <tr>
                <th className="px-3 py-2">PIN</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Fee Due</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                className={student.due > 0 ? "text-red-600" : "text-green-700"}
              >
                <td className="px-3 py-2">{student.pin}</td>
                <td className="px-3 py-2">{student.name}</td>
                <td className="px-3 py-2 font-semibold">₹{student.due}</td>
                <td className="px-3 py-2 flex flex-wrap items-center space-x-2">
                  {student.due === 0 && (
                    <button
                      onClick={handleGenerate}
                      className="bg-rose-600 text-white px-3 py-1 rounded font-semibold"
                    >
                      Generate
                    </button>
                  )}
                  {student.due > 0 && (
                    <>
                      <label
                        htmlFor="receipt-upload"
                        className="cursor-pointer inline-flex items-center space-x-1 text-rose-600"
                      >
                        <FiUpload className="w-5 h-5" />
                        <span className="text-sm">Upload Receipt</span>
                      </label>
                      {receiptFile && (
                        <button
                          onClick={handleRemoveFile}
                          className="text-red-600"
                        >
                          <FiXCircle className="w-5 h-5" />
                        </button>
                      )}
                      <button
                        onClick={handleUploadReceipt}
                        disabled={!receiptFile || uploading}
                        className="bg-rose-600 text-white px-3 py-1 rounded font-semibold disabled:opacity-50"
                      >
                        {uploading ? "Uploading..." : "Upload"}
                      </button>
                      <input
                        id="receipt-upload"
                        ref={fileInputRef}
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </>
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
