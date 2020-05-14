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
            id="nom"
            label="Nom"
            name="nom"
            value={name}
            onChangeText ={name => setName(name)}
            mode='outlined'
        />
        <TextInput 
            multiline
            variant="outlined"
            id="enterpriseDescription"
            label="Description de l'entreprise"
            name="enterpriseDescription"
            mode="outlined"
            value={companyDescription}
            onChangeText ={companyDescription => setCompanyDescription(companyDescription)}
        />
        <TextInput 
            multiline
            label="Description de l'offre" 
            id="offerDescription"
            name="offerDescription"
            mode="outlined"
            variant="outlined"
            value={offerDescription}
            onChangeText ={offerDescription => setOfferDescription(offerDescription)}
        />
        <TextInput 
            disabled
            label="Date de début" 
            id="startDate"
            name="startDate"
            mode="outlined"
            variant="outlined"
            value = {startDate}
        />
        <Button icon="camera" mode="contained" onPress={showDatePicker}>
        Choisir Date
        </Button>
        <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
        />
        <TextInput 
            label="Type de contrat"
            id="contractType"
            name="contractType"
            mode="outlined"
            variant="outlined"
            value={contractType}
            onChangeText ={contractType => setContractType(contractType)}
        />
        <TextInput 
            label="Lieu de travail" 
            id="workPlace"
            name="workPlace"
            mode="outlined"
            variant="outlined"
            value={workPlace}
            onChangeText ={workPlace => setWorkPlace(workPlace)}
        />
        <Button style={styles.Button} icon="pen" mode="contained" onPress={updateOffer} >
            Modifier
        </Button>
        <Button style={styles.Button} icon="pen" mode="contained" onPress={deleteOffer} >
            Supprimer
        </Button>
    </ScrollView>
    
    );
}