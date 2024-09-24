import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';





export default function Home(props) {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Morse Code Translator</Text>
        <Button title='click Me' onPress={() => {
            props.navigation.navigate("Settings")
        }} />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
