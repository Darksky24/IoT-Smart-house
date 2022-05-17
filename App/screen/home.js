import React, { Component, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, StatusBar, Image, Pressable } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { useAuth } from "../context/AuthContext";



async function getName(uid) {
  const [name, setName] = useState(name);
  await getDoc(doc(db, "User", uid)).then(docSnap => {
    if (docSnap.exists()) {
      console.log(docSnap.data().name);
      setName(docSnap.data().name);
    } else {
      console.log("No such document!");
    }
  })
}

class Home extends Component{
    constructor(props){
      super(props)
      navigate = props.navigation;
      
      this.state = {
          devices:[
               {
                 type: 'Temperature',
                 icon: require('../ICON/thermometer.png'),
                 name: 'Temp Screen',
               },
               {
                 type: 'Humid',
                 name: 'Humid Screen',
                 icon: require('../ICON/humidity.png'),
               },
              {
                icon: require('../ICON/aircon.png'),
                name: 'Aircon Screen'
              },
              {
                icon: require('../ICON/Curtain.png'),
                name: 'Light Screen'
              },
              {
                icon: require('../ICON/Windows.png'),
		            name: 'Windows Screen'
              },
              {
                icon: require('../ICON/door.png'),
                name: 'Door Screen' 
              },
          ],
          status:[
              {
                type: 'Temperature'
              },
              {
                type: 'Light'
              }
          ],
          
      };
    }
    render(){ 
      return <View style = {styles.container}>
        <StatusBar backgroundColor= '#f1f1f1' barStyle='light-content'/>
        <View style = {styles.User}>
            <TouchableOpacity 
              onPress={() => this.props.navigation.navigate('Profile Screen')}
              style={{top: '5%', left: '5%'}}
              >
              <Image style ={{width: 60, height: 60}} source={require('../ICON/USER.png')}/>
            </TouchableOpacity>
            <Text style = {styles.text}>Hello User</Text>
            <FlatGrid
                style ={{flex: 1, marginTop: '10%'}}
                itemDimension ={120}
                data = {this.state.devices}
                renderItem ={({item}) => (
                    <TouchableOpacity onPress={() => this.props.navigation.navigate(item.name)} style = {styles.tab}>
                        <Image style ={{width: 50, height: 50, alignSelf: 'center', top: '25%'}} source={item.icon}/>
                        <Text style = {styles.tabText}>{item.connect}</Text>
                    </TouchableOpacity>                
                )}
            />
        </View>
        <View style = {styles.navContainer}>
                <View style = {styles.navbar}>
                    <Pressable onPress={() => this.props.navigation.navigate('Home Screen')} style={styles.IconBehave}>
                        <Image style ={{width: 50, height: 50, alignSelf: 'center', bottom: '-65%'}} source={require('../ICON/home.jpg')}/>
                    </Pressable>

                    <Pressable onPress={() => this.props.navigation.navigate('Setting Screen')} style={styles.IconBehave}>
                        <Image style ={{width: 40, height: 40, right: '-78%', top: '0%'}} source={require('../ICON/setting.png')}/>
                    </Pressable>

                    <Pressable onPress={()=>{this.props.navigation.navigate('Notification Screen')}} style={styles.IconBehave}>
                        <Image style ={{width: 50, height: 50, right: '-5%', top: '-70%'}} source={require('../ICON/BELL.jpg')}/>
                    </Pressable>
                </View>
        </View>
      </View>
    }
}

function jump({navigation}){
  return(
    navigate('Door Screen', {screen: 'Door'})   
  )
}

export default Home;

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
    textAlign: 'right',
    top: '-1.5%',
    right: '5%'
  },
  tab:{
    backgroundColor: '#ffffff', 
    height: 130, 
    top: '15%', 
    borderRadius: 15, 
    elevation: 3
  },
  tab1:{
    backgroundColor: '#ffffff', 
    height: 100, 
    top: '10%', 
    borderRadius: 15, 
    elevation: 3
  },
  tabText:{
    fontWeight: 'bold',
    fontFamily: 'Arial',
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'flex-end'
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
    padding: 14
  }
  
});
