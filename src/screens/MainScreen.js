import React, { useState, useEffect } from 'react';
import MatchCard from '../components/MatchCard';

const MainScreen = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('https://www.scorebat.com/video-api/v3/');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        const allMatches = data.response || [];
        const sorted = allMatches.sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        });

        setMatches(sorted);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

if (loading) {
  return <div className="loader"></div>;
}
  if (error) return <div className="container"><p>Error fetching matches: {error}</p></div>;
  if (matches.length === 0) return <div className="container"><p>No matches found.</p></div>;

  return (
    <div className="container">
      <div className="match-list">
        {matches.map((match, index) => (
          <MatchCard key={index} match={match} id={index} />
        ))}
      </div>
    </div>
  );
};

export default MainScreen;
