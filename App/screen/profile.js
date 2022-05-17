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
    SafeAreaView, TouchableOpacityComponent
} from 'react-native';
//import { useAuth } from "../context/AuthContext";
import { signOut, updatePassword, getAuth, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import dangerousStyleValue from "react-native-web/dist/modules/setValueForStyles/dangerousStyleValue";

export default class Profile extends Component{
    constructor(props){
        super(props)

        this.state = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        };
    }

    onSignoutPress = () => {
        const auth = getAuth();
        return auth.signOut();
    }

    reauthenticate = (currentPassword) => {
        const auth = getAuth();
        const user = auth.currentUser;
        const cred = EmailAuthProvider.credential(user?.email, currentPassword);
        return reauthenticateWithCredential(user, cred);
    }

    onChangePasswordPress = () => {
        this.reauthenticate(this.state.currentPassword).then(() => {
            const auth = getAuth();
            const user = auth.currentUser;
            if (this.state.newPassword !== this.state.confirmPassword) {
                throw new Error('Passwords do not match!');
            }
            return user.updatePassword(this.state.newPassword).then(() => {
                Alert.alert("Password was changed");
            }).catch((error) => {
                console.log(error.message);
            });
        }).catch((error) => {
            console.log(error.message)
        });
    }

    render(){
        return <View style = {styles.container}>
            <StatusBar backgroundColor= '#f1f1f1' barStyle='light-content'/>
            <View>
                <Text style = {styles.title}>Profile</Text>
                <View style={styles.separator}/>
                <TextInput style = {styles.input}
                           secureTextEntry={true}
                           placeholder = "Old Password"
                           autoCapitalize = "none"
                           value = {this.state.oldPassword}
                           onChangeText = {(text) => { this.setState({oldPassword: text}) }}
                />
                <TextInput style = {styles.input}
                           secureTextEntry={true}
                           placeholder = "New Password"
                           autoCapitalize = "none"
                           value = {this.state.newPassword}
                           onChangeText = {(text) => { this.setState({newPassword: text}) }}
                />
                <TextInput style = {styles.input}
                           secureTextEntry={true}
                           placeholder = "Confirm Password"
                           autoCapitalize = "none"
                           value = {this.state.confirmPassword}
                           onChangeText = {(text) => { this.setState({confirmPassword: text}) }}
                />

                <TouchableOpacity style={styles.buttonContainer} onPress={this.onChangePasswordPress}>
                    <Text style={styles.buttonText}> Change Password </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.signoutButton} onPress={this.onSignoutPress}>
                    <Text style={styles.buttonText}> Sign Out </Text>
                </TouchableOpacity>

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
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        alignItems: "center",
    },

    separator: {
        marginVertical: 31,
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
    subtitle:{
        color: "#000",
        fontSize: 20,
        fontWeight: 'normal',
        textAlign: 'left',
        top: '3%',
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

    text: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 20,
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