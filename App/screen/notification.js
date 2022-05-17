import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    StatusBar,
    Image,
    Pressable,
    Alert,
    TextInput,
    Button,
    SafeAreaView, TouchableOpacityComponent, FlatList
} from 'react-native';

export default class NotificationsScreen extends Component{
    constructor(props){
        super(props)

        this.state = {
            notifications: [
                {
                    id: '1',
                    title: 'Notification 1',
                    time: '01/01',
                    content: 'This is noti 1.',
                },
                {
                    id: '2',
                    title: 'Notification 2',
                    time: '02/02',
                    content: 'This is noti 2.',
                },
                {
                    id: '3',
                    title: 'Notification 3',
                    time: '03/03',
                    content: 'This is noti 3.'
                },
                {
                    id: '4',
                    title: 'Notification 4',
                    time: '04/04',
                    content: 'This is noti 4.'
                },
                {
                    id: '5',
                    title: 'Notification 5',
                    time: '05/05',
                    content: 'This is noti 5.'
                },
                {
                    id: '6',
                    title: 'Notification 6',
                    time: '06/06',
                    content: 'This is noti 6.'
                },
                {
                    id: '7',
                    title: 'Notification 7',
                    time: '07/07',
                    content: 'This is noti 7.'
                },
            ]
        };
    }

    render(){
        return <View style = {styles.container}>
            <StatusBar backgroundColor= '#f1f1f1' barStyle='light-content'/>
            <View>
                <Text style = {styles.title}>Notifications</Text>
                <View style={styles.separator}/>
                <View style = {styles.scroll}>
                    <FlatList
                        style = {{flex: 1}}
                        itemDimension = {200}
                        data = {this.state.notifications}
                        keyExtractor = {(item, index) => {return index.toString()}}
                        renderItem = {({ item }) => {
                            return (
                                <View style = {styles.notiContainer}>
                                    <Text style = {styles.notiTitle}> {item.id}. {item.title} </Text>
                                    <Text style={{color:'gray', top: '-20%', right: '-80%'}}> {item.time} </Text>
                                    <Text style = {styles.notiContent}> {item.content} </Text>
                                </View>
                            )
                        }}
                    />
                </View>
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

const styles = StyleSheet.create({
    /*container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        //alignItems: "center",
        width: '100%',
        height: '100%',
        padding: 15,
    },*/
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        alignItems: "center",
    },

    scroll:{
        flex: 1,
        width: '100%',
        height: '100%',
        padding: 10,
        flexDirection: 'row',
    },


    notiContainer:{
        flex: 1,
        padding: 3,
        backgroundColor: '#ffffff',
        height: 80,
        width: 300,
        //top: '15%',
        borderRadius: 7,
        elevation: 3,
        marginVertical: 7,
    },

    notiTitle:{
        fontWeight: 'normal',
        fontFamily: 'Arial',
        fontSize: 24,
        alignItems: 'center',
        left: '3%',
        top: '10%',
    },

    notiContent:{
        fontWeight: 'normal',
        fontFamily: 'Arial',
        fontSize: 18,
        alignItems: 'center',
        left: '14%',
        top: '10%',
    },

    separator: {
        marginTop: 50,
        marginBottom: 10,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },

    title:{
        color: "#000",
        fontSize: 43,
        fontWeight: 'bold',
        textAlign: 'center',
        top: '7%',
    },

    input: {
        borderWidth:1,
        borderColor:"gray",
        padding:20,
        width: 250,
        height:31,
        alignSelf: "stretch",
        fontSize: 18,
        //marginVertical: 7,
        marginTop: 5,
        marginBottom: 10,
        borderRadius: 7,
    },

    signoutButton: {
        marginTop: 20,
        width: 250,
        height: 43,
        backgroundColor: 'red',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    },
    buttonContainer: {
        marginTop: 10,
        width: 250,
        height: 43,
        backgroundColor: 'blue',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    },
    buttonText: {
        fontSize: 18,
        color: '#ffffff'
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