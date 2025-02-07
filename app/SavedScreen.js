import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Vibration } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { generateMorseSound } from '../utils/audioSignal';
import { generateMorseVibration } from '../utils/vibrationSignal';

export default function Saved() {
  const { favorites } = useFavorites();
  const { removeToFavorites } = useFavorites();

  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {favorites.map((item, index) => (
            <View key={index} style={styles.favoriteItem}>
              <View style={styles.textContainer}>
                <Text style={styles.textTitle}>Original:</Text>
                <Text style={styles.textContent}>{item.text}</Text>
                <Text style={styles.textTitle}>Morse:</Text>
                <Text style={styles.textContent}>{item.morse}</Text>
              </View>
              <View style={styles.signalContainer}>
                  <TouchableOpacity 
                    style={styles.signalButton}
                    onPress={() => {toggleTorch}}
                  >
                    <MaterialIcons name="flashlight-on" size={24} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.signalButton}
                    onPress={() => {
                      const morseVibratiob = generateMorseVibration(item.morse);
                      Vibration.vibrate(morseVibratiob);
                    }}
                  >
                    <MaterialIcons name="vibration" size={24} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.signalButton}
                    onPress={() => generateMorseSound(item.morse)}
                  >
                    <Ionicons name="volume-high" size={24} color="black" /> 
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => removeToFavorites(item)}
                  >
                    <MaterialIcons name="delete-forever" size={24} color="#FF3B30" />
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
    backgroundColor: '#f8f8f8', // Fond clair et moderne
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  favoriteItem: {
    backgroundColor: '#fff', // Fond blanc pour les éléments
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  textContainer: {
    marginBottom: 10,
  },
  textTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555', // Couleur douce pour le titre
    marginBottom: 5,
  },
  textContent: {
    fontSize: 16,
    color: '#333', // Texte sombre pour une meilleure lisibilité
    marginBottom: 12,
  },
  signalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  signalButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  deleteButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF3B30', // Rouge pour l'action de suppression
    shadowColor: '#FF3B30',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
});
