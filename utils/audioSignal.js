import { Vibration } from 'react-native';
import { Audio } from 'expo-av';

// Durées en millisecondes pour les signaux et pauses
const SHORT_BEEP = 200; // Durée du son court (point)
const LONG_BEEP = 600;  // Durée du son long (tiret)
const PAUSE_BETWEEN_SIGNALS = 200; // Pause entre les points ou tirets
const PAUSE_BETWEEN_WORDS = 1400;  // Pause longue entre les mots

// Charger les sons pour le point et le tiret
const playDotSound = async () => {
  const { sound } = await Audio.Sound.createAsync(require('../assets/audio/Short.mp3'));
  await sound.playAsync();
  setTimeout(() => sound.unloadAsync(), SHORT_BEEP); // Libérer le son après lecture
};

const playDashSound = async () => {
  const { sound } = await Audio.Sound.createAsync(require('../assets/audio/Long.mp3'));
  await sound.playAsync();
  setTimeout(() => sound.unloadAsync(), LONG_BEEP); // Libérer le son après lecture
};

// Fonction pour jouer le son en fonction du texte en code Morse
const generateMorseSound = async (morseText) => {
  for (let symbol of morseText.split('')) {
    if (symbol === '.') {
      await playDotSound();               // Joue un son court pour un point
      await new Promise(resolve => setTimeout(resolve, PAUSE_BETWEEN_SIGNALS));
    } else if (symbol === '-') {
      await playDashSound();              // Joue un son long pour un tiret
      await new Promise(resolve => setTimeout(resolve, PAUSE_BETWEEN_SIGNALS));
    } else if (symbol === ' ') {
      await new Promise(resolve => setTimeout(resolve, PAUSE_BETWEEN_WORDS));
    }
  }
};


export { generateMorseSound } ;