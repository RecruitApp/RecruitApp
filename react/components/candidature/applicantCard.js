import React, { Component } from 'react';
import {Card, Title, Paragraph, Button, Text} from 'react-native-paper';
import CALL from "../../utils/call";

export default class ApplicantCard extends Component {
	constructor(props) {
        super(props);
        this.state = {
            call : new CALL(),
         };
	}
    
    show = () =>{
        // this.state.call
    }

    validate = () =>{
        // this.state.call
    }

    cancel = () =>{
        // this.state.call
    }

	render() {
        const {  applicant } = this.props;
        
		return (
			<Card>
                <Card.Content>
                    <Title>Nom / prenom</Title>
                    <Paragraph>Description</Paragraph>
                </Card.Content>
                <Card.Actions>
                    <Text>Status :  </Text>
                    <Button onPress={this.show}>Voir</Button>
                    <Button onPress={this.validate}>Validé</Button>
                    <Button onPress={this.cancel}>Refusé</Button>
                </Card.Actions>
            </Card>
		);
	}
}

