import { useEffect, useState } from 'react';

export const useStarWarsCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const publicApiUrl = import.meta.env.VITE_PUBLIC_API_URL;

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await fetch(publicApiUrl); // замість axios
        const data = await res.json();
        setCharacters(data);
      } catch (err) {
        console.error('Failed to fetch characters:', err);
      }
    };

    fetchCharacters();
  }, [publicApiUrl]);

  return characters;
};
