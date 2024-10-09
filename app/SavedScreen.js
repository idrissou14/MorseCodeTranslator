import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {useFavorites} from '../context/FavoritesContext';


export default function Saved() {
  const { favorites } = useFavorites();
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 10
  }
});
