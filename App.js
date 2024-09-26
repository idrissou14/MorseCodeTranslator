import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import {  StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './app/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SavedScreen from './app/SavedScreen';
import SettingsScreen from './app/SettingsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';


const tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <tab.Navigator screenOptions={{ headerShown: false }}>
      <tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home',
         tabBarIcon: ({ color }) => (
          <MaterialIcon name="home" size={26} color="#1863EC" />
        ),
       }} />
      <tab.Screen name="Saved" component={SavedScreen} options={{ tabBarLabel: 'Saved',
        tabBarIcon: ({ color }) => (
          <MaterialIcon name="star" size={26} color="#1863EC" />
        ),
       }} />
       <tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarLabel: 'Setting',
        tabBarIcon: ({ color }) => (
          <MaterialIcon name="settings" size={26} color="#1863EC" />
        ),
       }} />
    </tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" 
        screenOptions={{ headerStyle: {backgroundColor: "#1863EC" }, headerTitleStyle:{color: "#fff"}, headerTitleAlign: 'center' }}
      >
        <Stack.Screen name="Home" component={TabNavigator} options={{ headerTitle: 'Translator' }} />
      </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
