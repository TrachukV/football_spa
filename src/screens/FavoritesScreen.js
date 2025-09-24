import React from 'react';
import { useFavorites } from '../hooks/UseFavorites';
import FavoriteMatchCard from '../components/FavoriteMatchCard';

export default function FavoritesScreen() {
  const { items, status, remove } = useFavorites();

  if (status === 'loading') return <p style={{ textAlign: 'center' }}>Loading favorites...</p>;
  if (status === 'error')   return <p style={{ textAlign: 'center', color: 'red' }}>Error loading favorites.</p>;
  if (items.length === 0)   return <p style={{ textAlign: 'center' }}>You have no favorite matches yet.</p>;

  return (
    <div className="container">
  
      <div className="match-list">
        {items.map(match => (
          <FavoriteMatchCard key={match.title} match={match} onRemove={remove} />
        ))}
      </div>
    </div>
  );
}