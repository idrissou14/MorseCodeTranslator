import { StyleSheet, Pressable, Text } from "react-native";
import MaterialIcon from '@expo/vector-icons/MaterialIcons';

export default function IconButton({ icon, label, onPress }){
    return(
        <Pressable style={styles.iconButton} onPress={onPress}>
            <MaterialIcon name={icon} size={28} color="#333" />
            <Text style={styles.label}>{label}</Text>
        </Pressable>
    );
}


const styles = StyleSheet.create({
    iconButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        color: '#fff',
        marginTop: 12,
    }
})