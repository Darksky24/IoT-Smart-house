import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome';
import {Ionicons} from '@expo/vector-icons';

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );


const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [name, setName] = useState();
  const [secure, setSecure] = useState(true);
  const { signup, error, setError } = useAuth();
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    try {
        setLoading(true)
        await signup(email, password, name)
    } catch (e) {
        // setError('Invalid email or password')
        console.log('Login error:', e.message);
    }
    setLoading(false)
  }
  return (
    <View style={styles.screenContainer}>
        <TextInput 
          style={{padding: 12, paddingVertical: 10, paddingHorizontal: 12, backgroundColor: 'white', borderRadius: 7, margin: 10}}
          placeholder='Your name'
          onChangeText={ text => setName(text)}>
        </TextInput>
        <TextInput 
          style={{padding: 12, paddingVertical: 10, paddingHorizontal: 12, backgroundColor: 'white', borderRadius: 7, margin: 10}}
          placeholder='Email'
          onChangeText={ text => setEmail(text)}
          keyboardType='email-address'>
        </TextInput>
        <View style={styles.passwordContainter}>
          <TextInput 
            placeholder='Password'
            secureTextEntry={secure}
            onChangeText={ text => setPassword(text) }>
          </TextInput>
          <Ionicons
            onPress={() => setSecure(!secure)}
            name={secure ? 'eye-off-outline' : 'eye-outline'} 
            size={20}
            style={{alignSelf: 'center'}}
          />
        </View>
        <View style={styles.passwordContainter}>
          <TextInput 
            placeholder='Confirm Password'
            secureTextEntry={secure}
            onChangeText={ text => setConfirm(text) }>
          </TextInput>
          <Ionicons
            onPress={() => setSecure(!secure)}
            name={secure ? 'eye-off-outline' : 'eye-outline'} 
            size={20}
            style={{alignSelf: 'center'}}
          />
        </View>
      <AppButton 
        title="Sign up" 
        onPress={handleClick}/>
      <View style={{ flexDirection: 'row'}}>
				<Text style = {{ marginLeft: 7, marginTop: 5 }}>Already have an acount?</Text>
        <Text 
          onPress={() => {
            setError()
            navigation.navigate('Login Screen')}
          }
          style={{color: 'gray', fontWeight: 'bold', marginTop: 5, marginLeft: 5}}> 
          Login here
        </Text>
			</View>

    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 80,
    //backgroundColor: "#555",
  },
  appButtonText: {
    fontSize: 17,
    alignSelf: 'center',
    fontWeight: "bold",
    color: 'white'
  },
  appButtonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#009688",
    borderRadius: 10,
    padding: 12,
    margin: 10,
  },
  passwordContainter: {
    flexDirection: 'row', 
    padding: 12, 
    paddingVertical: 10, 
    paddingHorizontal: 12, 
    backgroundColor: 'white', 
    borderRadius: 7, 
    margin: 10,
    justifyContent: 'space-between',
  }
});

export default SignupScreen;