import React, { createContext, useState, useContext } from 'react';
import Toast from 'react-native-toast-message';
import Torch from 'react-native-torch';

// Créer un contexte
const TorchContext = createContext();

export const useTorch = () => {
  return useContext(TorchContext);
};

// Fournisseur de contexte
export const TorchProvider = ({ children }) => {
  const [torchOn, setTorchOn] = useState(false);

  const toggleTorch = async () => {
    try {
      setTorchOn(!torchOn);
      Torch.switchState(!torchOn);

      // Afficher un toast en cas de succès
      Toast.show({
        type: 'info',
        text1: 'Torch toggled!',
        text2: torchOn ? "Torch turned off" : "Torch turned on",
        visibilityTime: 2000,
      });
    } catch (error) {
      // Si une fonctionnalité est en développement, afficher un autre toast
      Toast.show({
        type: 'info',
        text1: 'Coming Soon! 🎉',
        text2: "Hang tight, this feature is on its way! 🚀",
        visibilityTime: 2000,
      });
    }
  };

  return (
    <TorchContext.Provider value={{ torchOn, toggleTorch }}>
      {children}
    </TorchContext.Provider>
  );
};
