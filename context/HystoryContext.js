import React, { createContext, useState } from 'react';
import Toast from 'react-native-toast-message';

// Créer le contexte
export const HistoryContext = createContext();

// Fournir le contexte
export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  // Fonction pour ajouter une nouvelle entrée à l'historique
  const addToHistory = (text, morse) => {
    setHistory(prevHistory => [
      ...prevHistory,
      { text, morse }
    ]);
  };

  // Fonction pour supprimer tout l'historique
  const clearHistory = () => {
    setHistory([]);
    Toast.show({
      type: 'success',
      text1: 'Historique supprimé avec succès',
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 100,
      bottomOffset: 0,
    });
  };

  return (
    <HistoryContext.Provider value={{ history, addToHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};
