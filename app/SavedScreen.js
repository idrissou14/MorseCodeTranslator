import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Vibration } from 'react-native';
import {useFavorites} from '../context/FavoritesContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { generateMorseSound } from '../utils/audioSignal';
import { generateMorseVibration } from '../utils/vibrationSignal';


export default function Saved() {
  const { favorites } = useFavorites();
  const { removeToFavorites } = useFavorites();

  return (
    <View style={styles.container}>
        <ScrollView>
          {favorites.map((item, index) => (
            <View key={index} style={styles.favoriteItem}>
              <View>
                <Text>Original: {item.text}</Text>
                <Text>Morse: {item.morse}</Text>
              </View>
              <View style={styles.signalContainer}>
                  <TouchableOpacity 
                    style={styles.signalBottom}
                    onPress={() => {toggleTorch}}
                  >
                    <MaterialIcons name="flashlight-on" size={24} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.signalBottom}
                    onPress={() => {
                      const morseVibratiob = generateMorseVibration(item.morse);
                      Vibration.vibrate(morseVibratiob);
                    }}
                  >
                    <MaterialIcons name="vibration" size={24} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.signalBottom}
                    onPress={() => generateMorseSound(item.morse)}
                  >
                    <Ionicons name="volume-high" size={24} color="black" /> 
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress = {() => removeToFavorites(item)}
                  >
                    <MaterialIcons name="delete-forever" size={24} color="red" />
                  </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dedede',
  },
  favoriteItem: {
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    height: 70,
    paddingHorizontal: 20,
    marginTop: 2
  },
  signalContainer: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  }
});
