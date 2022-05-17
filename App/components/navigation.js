import * as React from 'react';
import { Text, View, StyleSheet, Image , Button, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { shadowOffset } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import HomeScreen from '../screen/home';
import SettingsScreen from '../screen/settings';
import NotificationsScreen from '../screen/notification';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
      <Tab.Navigator
        style={{
          position: 'absolute',
          borderWidth: 3,
          borderColor: 'black',
          elevation: 0,
          backgroundColor: 'white',
          borderRadius: 15,
          height: 90,
          width: 90,
          ...styles.shadow,
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home-outline';
            } 
            else if (route.name === 'Settings') {
              iconName = 'settings-outline';
            }
            else if (route.name === 'Notifications') {
              iconName = 'notifications-outline'
            } 

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelPosition: 'below-icon',
        })}
      >
        <Tab.Screen name="Settings" component={SettingsScreen}/>
        <Tab.Screen name="Home" component={HomeScreen} options= {{
          tabBarButton: props => <TouchableOpacity style={{
            backgroundColor: "#009688",
            borderRadius: 10,
            alignItems: 'center',
            width: 20,
            height: 20,
          }}
          {...props} />
        }}/>  
        <Tab.Screen name='Notifications' component={NotificationsScreen} options= {{
          tabBarBadge: 1,
        }} />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  },
  iconStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 10
  },
})
