import { StyleSheet, Text, View } from 'react-native';



export default function Setting() {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Setting page</Text>
        
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
