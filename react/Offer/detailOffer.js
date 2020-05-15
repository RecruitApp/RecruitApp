import React, {Component} from 'react';
import {ScrollView, TextInput, StyleSheet} from 'react-native';
import {Card, Title, Paragraph, Button, View, FAB, Text} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {entrypoint} from "../entrypoint";

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});

export default class detailOffer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: null,
            offres: [],
            token: '',
            loading: true
        };
        this.navigation = this.props.navigation;
        this.offerId = this.props.route.params;
    }
    
    componentDidMount() {
        AsyncStorage.getItem("token").then((value) => {
            const tokenb = JSON.parse(value);
            console.debug(tokenb);
            this.setState({ token: tokenb }, () => {
                fetch(`${entrypoint}/offer/${this.offerId}`, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer ' + this.state.token,
                    }
                }).then((resp) => resp.json())
                .then((data) => this.setState({ offres: data, loading: false }));
            });
        })
    }

    render(){
        return (
            <ScrollView>
                { this.state.loading && <Text>Loading...</Text> }
                    { !this.state.loading && 
                        <>
                            {this.state.offres.map((offre) =>
                                <View>
                                    <Text>offre N :{offre.id}</Text>
                                    <Text>nom de l'offre{offre.name}</Text>
                                    <Text>Description 1:{offre.companyDescription}</Text>
                                    <Text>Description de l'offre{offre.offerDescription}</Text>
                                    <Text>Date de début{offre.startDate}</Text>
                                    <Text>Type de contrat:{offre.typeOfContract}</Text>
                                    <Text>Emplacement :{offre.workplace}</Text>
                                </View>
                            )}
                                <FAB
                                    style={styles.fab}
                                    small
                                    icon="plus"
                                    onPress={() => this.state.navigation.navigate('createOffer')}
                            />
                        </>
                    }
            </ScrollView>
        );
    }
}