import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [message, setMessage] = useState<string>(''); 


  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await searchGithub(); 
        setCandidates(data);
        if (data.length > 0) {
          setCandidate(data[0]); 
        } else {
          setMessage('No candidates available');
        }
      } catch (error) {
        setMessage('Error fetching candidates');
      }
    };

    fetchCandidates();
  }, []);


  const saveCandidate = () => {
    if (candidate) {
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      savedCandidates.push(candidate); 
      localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
    }
    showNextCandidate();
  };

  const showNextCandidate = () => {
    setCandidates((prev) => {
      const updatedCandidates = prev.slice(1); 
      if (updatedCandidates.length > 0) {
        setCandidate(updatedCandidates[0]); 
      } else {
        setCandidate(null);
        setMessage('No more candidates available');
      }
      return updatedCandidates;
    });
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      {candidate ? (
        <div>
          <img src={candidate.avatar_url} alt={`${candidate.login}'s avatar`} />
          <h2>{candidate.name || 'No name available'}</h2>
          <p>Username: {candidate.login}</p>
          <p>Location: {candidate.location || 'N/A'}</p>
          <p>Email: {candidate.email || 'N/A'}</p>
          <p>Company: {candidate.company || 'N/A'}</p>
          <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
            View Profile
          </a>
          <div>
            <button onClick={saveCandidate}>+</button>
            <button onClick={showNextCandidate}>-</button>
          </div>
        </div>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default CandidateSearch;
