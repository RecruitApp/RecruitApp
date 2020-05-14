import React, {Component} from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import CALL from "../../utils/call";

export default class Apply extends Component {
    constructor(props) {
		super(props);

		this.state = { token:"" ,call : new CALL(), };
    }
    
    onSave = () =>{
        this.state.call.consumToken(this.state.token).then(value =>{
            if(value!== undefined){
               
            }
        })
        .catch(error => {
            this.setState({ error });  
        });
    }

    onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};
    render(){
        return (
            <View>
                <Text>Veuillez saisir votre code d'invitation</Text>
                <TextInput
					name="token"
					onChange={this.onChange}
                    style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1
                    }}
                    placeholder="Veuillez saisir votre code"
                />
                <Button icon="home" mode="contained" onPress={this.onSave}  title="Valider">
             
        </Button>
            </View>
        );
    }
}