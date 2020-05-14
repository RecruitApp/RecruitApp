import React, { Component } from 'react';
import { Card } from 'react-native-paper';
import CALL from "../../utils/call";

export default class CardListOffer extends Component {
	constructor(props) {
		super(props);
        this.state = {
            call : new CALL(),
         };
	}
    
    show = () =>{
         // this.state.call
    }

    apply = () =>{
         // this.state.call
    }


	render() {
		const {  Offer } = this.props;
		return (
			<Card>
                <Card.Content>
                    <Title>Nom : {Offer.name} </Title>
                    <Paragraph>Description offre : {Offer.offerDescription}</Paragraph>
                </Card.Content>
                <Card.Actions>
                    <Button onPress={this.show}>Voir</Button>
                    <Button onPress={this.apply}>Postuler</Button>
                </Card.Actions>
            </Card>
		);
	}
}

