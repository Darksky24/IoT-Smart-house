import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, StatusBar, Image, Pressable } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

export default class SettingScreen extends Component{
    constructor(props){
        super(props)
        navigate = props.navigation;
        this.state = {
            settings:[
                {
                    icon: require('../ICON/USER.png'),
                    screen: 'Profile Screen',
                    name: 'Profile',
                },
            ],
        };
    }

    render(){
        return <View style = {styles.container}>
            <StatusBar backgroundColor= '#f1f1f1' barStyle='light-content'/>
            <View style = {styles.User}>
                <Text style = {styles.title}>Settings</Text>
                <FlatGrid
                    style ={{flex: 1, marginTop: '10%'}}
                    itemDimension ={200}
                    data = {this.state.settings}
                    renderItem ={({item}) => (
                        <TouchableOpacity onPress={() => this.props.navigation.navigate(item.screen)} style = {styles.tab}>
                            <Image style ={{width: 50, height: 50, alignSelf: 'left',top: '20%', left: '5%'}} source={item.icon}/>
                            <Text style = {styles.tabText}>{item.name}</Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        alignItems: "center",
    },

    User:{
        flex: 1,
        margin: 20
    },

    title:{
        color: "#000",
        fontSize: 43,
        fontWeight: 'bold',
        textAlign: 'left',
        top: '3%',
        left: '3%'
    },

    tab:{
        backgroundColor: '#ffffff',
        height: 80,
        top: '15%',
        borderRadius: 13,
        elevation: 3,
    },
    tab1:{
        backgroundColor: '#ffffff',
        height: 100,
        top: '10%',
        borderRadius: 15,
        elevation: 3
    },
    tabText:{
        fontWeight: 'normal',
        fontFamily: 'Arial',
        fontSize: 31,
        //justifyContent: 'center',
        alignItems: 'center',
        left: '31%',
        top: '-31%',
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
