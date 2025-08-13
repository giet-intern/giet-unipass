import { useState } from "react";
import {
  FiCheckCircle,
  FiUpload,
  FiFileText,
  FiAlertCircle,
} from "react-icons/fi";
import StudentSearch from "./StudentSearch";

export default function LandingPage() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="min-h-screen bg-white pt-28 px-4 flex flex-col items-center w-full">
      <p className="text-xl sm:text-2xl md:text-3xl font-flower text-rose-600 text-center">
        Designed & Developed for students by
      </p>
      <p className="text-lg sm:text-xl font-semibold text-rose-700 mb-8 text-center">
        Dept. of CSE (AIML & CS), GIET
      </p>

      {!showSearch ? (
        <div className="w-full max-w-md space-y-4 text-rose-700">
          <div className="flex items-center space-x-2 text-base sm:text-lg">
            <FiFileText className="text-rose-600 w-5 h-5" />
            <span>Enter your PIN number and search</span>
          </div>
          <div className="flex items-center space-x-2 text-base sm:text-lg">
            <FiCheckCircle className="text-rose-600 w-5 h-5" />
            <span>Generate hallticket if you've cleared dues</span>
          </div>
          <div className="flex items-center space-x-2 text-base sm:text-lg">
            <FiUpload className="text-rose-600 w-5 h-5" />
            <span>
              If you have dues, upload payment receipt to update status
            </span>
          </div>
          <div className="flex items-center space-x-2 text-base sm:text-lg">
            <FiAlertCircle className="text-rose-600 w-5 h-5" />
            <span>Contact Admin if you have any issues</span>
          </div>

          <p className="text-red-400 italic text-center mt-2 text-sm sm:text-base">
            Note: You should get the hallticket signed by the department before
            18th Aug 2025
          </p>

          <button
            className="bg-rose-600 text-white font-semibold px-6 py-3 rounded w-full mt-4"
            onClick={() => setShowSearch(true)}
          >
            Download Hallticket
          </button>
        </div>
      ) : (
        <StudentSearch />
      )}
    </div>
  );
}
