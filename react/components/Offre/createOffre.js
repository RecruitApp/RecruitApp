
import React, {Component} from 'react'
import { View, Button,TextInput } from 'react-native'
import Dates from 'react-native-dates';
import RNPickerSelect from 'react-native-picker-select';
import CALL from "../../utils/call";
import moment from 'moment';
export default class CreateOffre extends Component {
    constructor(props) {
		super(props);

		this.state = { startDate: null, call : new CALL(),};
    }
    
    onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};
    createOffer = async () => {
        let data = {
            name: this.state.name ,
            companyDescription: this.state.companyDescription,
            offerDescription: this.state.offerDescription,
            startDate: this.state.startDate,
            contractType: this.state.contractType,
            workPlace: this.state.workPlace,
        }
        this.state.call.post(data,"offer").then(value=> {
            console.log(value)
        })
    }

    
    render() {
        const isDateBlocked = (date) =>
        date.isBefore(moment(), 'day');
        const onDatesChange = ({ startDate }) =>
        this.setState({ startDate : startDate });
        return (
        <View >
            <TextInput
            label="Nom"
            placeholder='Nom'
            name="name"
            autoCapitalize="none"
            placeholderTextColor='white'
            onChange={this.onChange}
            />
            <TextInput
            multiline={true}
            numberOfLines={6}
            label="Description de l'entreprise"
            placeholder="Description de l'entreprise"
            name="companyDescription"
            autoCapitalize="none"
            placeholderTextColor='white'
            onChange={this.onChange}
            />
            <TextInput
            multiline={true}
            numberOfLines={6}
            label="Description de l'offre"
            placeholder="Description de l'offre"
            name="offerDescription"
            autoCapitalize="none"
            placeholderTextColor='white'
            onChange={this.onChange}
            />



            <RNPickerSelect
                onValueChange={(value) => this.setState({ typeOfContract : value }) }
                items={[
                    { label: 'CDI', value: 'CDI' },
                    { label: 'CDD', value: 'CDD' },
                    { label: 'Freelance', value: 'Freelance' },
                ]}
            />



            <TextInput
                placeholder="Lieux de travail"
                name="workplace"
                label="Lieux de travail"
                autoCapitalize="none"
                placeholderTextColor='white'
                onChange={this.onChange}
            />
           
            <Button
            title='Creation'
            onPress={this.createOffer}
            />
        </View>
        )
    }
}
