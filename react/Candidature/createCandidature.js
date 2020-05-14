import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { TextInput, Button, Text, RadioButton } from 'react-native-paper';
import {View, StyleSheet, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';

import {entrypoint} from "../entrypoint";

const styles = StyleSheet.create({
    view: {
        flexDirection: "column",
        height: 100,
        padding: 20,
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

export default function createCandidature() {
    const navigation = useNavigation();
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
    
    async function uploadphoto() {
        //Opening Document Picker for selection of one file
        try {
          const photoUp = await DocumentPicker.pick({
            type: [DocumentPicker.types.images],
            //There can me more options as well
            // DocumentPicker.types.allFiles
            // DocumentPicker.types.images
            // DocumentPicker.types.plainText
            // DocumentPicker.types.audio
            // DocumentPicker.types.pdf
          });
          //Printing the log realted to the file
          console.log('res : ' + JSON.stringify(photoUp));
          console.log('URI : ' + photoUp.uri);
          console.log('Type : ' + photoUp.type);
          console.log('File Name : ' + photoUp.name);
          console.log('File Size : ' + photoUp.size);
          //Setting the state to show single file attributes
          
          fetch(`${entrypoint}/media_objects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: ({
                photoUp
                }),
            })
            .then((response) => response.json())
            .then((data) => {
                setPhoto(data.response.id)
            })
            .catch((error) => {
            console.error(error);
            });
        } catch (err) {
          //Handling any exception (If any)
          if (DocumentPicker.isCancel(err)) {
            //If user canceled the document selection
            alert('Canceled from single doc picker');
          } else {
            //For Unknown Error
            alert('Unknown Error: ' + JSON.stringify(err));
            throw err;
          }
        }
      }
    
      async function uploadcv() {
        //Opening Document Picker for selection of one file
        try {
          const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.pdf],
            //There can me more options as well
            // DocumentPicker.types.allFiles
            // DocumentPicker.types.images
            // DocumentPicker.types.plainText
            // DocumentPicker.types.audio
            // DocumentPicker.types.pdf
          });
          //Printing the log realted to the file
          console.log('res : ' + JSON.stringify(res));
          console.log('URI : ' + res.uri);
          console.log('Type : ' + res.type);
          console.log('File Name : ' + res.name);
          console.log('File Size : ' + res.size);
          //Setting the state to show single file attributes
          fetch(`${entrypoint}/media_objects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: ({
                res
                }),
            })
            .then((response) => response.json())
            .then((data) => {
                setCv(data.response.id)
            })
            .catch((error) => {
            console.error(error);
            });
        } catch (err) {
          //Handling any exception (If any)
          if (DocumentPicker.isCancel(err)) {
            //If user canceled the document selection
            alert('Canceled from single doc picker');
          } else {
            //For Unknown Error
            alert('Unknown Error: ' + JSON.stringify(err));
            throw err;
          }
        }
      }

    function create(e) {
        e.preventDefault();
        e.stopPropagation();

        fetch(`${entrypoint}/leads`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lastName,
                firstName,
                sexe,
                photo,
                email,
                age,
                adresse,
                motivation,
                salaire,
                cv
                }),
            })
                .catch((error) => {
                console.error(error);
                });
    }

    return (
    
        <ScrollView style={styles.view}>
        <Text style={styles.text}>
        Créer une candidature
        </Text>
        <TextInput
            variant="outlined"
            id="lastname"
            label="Nom"
            name="lastname"
            onChangeText ={lastName => setLastName(lastName)}
            mode='outlined'
        />
        <TextInput 
            variant="outlined"
            id="firstname"
            label="Prénom"
            name="firstname"
            mode="outlined"
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
            label="Sexe" 
            id="sexe"
            name="sexe"
            mode="outlined"
            variant="outlined"
            onChangeText ={sexe => setSexe(sexe)}
        />
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
            onChangeText ={email => setEmail(email)}
        />
        <TextInput 
            label="Age" 
            id="age"
            name="age"
            mode="outlined"
            variant="outlined"
            onChangeText ={age => setAge(age)}
        />
        <TextInput 
            label="Adresse" 
            id="adresse"
            name="adresse"
            mode="outlined"
            variant="outlined"
            onChangeText ={adresse => setAdresse(adresse)}
        />
        <TextInput 
            multiline
            label="Motivation" 
            id="motivation"
            name="motivation"
            mode="outlined"
            variant="outlined"
            onChangeText ={motivation => setMotivation(motivation)}
        />
        <TextInput 
            label="Salaire" 
            id="salaire"
            name="salaire"
            mode="outlined"
            variant="outlined"
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