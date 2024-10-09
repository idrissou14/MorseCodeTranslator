import { StyleSheet, Text, View , TouchableOpacity, TextInput, Vibration, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState, useEffect, useContext } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import color from '../utils/color';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Clipboard from 'expo-clipboard';
import Torch from 'react-native-torch';
import { generateMorseVibration } from '../utils/vibrationSignal';
import { translateToMorse } from '../utils/morseUtils';
import { generateMorseSound } from '../utils/audioSignal';
import { HistoryContext } from '../context/HystoryContext';
import {useFavorites} from '../context/FavoritesContext';



export default function Home(props) {

  const [enterText, setEnterText] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isTorchOn, setIsTorchOn] = useState(false);
  const {history, addToHistory} = useContext(HistoryContext);
  const {addToFavorites} = useFavorites()
  
  const morseText = translateToMorse(enterText);

  // Fonction to copy result of translation
  const copyToClipboard = async () => {
    if (morseText) {
      setIsCopied(true); 
      await Clipboard.setStringAsync(morseText); // Copy morse text
      setTimeout(() => setIsCopied(false), 1000); // Réinitialize after 1 second
      
    }
  };

      //Torch
  const toggleTorch = async () => {
   Torch.switchState(!isTorchOn);
   setIsTorchOn(!isTorchOn);
      //After
  }

  // const addToHistory = (text, morse) => {
  //   if (text.trim() !== "") {
  //     setHistory((prevHistory) => [{ text, morse }, ...prevHistory]);
  //   }
  // };

  // useEffect(() => {
  //   if (enterText.trim()) {
  //     addToHistory(enterText, morseText);  // Ajouter automatiquement à chaque changement de texte
  //   }
  // }, [morseText]); 

   // Fonction pour ajouter la traduction à l'historique
  //  const addToHistory = () => {
  //   if (enterText && morseText) {
  //     setHistory(prevHistory => [
  //       ...prevHistory,
  //       { text: enterText, morse: morseText }
  //     ]); // Ajoute la nouvelle traduction à l'historique
  //   }
  // };
  

  return (
    <View style={styles.container}>
        <View style={styles.languageContainer}>
          <TouchableOpacity style={styles.languageOption} onPress={() => console.log('Pressed')} >
            <Text>Language</Text>
          </TouchableOpacity>

          <View style={styles.arrowContainer}>
            <AntDesign name="arrowright" size={24} color="#dedede" />
          </View>

          <TouchableOpacity style={styles.languageOption} onPress={() => console.log('Pressed')}>
            <Text>Morse</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput                
            multiline
            placeholder='Enter your text'
            style={styles.textInput}
            onChangeText={(text) => setEnterText(text)} //get the user text
          />

        </View>
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{morseText}</Text>
          <TouchableOpacity style={styles.translateButton}    //copy touchable
            disabled={enterText === ""}                       
           onPress={copyToClipboard}>
           <Ionicons name="copy-outline" size={24} color={isCopied ? color.copyColor : color.textColor } />
          </TouchableOpacity>
        </View>
        
        {/* signale */}

        <View style={styles.signalContainer}>
            <TouchableOpacity 
              style={styles.signalBottom}
              onPress={() => {toggleTorch,  addToHistory(enterText, morseText)}}
            >
              <MaterialIcons name="flashlight-on" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.signalBottom}
              onPress={() => {
                const morseVibratiob = generateMorseVibration(morseText);
                Vibration.vibrate(morseVibratiob);
                addToHistory(enterText, morseText)
              }}
            >
              <MaterialIcons name="vibration" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.signalBottom}
              onPress={() => {generateMorseSound(morseText),addToHistory(enterText, morseText)}}
            >
              <Ionicons name="volume-high" size={24} color="black" /> 
            </TouchableOpacity>
        </View>

        <View style={styles.historyContainer}>
          <ScrollView>
            {history.map((item, index) => (
              <View key={index} style={styles.historyItem}>
                <View style={styles.historyText}>
                  <Text>Original: {item.text}</Text>
                  <Text>Morse: {item.morse}</Text>
                </View>
                <View style={styles.historyBottom}>
                  <TouchableOpacity style={styles.favoryButton} onPress={() => addToFavorites(item)}>
                    <AntDesign name="staro" size={20} color="blue" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  languageContainer: {
    flexDirection: 'row',
    borderBottomColor: '#dedede',
    borderBottomWidth: 1
  },
  languageOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15
  },
  arrowContainer: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    borderBottomColor: '#dedede',
    borderBottomWidth: 1
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 18,
    height: 90
  },
  translateButton: {
    paddingHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
  resultContainer: {
    flexDirection: 'row',
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
    height: 120,
    paddingVertical: 15
  },
  resultText: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 25,
  },
  historyContainer: {
    backgroundColor: color.lightGrey,
    flex: 1,
    padding: 2,
    paddingBottom: 0
  },
  signalContainer: {
    flexDirection: 'row',
    borderBottomColor: '#dedede',
    borderBottomWidth: 1
  },
  signalBottom: {
    paddingHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5
  },
});
