import React, { createContext, useState } from 'react';

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
  };

  return (
    <HistoryContext.Provider value={{ history, addToHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};
