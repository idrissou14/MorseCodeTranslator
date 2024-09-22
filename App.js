import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import IconButton from './composants/IconButton';
import CodeButton from './composants/CodeButton';

export default function App() {


  const onDelete = () => {

  };
  const onAddPoint = () => {

  };
  const onAddDash = () => {

  };
  const onAddSlash = () => {
    // Add a forward slash
  } 

  return (
    <View style={styles.container}>
      <View style={styles.optionsContainer}>
        <View style={styles.optionsRow}>
            <IconButton icon="backspace" label="delete" />
            <CodeButton icon="circle" onPress={onAddPoint} />
            <CodeButton icon="dash" onPress={onAddDash} />
            <IconButton icon="backspace" label="delete" />
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: '#fff',
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  }
});
