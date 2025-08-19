import { useState } from "react";
import { generateHallticketFaculty } from "../services/api";
import toast, { Toaster } from "react-hot-toast";

export default function AdminDashboard() {
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!pin.trim()) return toast.error("Enter PIN first");
    setLoading(true);
    try {
      const response = await generateHallticketFaculty(pin.trim());
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
    } catch {
      toast.error("Error generating hallticket");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-24 px-4 flex flex-col items-center bg-white">
      <Toaster position="top-center" />
      <h2 className="text-2xl font-semibold text-rose-600 mb-6">
        Universal Hallticket Downloader
      </h2>
      <div className="flex w-full max-w-md">
        <input
          type="text"
          placeholder="Enter PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="flex-grow px-4 py-2 border border-rose-300 rounded-l focus:outline-none"
          onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-rose-600 text-white px-4 py-2 rounded-r font-semibold disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>
    </div>
  );
}
