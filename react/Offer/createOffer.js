import React, { Component } from 'react';
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

export default function createOffer() {
    const navigation = useNavigation();
    const [name, setName] = React.useState('');
    const [companyDescription, setCompanyDescription] = React.useState('');
    const [offerDescription, setOfferDescription] = React.useState('');
    const [contractType, setContractType] = React.useState('');
    const [workPlace, setWorkPlace] = React.useState('');
    const [startDate, setStartDate] = React.useState('')
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
 
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    
    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date.toString());
        setStartDate(date.toString());
        hideDatePicker();
    };
    
    function create(e) {
        e.preventDefault();
        e.stopPropagation();

        fetch(`${entrypoint}/offer`, {
            method: 'POST',
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
        Créer une offre
        </Text>
        <TextInput
            variant="outlined"
            id="nom"
            label="Nom"
            name="nom"
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
            onChangeText ={companyDescription => setCompanyDescription(companyDescription)}
        />
        <TextInput 
            multiline
            label="Description de l'offre" 
            id="offerDescription"
            name="offerDescription"
            mode="outlined"
            variant="outlined"
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
            onChangeText ={contractType => setContractType(contractType)}
        />
        <TextInput 
            label="Lieu de travail" 
            id="workPlace"
            name="workPlace"
            mode="outlined"
            variant="outlined"
            onChangeText ={workPlace => setWorkPlace(workPlace)}
        />
        <Button style={styles.Button} icon="pen" mode="contained" onPress={create} >
            Créer
        </Button>
    </ScrollView>
    
    );
}