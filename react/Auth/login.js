import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { TextInput, Button, Text } from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import jwt from 'jwt-decode';

import {entrypoint} from "../entrypoint";

const styles = StyleSheet.create({
    view: {
        flexDirection: "column",
        height: 100,
        padding: 20
    },
    text:{
        textAlign: "center",
        fontSize:20,
        fontWeight: 'bold',
    },
    Button:{
        marginTop:10,

    }
});


export default function SignInSide() {
    const navigation = useNavigation();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState(false);

    function login(e) {
        e.preventDefault();
        e.stopPropagation();
        
        
        fetch(`${entrypoint}/authentication_token`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                
                if(data.hasOwnProperty('error')) {
                    setError(true);
                } else if (data.hasOwnProperty('token')) {
                    setError(false);
                    const token = data.token;
                    console.debug(data);
                    AsyncStorage.setItem('token', JSON.stringify(token));
                    const user = jwt(token);
                    AsyncStorage.setItem('user', JSON.stringify(user));
/*                     AsyncStorage.getItem("user").then((value2) =>{
                        iduser = JSON.parse(value2.id)
                    })
                    if(iduser===''){
                        AsyncStorage.setItem('user', JSON.stringify({ firstname :'',lastname:'', email:''}));
                    } */
                    
                    navigation.navigate('profil')
                }
                
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
    <View style={styles.view}>
        <Text style={styles.text}>
        Se connecter
        </Text>
        <TextInput
            variant="outlined"
            id="email"
            label="Email"
            name="email"
            value={email}
            onChangeText ={email => setEmail(email)}
            mode='outlined'
        />

        <TextInput
            mode='outlined'
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            secureTextEntry={true}
            value={password}
            onChangeText={password => setPassword(password)}
        />
        <Button style={styles.Button} icon="home" mode="contained" onPress={login}>
            Se connecter
        </Button>
        <Button style={styles.Button} icon="pen" mode="contained" onPress={() => navigation.navigate('register')}>
            S'inscrire
        </Button>
    </View>
    
    );
}