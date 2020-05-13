import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { TextInput, Button, Text } from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';

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


export default function SignUp() {
    const navigation = useNavigation();
    const [firstname, setFirstname] = React.useState('');
    const [lastname, setLastname] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [registered, setRegistered] = React.useState(false);
    const [error, setError] = React.useState(false);

    function register(e) {
        e.preventDefault();
        e.stopPropagation();

        fetch(`${entrypoint}/user`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lastname,
                firstname,
                email,
                username,
                password
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                if(data.hasOwnProperty('id')) {
                    setRegistered(true);
                    const user = data;
                    AsyncStorage.setItem('user', JSON.stringify(user));
                }
                })
                .catch((error) => {
                console.error(error);
                });
    }

    return (
    <View style={styles.view}>
        <Text style={styles.text}>
        S'inscrire
        </Text>

        <TextInput
            name="firstName"
            id="firstName"
            label="First Name"
            value={firstname}
            onChangeText={firstname => setFirstname(firstname)}
            mode='outlined'
        />

        <TextInput
            id="lastName"
            label="Last Name"
            name="lastName"
            value={lastname}
            onChangeText={lastname => setLastname(lastname)}
            mode='outlined'
        />

        <TextInput
            id="username"
            label="username"
            name="username"
            value={username}
            onChangeText={username => setUsername(username)}
            mode='outlined'
        />

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
            value={password}
            onChangeText={password => setPassword(password)}
        />
        <Button style={styles.Button} icon="home" mode="contained" onPress={() => navigation.navigate('login')}>
            Se connecter
        </Button>
        <Button style={styles.Button} icon="pen" mode="contained" onPress={register}>
            S'inscrire
        </Button>
    </View>
    
    );
}