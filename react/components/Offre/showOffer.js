import React, {Component} from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import CALL from "../../utils/call";

export default class ShowOffer extends Component {
    constructor(props) {
		super(props);
		this.state = {
            offer: {
                id: 0,
                name: "string",
                companyDescription: "string",
                offerDescription: "string",
                startDate: "2020-05-14T12:28:04.206Z",
                typeOfContract: "string",
                workplace: "string",
            },call : new CALL(),
         };
    }
    
    componentDidMount() {
        let id = 1;
        this.state.call.getbyId("offer", id).then(value =>{
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

    render(){
        const {offer} = this.state;
        return (
            <ScrollView>
                 <Text>Some text</Text>
                    <View>
                        <Text>{offer.id}</Text>
                        <Text>{offer.name}</Text>
                        <Text>{offer.companyDescription}</Text>
                        <Text>{offer.offerDescription}</Text>
                        <Text>{offer.startDate}</Text>
                        <Text>{offer.typeOfContract}</Text>
                        <Text>{offer.workplace}</Text>
                    </View>
                
            </ScrollView>
        );
    }
}