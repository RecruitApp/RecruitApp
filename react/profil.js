import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { TextInput, Button, Text } from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {entrypoint} from "./entrypoint";

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

export default function update() {
    const [user, setUser] = React.useState({});
    const navigation = useNavigation();
    /*AsyncStorage.getItem("user").then((value) => {
        const userd = JSON.parse(value);
        setUser(userd);
        setFirstname(userd.firstname)
        setLastname(userd.lastname)
        setEmail(userd.email)
        //console.debug(userd);
    })
    .then(res => {
        //
        //do something else
    });*/
    //console.debug(user.firstname);   
    const [firstname, setFirstname] = React.useState(user.firstname);
    const [lastname, setLastname] = React.useState(user.lastname);
    const [email, setEmail] = React.useState(user.email);
    const [registered, setRegistered] = React.useState(false);
    const [error, setError] = React.useState(false);

    function updateprofil(e) {
        e.preventDefault();
        e.stopPropagation();

        fetch(`${entrypoint}/users/${user.id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lastname,
                firstname,
                email
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
        Mis à jour des informations
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
            variant="outlined"
            id="email"
            label="Email"
            name="email"
            value={email}
            onChangeText ={email => setEmail(email)}
            mode='outlined'
        />
        <Button style={styles.Button} icon="pen" mode="contained" onPress={updateprofil}>
            Mettre à jour les informations
        </Button>
{/*         <Button style={styles.Button} icon="home" mode="contained" onPress={() => navigation.navigate('offers')}>
            Offers
        </Button> */}
    </View>
    
    );
}