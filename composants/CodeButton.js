import { StyleSheet, Pressable, Text, View } from "react-native";
import MaterialIcon from '@expo/vector-icons/MaterialIcons';


export default function CodeButton({icon,onPress}){
    return(
        <View style={styles.codeButtonContainer}>
            <Pressable style={styles.codeButton} onPress={onPress}>
                <MaterialIcon name={icon} size={38} color="#25292e" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    codeButtonContainer: {
      width: 84,
      height: 84,
      marginHorizontal: 60,
      borderWidth: 4,
      borderColor: '#ffd33d',
      borderRadius: 42,
      padding: 3,
    },
    codeButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 42,
      backgroundColor: '#fff',
    },
  });