import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
//import provider
import AuthProvider from './context/AuthContext';
//import DataProvider from './context/DataContext';
//import screen
import AlarmScreen from './screen/alarm';
import LoginScreen from './screen/login';
import SignupScreen from './screen/signup';
import Aircon from './screen/aircon';
import Door from './screen/door';
import DoorPass from './screen/doorPass';
import TempScreen from './screen/temp';
import HumidScreen from './screen/humid';
import Profile from './screen/profile';
import Home from './screen/home';
import SettingScreen from './screen/settings';
import LightScreen from './screen/light';
import NotificationsScreen from './screen/notification';
import Windows from './screen/windows';

const Stack = createStackNavigator();

export default function App()
{
    return (
        <NavigationContainer>
            <AuthProvider>
                {/* <DataProvider> */}
                <Stack.Navigator>
                    <Stack.Screen
                        name={'Login Screen'}
                        component={LoginScreen}
                        options={{ headerShown: false }}>
                    </Stack.Screen>
                    <Stack.Screen
                        name={'Home Screen'}
                        component={Home}
                        options={{ headerShown: false }}> 
                    </Stack.Screen>
                    <Stack.Screen
                        name={'Setting Screen'}
                        component={SettingScreen}
                        options={{ headerShown: false }}>
                    </Stack.Screen>
                    <Stack.Screen
                        name={'Profile Screen'}
                        component={Profile}
                        options={{ headerShown: false }}> 
                    </Stack.Screen>
                    <Stack.Screen
                        name={'Temp Screen'}
                        component={TempScreen}
                        options={{ headerShown: false }}>
                    </Stack.Screen>
                    <Stack.Screen
                        name={'Humid Screen'}
                        component={HumidScreen}
                        options={{ headerShown: false }}>
                    </Stack.Screen>
                    <Stack.Screen
                        name={'Notification Screen'}
                        component={NotificationsScreen}
                        options={{ headerShown: false }}>
                    </Stack.Screen>
                    <Stack.Screen
                        name={'Light Screen'}
                        component={LightScreen}
                        options={{ headerShown: false }}>
                    </Stack.Screen>
                    <Stack.Screen
                        name={'Alarm Screen'}
                        component={AlarmScreen}
                        options={{ headerShown: true }}>
                    </Stack.Screen>
                    <Stack.Screen
                        name={'Signup Screen'}
                        component={SignupScreen}
                        options={{ headerShown: false }}>
                    </Stack.Screen>
                    <Stack.Screen
                        name={'Aircon Screen'}
                        component={Aircon}
                        options={{ headerShown: false }}>
                    </Stack.Screen>
			  <Stack.Screen
                        name={'Windows Screen'}
                        component={Windows}
                        options={{ headerShown: false }}>
                    </Stack.Screen>
                    <Stack.Screen
                        name={'Door Screen'}
                        component={Door}
                        options={{ headerShown: false }}>
                    </Stack.Screen>
                    <Stack.Screen
                        name={'DoorPass Screen'}
                        component={DoorPass}
                        options={{ headerShown: false }}>
                    </Stack.Screen>
                </Stack.Navigator>
                {/* </DataProvider> */}
            </AuthProvider>  
        </NavigationContainer>   
    );
}