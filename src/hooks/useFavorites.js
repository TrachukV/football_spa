import { useEffect, useState } from 'react';

const KEY = 'fav-matches';

export function useFavorites() {         
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    setStatus('loading');
    try {
      const raw = localStorage.getItem(KEY);
      setItems(raw ? JSON.parse(raw) : []);
      setStatus('success');
    } catch {
      setItems([]);
      setStatus('error');
    }
  }, []);

  function save(newItems) {
    setItems(newItems);
    localStorage.setItem(KEY, JSON.stringify(newItems));
  }

  function add(match) {
    if (!match?.title) return;
    if (items.some(x => x.title === match.title)) return;
    save([...items, match]);
  }

  function remove(title) {
    save(items.filter(x => x.title !== title));
  }

  return { items, status, add, remove };
}
