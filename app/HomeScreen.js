import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View , TouchableOpacity, TextInput, Alert, Platform, Vibration } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import color from '../utils/color';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Clipboard from 'expo-clipboard';
import Torch from 'react-native-torch';
import { generateMorseVibration } from '../utils/vibrationSignal';
import { translateToMorse } from '../utils/morseUtils';


// const morseCode = {
//   'a': '.-',    'b': '-...',  'c': '-.-.',  'd': '-..',   'e': '.',
//   'f': '..-.',  'g': '--.',   'h': '....',  'i': '..',    'j': '.---',
//   'k': '-.-',   'l': '.-..',  'm': '--',    'n': '-.',    'o': '---',
//   'p': '.--.',  'q': '--.-',  'r': '.-.',   's': '...',   't': '-',
//   'u': '..-',   'v': '...-',  'w': '.--',   'x': '-..-',  'y': '-.--',
//   'z': '--..',  '1': '.----', '2': '..---', '3': '...--', '4': '....-', 
//   '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', 
//   '0': '-----', ' ': ' / '
// };

// const translateToMorse = (text) => {
//   return text
//     .toLowerCase()
//     .split('')
//     .map(letter => morseCode[letter] || letter) // Convert all caractere to morse
//     .join(' ');
// };


// const generateMorseVibration = (morse) => {
//     const vibrationPattern = [];

//     morse.split('').forEach(element => {
//           if(element === '.'){
//              vibrationPattern.push(200) 
//           }
//           else if(element === '-'){
//              vibrationPattern.push(400) 
//           }
//           else if(element ===''){
//              vibrationPattern.push(700) 
//           }
//     });

//     return vibrationPattern;
// }


export default function Home(props) {

  const [enterText, setEnterText] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isTorchOn, setIsTorchOn] = useState(false);
  
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

  //VIBRATION
  // const vibrate = (morseText) => {

  //   const vibrationPattern = generateMorseVibration(morseText)
  //     Vibration.vibrate(vibrationPattern);
  // } 
  

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
              onPress={toggleTorch}
            >
              <MaterialIcons name="flashlight-on" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.signalBottom}
              onPress={() => {
                const morseVibratiob = generateMorseVibration(morseText);
                Vibration.vibrate(morseVibratiob);
              }}
            >
              <MaterialIcons name="vibration" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.signalBottom}>
              <Ionicons name="volume-high" size={24} color="black" /> 
            </TouchableOpacity>
        </View>
        <View style={styles.historyContainer}>
          
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
    height: 90,
    paddingVertical: 15
  },
  resultText: {
    flex: 1,
    paddingHorizontal: 20,
    fontSize: 18
  },
  historyContainer: {
    backgroundColor: color.lightGrey,
    flex: 1,
    padding: 10
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
  }
});
