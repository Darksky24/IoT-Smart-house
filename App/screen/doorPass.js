import React, { Component } from "react";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Platform } from "react-native";
import {SafeAreaView , Dimensions, View, StyleSheet, Text, TouchableOpacity, StatusBar, Image, Pressable } from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import { Button } from "react-native";
import {doc, collection, documentId, query, where, getDocs, updateDoc, getDoc } from "firebase/firestore";
import db from "../firebase/config";



const majorVersionIOS = parseInt(Platform.Version, 10);
if (majorVersionIOS <= 9) {
  console.log('Work around a change in behavior');
}

const feeds = ['tentoila24/feeds/doorpass'];
const topic = feeds[0];

const password = 'aio_usWu17O0FXcVE3lAletS2mcJS1I1';
// 'aio_EVNi18eQsuWTkmrRxnPTKC8ZV5KJ';
const mqttHost = 'io.adafruit.com';
var client;

function mqtt() {
  var clientID = "myclientid_" + new Date().getTime() + new Date();
  client = new Paho.MQTT.Client(mqttHost, 443, clientID);
  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  // connect the client
  client.connect({onSuccess:subscribe, useSSL: true, userName: 'tentoila24', password: password });
}

function subscribe() {
  if (client.isConnected())
  {
    client.subscribe(topic);
  }
  else
  {
    console.log('No connection');
  }
}
// called when the client connects
function onConnect(mess) {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  if (!client.isConnected())
  {
    console.log('No connection'); 
  }
  else
  {
    //client.subscribe(topic);  
    var message = new Paho.MQTT.Message(mess);
    message.destinationName = topic;
    message.retained = false;
    //client.publish(message);
    client.send(message);
  }
  
}
// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
    
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:" + message.payloadString);
  console.log(message.topic);
}

function passchange({text, number, number1}){
  getDoc(doc(db, "Devices", '1000')).then(docSnap => {
    console.log("Old pass: ", docSnap.data().Password)
    if (text == docSnap.data().Password && number1 == number)
    {
      if (number == text)
      {
        alert("This is your old Password, please change to a new one!")
      }
      else
      {
        updateDoc(doc(db, "Devices", '1000'), {
          Password: number
          })
          alert("Success!");
          console.log("new pass: ", number)
          onConnect(number)
      }
    }
    if (text != docSnap.data().Password )
    {
      alert("Your old Password is incorrect!")
    }
    if (number1 != number)
    {
      alert("Confirm your new Password again!")
    }
  })
}

const DoorPass = () => {
    const {height, width} = Dimensions.get('window');
    const [text, onChangeText] = React.useState("");
    const [number, onChangeNumber] = React.useState(null);
    const [number1, onChangeNumber2] = React.useState(null);

    mqtt();
    return(
    <View style = {styles.container}>
        <Image style ={{width: 50, height: 50, top: '5%', left: '2%'}} source={require('../ICON/arrow.png')}/>
        <Text style = {styles.text}>Door</Text>  
        <SafeAreaView style = {styles.tab}>

            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="Old Password"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="New Password"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeNumber2}
                value={number1}
                placeholder="Confirm Password"
                keyboardType="numeric"
            />

            <Button
              disabled = {!text, !number, !number1}
              style = {styles.button}
              title="Change Password"
              onPress={() =>{
                passchange({text, number, number1})
              }}
            />

        </SafeAreaView>

        <View style = {styles.navContainer}>
                <View style = {styles.navbar}>
                    <Pressable onPress={() => this.changeText('Home')} style={styles.IconBehave}>
                        <Image style ={{width: 50, height: 50, alignSelf: 'center', bottom: '-50%'}} source={require('../ICON/home.jpg')}/>
                    </Pressable>

                    <Pressable onPress={() => this.changeText('Settings')} style={styles.IconBehave}>
                        <Image style ={{width: 40, height: 40, right: '-78%', top: '-4%'}} source={require('../ICON/setting.png')}/>
                    </Pressable>

                    <Pressable onPress={() => this.changeText('Notification')} style={styles.IconBehave}>
                        <Image style ={{width: 50, height: 50, right: '-5%', top: '-55%'}} source={require('../ICON/BELL.jpg')}/>
                    </Pressable>
                </View>
        </View>
    </View>     
    )
    
}

export default DoorPass;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        
      },
  input: {
    height: 40,
    margin: 12,
    width: '100%',
    borderWidth: 1,
    padding: 10,
    width: '90%',
    left: 10,
    color: 'black'
  },
  tab:{
    top: '20%', 
  },
  navContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 30,
    width: '70%',
    height: 70,
    flex: 1
  },
  text:{
    color: "#000",
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    top: '-0.4%',
    left: '14%'
  },
  navbar:{
    backgroundColor: '#ffffff',
    width: '100%',
    justifyContent: 'space-evenly',
    borderRadius: 40, 
  },
  button:{
    color: '#32CD32',
    borderRadius: 20,
    shadowColor: '#32CD32'
  }
});


