import React, { Component, useEffect, useState } from 'react';
import {View, StyleSheet, Text, TouchableOpacity, StatusBar, Image, Pressable } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import {doc, collection, documentId, query, where, getDocs, updateDoc, getDoc } from "firebase/firestore";
// import firestore from '@react-native-firebase/firestore';
import db from "../firebase/config";
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
// import { useEffect } from 'react';
import init from 'react_native_mqtt';
import {AsyncStorage} from '@react-native-async-storage/async-storage';

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {},
});

//MQTT
const feeds = ['tentoila24/feeds/dooropen'];
const topic = feeds[0];

const password = //'aio_pClT87yWsrJnd3xm44PMuFeinhew';
'aio_usWu17O0FXcVE3lAletS2mcJS1I1';
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
  client.connect({ useSSL: true, userName: 'tentoila24', password: password });
}

function subscribe(topics) {
  if (client.isConnected())
  {
    for (let topic in topics)
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
    var message = new Paho.MQTT.Message(mess.toString());
    message.destinationName = topic;
    message.retained = false;
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



function clickClosed()
    {
      getDoc(doc(db, "Devices", '1000')).then(docSnap => {
        if (docSnap.exists()) {
          if (docSnap.data().isActive == false)
          {
            updateDoc(doc(db, "Devices", '1000'), {
              isActive: true,
              Current_Status: "Closed"
            })
            onConnect(1)
          }
        } else {
          console.log("No such document!");
        }
        
      })
    }

function clickOpen()
    {
      getDoc(doc(db, "Devices", '1000')).then(docSnap => {
        if (docSnap.exists()) {
          if (docSnap.data().isActive == true)
          {
            updateDoc(doc(db, "Devices", '1000'), {
              isActive: false,
              Current_Status: "Open"
            })
            onConnect(0)
          }
        } else {
          console.log("No such document!");
        }
        
      })
    }    
  
class Door extends Component{
  
    constructor(props){
      super(props)
      
      this.state = {
          devices:[
              {
                type: 'ALARM',
              },
          ],
          password:[
            {
                type: 'CHANGE PASSWORD',
                name: 'DoorPass'
              },
          ],
          // text: 'Lock',
          // text1: 'Unlock'
      };
      
    }

  

    //ADAFRUIT
    render(){
      mqtt();
      return <View style = {styles.container}>
        <StatusBar backgroundColor= '#f1f1f1' barStyle='light-content'/>
        
        <View style = {styles.User}>
            <Image style ={{width: 50, height: 50, top: '5%', left: '-2%'}} source={require('../ICON/arrow.png')}/>
            <Text style = {styles.text}>Menu</Text>
            <TouchableOpacity onPress={() => {clickClosed();}} activeOpacity={0.5} style={styles.IconBehave}>
                        <Image style ={{width: 50, height: 50, left: '30%', top: 4}} source={require('../ICON/lock.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {clickOpen();}} >
                        <Image style ={{width: 50, height: 50, right: '-60%', top: -60}} source={require('../ICON/unlock.png')}/>
                    </TouchableOpacity>
            <FlatGrid
                style ={{flex: 1}}
                itemDimension ={300}
                data = {this.state.password}
                renderItem ={({item}) => (
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('DoorPass Screen')} style = {styles.tab1}>
                      
                      <Text style = {styles.tabText}>{item.type}</Text>
                      
                  </TouchableOpacity>
                  )}
                
                
            />
        </View>
        <View style = {styles.navContainer}>
                <View style = {styles.navbar}>
                    <Pressable onPress={() => this.changeText('Home')} style={styles.IconBehave}>
                        <Image style ={{width: 50, height: 50, alignSelf: 'center', bottom: '-65%'}} source={require('../ICON/home.jpg')}/>
                    </Pressable>

                    <Pressable onPress={() => this.changeText('Settings')} style={styles.IconBehave}>
                        <Image style ={{width: 40, height: 40, right: '-78%', top: '0%'}} source={require('../ICON/setting.png')}/>
                    </Pressable>

                    <Pressable onPress={() => this.changeText('Notification')} style={styles.IconBehave}>
                        <Image style ={{width: 50, height: 50, right: '-5%', top: '-70%'}} source={require('../ICON/BELL.jpg')}/>
                    </Pressable>
                </View>
        </View>
      </View>
    }
}

export default Door;




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    
  },
  User:{
    flex: 1,
    margin: 20
  },

  text:{
    color: "#000",
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    top: '-0.7%',
    left: '12%'
  },
  tab:{
    backgroundColor: '#ffffff', 
    height: 80, 
    top: '250%', 
    borderRadius: 15, 
    elevation: 3
  },
  tab1:{
    backgroundColor: '#ffffff', 
    height: 72, 
    top: '12%', 
    borderRadius: 15, 
    elevation: 3
  },
  tabText:{
    fontWeight: 'bold',
    fontFamily: 'Arial',
    fontSize: 18,
    textAlign: 'center',
    alignItems: 'flex-end',
    top: 25,
  },

  tabText1:{
    fontWeight: 'bold',
    fontFamily: 'Arial',
    fontSize: 18,
    textAlign: 'left',
    alignItems: 'flex-end',
    top: 25,
    left: 85

  },

  status:{
    position: 'absolute',
    alignSelf: 'center',
    bottom: 30,
    width: '50%',
    height: 70
  },

  statusBar:{
    backgroundColor: '#ffffff',
    width: '100%',
    top: -400,
    justifyContent: 'space-evenly',
    borderRadius: 40, 
    zIndex: -1
  },

  navContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 30,
    width: '70%',
    height: 70
  },

  navbar:{
    backgroundColor: '#ffffff',
    width: '100%',
    justifyContent: 'space-evenly',
    borderRadius: 40, 
  },

  IconBehave:{
    padding: 14,
    alignContent: 'center'
  }
  
});
