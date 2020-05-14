import React, {useState, useEffect} from 'react';
import {StyleSheet, useNavigation} from 'react-native';
import {Card, Title, Paragraph, Button, View, FAB, Text} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {entrypoint} from "./entrypoint";

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 10,
        marginVertical: 10,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});

export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            count: null,
            offres: [],
            token: '',
            loading: true
        };
        this.navigation = this.props.navigation;
    } 

    componentDidMount() {
        AsyncStorage.getItem("token").then((value) => {
            const tokenb = JSON.parse(value);
            console.debug(tokenb);
            this.setState({ token: tokenb }, () => {
                fetch(`${entrypoint}/offers`, {
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
        // .then(res => {
        //     if (token !== null) {
                
        //         // AsyncStorage.setItem('offers', JSON.stringify(data)).then(() =>
        //         // alert('Charged offers'), 
        //         // );
        //         } catch (error) {
        //             console.error(error);
        //         };
        //     }   
        // });
    }

    render() {
        return (
            <>
                { this.state.loading && <Text>Loading...</Text> }

                { !this.state.loading && 
                    <>
                        {this.state.offres.map((offre) =>
                            <Card style={styles.card} key={offre.id}>
                                <Card.Title title="Card Title" subtitle="Card Subtitle" />
                                <Card.Content>
                                    <Title>{offre.name}</Title>
                                    <Paragraph>{offre.offerDescription}</Paragraph>
                                </Card.Content>
                                <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
                                <Card.Actions>
                                    <Button onPress={() => alert('test')}>Cancel</Button>
                                    <Button onPress={() => this.state.navigation.goBack()}>Go Back</Button>
                                    <Button mode="contained" onPress={() => this.state.navigation.navigate('updateOffer', {
                                    offerId: offre.id,
                                })}>Editer</Button>
                                </Card.Actions>
                            </Card>
                        )}
                            <FAB
                                style={styles.fab}
                                small
                                icon="plus"
                                onPress={() => this.state.navigation.navigate('createOffer')}
                        />
                    </>
                }
            </>
        );
    }
}

