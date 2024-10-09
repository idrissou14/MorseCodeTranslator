import React, { createContext, useContext, useState } from 'react';
import Toast from 'react-native-toast-message';

// Créer un contexte pour gérer les favoris
const FavoritesContext = createContext();

// Un hook personnalisé pour accéder au contexte des favoris
export const useFavorites = () => useContext(FavoritesContext);


// Fournisseur pour englober les composants avec le contexte des favoris
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Fonction pour ajouter un élément aux favoris
  const addToFavorites = (item) => {
    const isFavorite = favorites.some(fav => fav.text === item.text);
  
    if (isFavorite) {
      // Affiche un Toast pour indiquer que l'élément est déjà dans les favoris
      Toast.show({
        type: 'info',
        text1: 'Info',
        text2: 'Item is already in favorites',
        visibilityTime: 2000,
      });
    } else {
      // Ajoute l'élément aux favoris et affiche un Toast de succès
      setFavorites([...favorites, item]);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Item added to favorites 👌',
        visibilityTime: 2000,
      });
    }
  };
  

  const removeToFavorites = (item) => {
    setFavorites(favorites.filter(favorite => favorite.text !== item.text));
    Toast.show({
      type: 'info',
      text1: 'Removed',
      text2: 'Item removed from favorites 👍',
      visibilityTime: 2000,
      // autoHide: true,
      // topOffset: 100,
      // bottomOffset: 0,
    });
  };
  

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeToFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
