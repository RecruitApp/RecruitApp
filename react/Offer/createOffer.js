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

export default class CreateOffer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            companyDescription: '',
            offerDescription: '',
            contractType: '',
            workPlace: '',
            startDate: '',
            isDatePickerVisible: false,

            token: '',
            loading: true
        };
        this.navigation = this.props.navigation;
    } 

    componentDidMount() {
        AsyncStorage.getItem("token").then((value) => {
            const tokenb = JSON.parse(value);
            console.debug(tokenb);
            this.setState({ token: tokenb }
            );
        })
        
    }

    showDatePicker = () => {
        console.warn(this.state.isDatePickerVisible);
        this.setState({ isDatePickerVisible: true });
        //setDatePickerVisibility(true);
        console.warn(this.state.isDatePickerVisible);
        
    };
    
    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false });
        //setDatePickerVisibility(false);
    };
    
    handleConfirm = date => {
        console.warn("A date has been picked: ", date);
        this.state.startDate = date.toString();
        //setStartDate(date.toString());
        this.hideDatePicker();
    };
    
    createOffer(name,
        companyDescription,
        offerDescription,
        startDate,
        contractType,
        workPlace) {

        fetch(`${entrypoint}/offers`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + this.state.token,
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
render(){
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
            onChangeText ={name=> this.setState({ name: name })}
            mode='outlined'
        />
        <TextInput 
            multiline
            variant="outlined"
            id="enterpriseDescription"
            label="Description de l'entreprise"
            name="enterpriseDescription"
            mode="outlined"
            onChangeText ={companyDescription=> this.setState({ companyDescription: companyDescription })}
        />
        <TextInput 
            multiline
            label="Description de l'offre" 
            id="offerDescription"
            name="offerDescription"
            mode="outlined"
            variant="outlined"
            onChangeText = {offerDescription=> this.setState({ offerDescription: offerDescription })}
        />
        <TextInput 
            disabled
            label="Date de début" 
            id="startDate"
            name="startDate"
            mode="outlined"
            variant="outlined"
            value = {this.state.startDate}
        />
        <Button icon="camera" mode="contained" onPress={this.showDatePicker}>
        Choisir Date
        </Button>
        <DateTimePickerModal
            isVisible={this.state.isDatePickerVisible}
            mode="date"
            onConfirm={this.handleConfirm}
            onCancel={this.hideDatePicker}
        />
        <TextInput 
            label="Type de contrat"
            id="contractType"
            name="contractType"
            mode="outlined"
            variant="outlined"
            onChangeText ={contractType=> this.setState({ contractType: contractType })}
        />
        <TextInput 
            label="Lieu de travail" 
            id="workPlace"
            name="workPlace"
            mode="outlined"
            variant="outlined"
            onChangeText ={workPlace=> this.setState({ workPlace: workPlace })}
        />
        <Button style={styles.Button} icon="pen" mode="contained" onPress={this.createOffer(
                this.state.name,
                this.state.companyDescription,
                this.state.offerDescription,
                this.state.startDate,
                this.state.contractType,
                this.state.workPlace)} >
            Créer
        </Button>
    </ScrollView>
    
    );
}
}