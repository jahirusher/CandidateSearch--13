import { useEffect, useState } from "react";
import { Candidate } from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("savedCandidates");
      console.log("Retrieved saved candidates:", saved); 
      if (saved) {
        setSavedCandidates(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Error loading saved candidates:", error);
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Potential Candidates</h1>

      {savedCandidates.length === 0 ? (
        <p>No candidates have been saved yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Avatar</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Location</th>
                <th className="border border-gray-300 px-4 py-2">GitHub</th>
                <th className="border border-gray-300 px-4 py-2">Company</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {savedCandidates.map((candidate) => (
                <tr key={candidate.login} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <img
                      src={candidate.avatar_url}
                      alt={candidate.name}
                      className="w-12 h-12 rounded-full mx-4"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {candidate.name || ''}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {candidate.location || ''}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <a
                      href={candidate.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Profile
                    </a>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {candidate.company || ''}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {candidate.email || ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SavedCandidates;
