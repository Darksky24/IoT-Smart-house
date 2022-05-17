import React, { useState, useEffect } from "react"; 
import { StyleSheet, Text, View, Button, TextInput, TouchableOpauser, Image, Switch, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { onSnapshot, doc, setDoc, collection, getDocs, getDoc, addDoc } from "firebase/firestore";
import { converter } from '../firebase/custom_object';
import db from '../firebase/config';



export default function AlarmScreen({navigation})
{
  //fetch data
  const [user, setUser] = useState(null);
  getDoc(doc(db, "Users", 'JU5vmoFw8LU8ta5ZxOmQ')).then(docSnap => {
    if (docSnap.exists()) {
      setUser(docSnap.data());
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  })
  
  //update data
  return (
    <View>
      <Text>Abc</Text>
        <FlatList 
          data = {user}
          keyExtractor = {(item, index) => {return index.toString()}}
          renderItem = {({ item }) => {
            <View style= {styles.container}> 
              <Text>{user}</Text>
            </View>
          }}
        />
    </View>
  )
}

styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    height: 80, 
    width: 80,
    color: 'white',
  }
})