import React, { createContext, useContext, useState } from 'react';

// Créer un contexte pour gérer les favoris
const FavoritesContext = createContext();

// Un hook personnalisé pour accéder au contexte des favoris
export const useFavorites = () => useContext(FavoritesContext);

// Fournisseur pour englober les composants avec le contexte des favoris
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Fonction pour ajouter un élément aux favoris
  const addToFavorites = (item) => {
    setFavorites([...favorites, item]);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
