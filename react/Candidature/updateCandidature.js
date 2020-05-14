import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { TextInput, Button, Text } from 'react-native-paper';
import {View, StyleSheet, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

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

export default function updateCandidature() {
    const navigation = useNavigation();
    const [fetched, setFetched] = React.useState(false);
    const [lastName, setLastName] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [sexe, setSexe] = React.useState('');
    const [photo, setPhoto] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [age, setAge] = React.useState('');
    const [adresse, setAdresse] = React.useState('');
    const [motivation, setMotivation] = React.useState('');
    const [salaire, setSalaire] = React.useState('');
    const [cv, setCv] = React.useState('');
    const [checked, setChecked] = React.useState('Homme');
 
    
    useEffect(() => {
        if(!fetched) {
            fetch(`${entrypoint}/leads/${leadsId}`)
                .then((resp) => resp.json())
                .then((data) => {
                    setFirstName(data.response.firstname);
                    setLastName(data.response.lastname);
                    setSexe(data.response.sexe);
                    setEmail(data.response.email);
                    setAge(data.response.age);
                    setAdresse(data.response.adresse);
                    setMotivation(date.response.motivation);
                    setSalaire(date.response.salaire);

                    
                    setFetched(true);
                })
        }
      }, leadsId);

    function deleteOffer(e) {
        e.preventDefault();
        e.stopPropagation();

        fetch(`${entrypoint}/offer`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
    }

    function updateOffer(e) {
        e.preventDefault();
        e.stopPropagation();

        fetch(`${entrypoint}/offer`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                companyDescription,
                offerDescription,
                startDate,
                contractType,
                workPlace,
                }),
            })
                .catch((error) => {
                console.error(error);
                });
    }

    return (
    <ScrollView style={styles.view}>
        <Text style={styles.text}>
        Mise à jour candidature
        </Text>
        <TextInput
            variant="outlined"
            id="lastname"
            label="Nom"
            name="lastname"
            value={lastName}
            onChangeText ={lastName => setLastName(lastName)}
            mode='outlined'
        />
        <TextInput 
            variant="outlined"
            id="firstname"
            label="Prénom"
            name="firstname"
            mode="outlined"
            value={firstName}
            onChangeText ={firstName => setFirstName(firstName)}
        />
        <RadioButton.Group
            onValueChange={checked => setChecked(checked)}
            value={checked}
        >
            <RadioButton.Item label="Homme" value="Homme" />
            <RadioButton.Item label="Femme" value="Femme" />
        </RadioButton.Group>
        
        <TextInput 
            disabled
            label="Photo" 
            id="photo"
            name="photo"
            mode="outlined"
            variant="outlined"
            
        />
        <Button style={styles.Button} icon="pen" mode="contained" onPress={uploadphoto} >
            Upload Photo
        </Button>
        <TextInput 
            label="Email"
            id="email"
            name="email"
            mode="outlined"
            variant="outlined"
            value={email}
            onChangeText ={email => setEmail(email)}
        />
        <TextInput 
            label="Age" 
            id="age"
            name="age"
            mode="outlined"
            variant="outlined"
            value={age}
            onChangeText ={age => setAge(age)}
        />
        <TextInput 
            label="Adresse" 
            id="adresse"
            name="adresse"
            mode="outlined"
            variant="outlined"
            value={adresse}
            onChangeText ={adresse => setAdresse(adresse)}
        />
        <TextInput 
            multiline
            label="Motivation" 
            id="motivation"
            name="motivation"
            mode="outlined"
            variant="outlined"
            value={motivation}
            onChangeText ={motivation => setMotivation(motivation)}
        />
        <TextInput 
            label="Salaire" 
            id="salaire"
            name="salaire"
            mode="outlined"
            variant="outlined"
            value={salaire}
            onChangeText ={salaire => setAge(salaire)}
        />
        <TextInput 
            label="CV" 
            id="cv"
            name="cv"
            mode="outlined"
            variant="outlined"
            onChangeText ={cv => setAge(cv)}
        />
        <Button style={styles.Button} icon="pen" mode="contained" onPress={uploadcv} >
            Upload Photo
        </Button>
        <Button style={styles.Button} icon="pen" mode="contained" onPress={create} >
            Créer
        </Button>
        </ScrollView>
    
    );
}