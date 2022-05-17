import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "@firebase/auth";
import { doc, serverTimestamp, setDoc, collection } from "firebase/firestore";
import React, { useState, useEffect, createContext, useContext } from 'react';
import db, {app} from "../firebase/config";
import { getAuth } from "firebase/auth";
import { useNavigation, styles } from '@react-navigation/native';

const AuthContext = createContext();

export function useAuth()
{
    return useContext(AuthContext);
}

export default function AuthProvider({ children })
{
    const auth = getAuth();
    const usersRef = collection(db, 'Users');
    const [userDoc, setUserDoc] = useState()
    const [currentUser,setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState()
    const navigation = useNavigation();

    async function loginwithPassword(email, password)
    {
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            navigation.navigate('Home Screen', {screen: 'Home'});
            console.log('Log in successfully');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message
            console.log(errorMessage);
        });
    }

    async function loginwithGoogle()
    {
        await signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            console.log(errorMessage);
        });
    }
    

    async function signup(email, password, name) 
    {
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            createProfile = () => {
                setDoc(doc(db, 'User', user.uid), {
                    name: name,
                    email: email, 
                    password: password,
                    createdAt: serverTimestamp(),
                })
            }
            createProfile();
            navigation.navigate('Home Screen', {screen: 'HomeScreen'});
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });
        
    }

    async function signout()
    {
        signOut(auth).then(() => { 
        }).catch((error) => {
            console.log(error.message);
        }); 
    }

    useEffect(() => {
        try {
            const unsubcribe = onAuthStateChanged(auth, user => {
                setCurrentUser(user)
                setLoading(false);
        })

          // return unsubcriber
        } catch (error) {
          console.log('Error in auth state changed:', error.message);
        }
    }, [])

    const value = {
        //state
        currentUser,
        error,
        //method
        loginwithPassword,
        loginwithGoogle,
        signup,
        signout,
        setError,

    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}