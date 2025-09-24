import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useFavorites } from '../hooks/UseFavorites';


const MatchScreen = () => {
  const location = useLocation();
  const { id } = useParams();
  const [match, setMatch] = useState(location.state?.match);
  const [loading, setLoading] = useState(!match);
  const [error, setError] = useState(null);

  const { items: favorites, add, remove } = useFavorites();
  const isFavorite = favorites.some(fav => fav.title === match?.title);

  useEffect(() => {
    if (!match) {
      setLoading(true);
      const fetchAllMatchesAndFind = async () => {
        try {
          const response = await fetch('https://www.scorebat.com/video-api/v3/');
          if (!response.ok) throw new Error('Network response was not ok.');
          const allMatches = await response.json();
          
          const today = new Date().toISOString().slice(0, 10);
          const todaysMatches = allMatches.filter(m => m.date.startsWith(today));

          const foundMatch = todaysMatches[id];

          if (foundMatch) {
            setMatch(foundMatch);
          } else {
            setError('Match not found. The link may be outdated or invalid.');
          }
        } catch (e) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      };
      
      if (id && !isNaN(id)) {
        fetchAllMatchesAndFind();
      } else {
        setError('Match data not available. Please navigate from the main list or your favorites.');
        setLoading(false);
      }
    }
  }, [id, match]);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      remove(match.title);
    } else {
      add(match);
    }
  };

  if (loading) return <p style={{ textAlign: 'center' }}>Loading match details...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red' }}>Error: {error}</p>;
  if (!match) return <p style={{ textAlign: 'center' }}>Match not found.</p>;

  const [homeTeam, awayTeam] = match.title.split(' - ');
  const formattedDate = new Date(match.date).toLocaleString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div style={{ width: '70%', margin: '0 auto', textAlign: 'center' }}>
      <h3>{match.competition}</h3>
      <h2>{homeTeam} vs {awayTeam}</h2>
      <p>{formattedDate}</p>
      
      <button onClick={handleToggleFavorite} className="favorite-toggle-button">
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>

      <div 
        style={{ marginTop: '20px' }}
        dangerouslySetInnerHTML={{ __html: match.videos[0].embed }} 
      />
    </div>
  );
};

export default MatchScreen;