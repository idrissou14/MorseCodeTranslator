import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import Home from './HomeScreen';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { HistoryContext } from '../context/HystoryContext';
import { useContext } from 'react';



export default function Setting() {

  const { clearHistory } = useContext(HistoryContext);

  const deteltHistory = () => {
    Alert.alert(
      'Confirmation',
      "Êtes-vous sûr de vouloir supprimer tout l'historique ?",
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Delete', onPress: clearHistory},
      ],
      {cancelable: true},
    );
  }
  
  return (
    <View style={styles.container}>
      
      <View style={styles.deteltHistoryContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={deteltHistory}>
          <Text style={styles.deleteButtonText}>Supprimer l'historique</Text>
          <MaterialIcons name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>

    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  deleteButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'darkred',
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 10
  }
});
