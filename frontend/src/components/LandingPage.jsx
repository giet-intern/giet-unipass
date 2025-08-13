import { useState } from "react";
import StudentSearch from "./StudentSearch";

export default function LandingPage() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="min-h-screen pt-20 bg-white flex flex-col items-center px-4 py-12 font-sans text-black">
      {!showSearch ? (
        <>
          <div className="max-w-2xl text-center space-y-6">
            <h2 className="text-2xl font-semibold text-rose-600">
              Steps to use this application
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-lg leading-relaxed max-w-md mx-auto">
              <li>Enter your PIN number in the search box and click Search</li>
              <li>
                Generate and download your hallticket if fee dues are cleared
              </li>
              <li>
                If fee dues are not cleared, upload your payment receipt to
                update the status
              </li>
              <li>Contact the admin if you face any issues</li>
            </ol>
            <p className="text-red-600 italic max-w-md mx-auto mt-4">
              Note: After downloading the hallticket, take a printout and get it
              signed in the department before 18/08/2025
            </p>
            <button
              onClick={() => setShowSearch(true)}
              className="mt-8 bg-rose-600 hover:bg-rose-700 text-white font-semibold px-6 py-3 rounded shadow transition"
            >
              Download Hallticket
            </button>
          </div>
        </>
      ) : (
        <StudentSearch onBack={() => setShowSearch(false)} />
      )}
    </div>
  );
}
