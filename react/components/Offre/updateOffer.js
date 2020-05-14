
import React, {Component} from 'react'
import { View, Button,TextInput } from 'react-native'
import Dates from 'react-native-dates';
import RNPickerSelect from 'react-native-picker-select';
import CALL from "../../utils/call";

export default class UpdateOffre extends Component {
    constructor(props) {
		super(props);

		this.state = { startDate: null, call : new CALL(), };
    }
    
    componentDidMount() {
        let data = {
            name: this.state.name ,
            companyDescription: this.state.companyDescription,
            offerDescription: this.state.offerDescription,
            startDate: this.state.startDate,
            contractType: this.state.contractType,
            workPlace: this.state.workPlace,
        }
        this.state.call.put(data, id, "offer").then(value =>{
            if(value!== undefined){
                this.setState({
                    offer :  value.response
                })
            }
        })
        .catch(error => {
            this.setState({ error });  
        });
    } 

    onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};
    updateeOffer = async () => {
       
    }

    onDateChange = ({ startDate }) =>
    this.setState({ startDate : startDate });
    
    render() {
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
            onPress={this.updateeOffer}
            />
        </View>
        )
    }
}
