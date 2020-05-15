import React, {Component} from 'react';
import { ScrollView, TextInput, StyleSheet} from 'react-native';
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

export default class listCondidUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: null,
            offres: [],
            token: '',
            loading: true,
            id: null,
            username:'',
            user:[],
            user2:[]
        };
        this.navigation = this.props.navigation;
    }
    
    componentDidMount() {
        let idb;
        let userlog;
        let userdata;
        let user;
    AsyncStorage.getItem("user2").then((value3) => {
        AsyncStorage.getItem("token").then((value) => {
            AsyncStorage.getItem("user").then((value2) =>{
                userdata = JSON.parse(value2);
                this.setState({ user: userlog, username: userdata.username }, () => {
                fetch(`${entrypoint}/users?email=${userdata.username}`, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer ' + this.state.token,
                    }
                }).then((resp) => resp.json())
                .then((data) => {
                    user = data;
                    AsyncStorage.setItem('user2', JSON.stringify(user))}
                );
            })
            userlog = JSON.parse(value3);
            //idb = userlog.id;
            const tokenb = JSON.parse(value);
            //id = this.state.user;
            console.debug(this.state.user2);
            this.setState({ token: tokenb, id: id }, () => {
                fetch(`${entrypoint}/users/${userdata.id}/proposals`, {
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
    })
})
    }

    render(){
        return (
            <ScrollView>
                    { this.state.loading && <Text>Loading...</Text> }

                    { !this.state.loading && 
                        <>
                            {this.state.offres.map((offre) =>
                                <Card style={styles.card} key={offre.id}>
                                    <Card.Title title="Card Title" subtitle="Card Subtitle" />
                                    <Card.Content>
                                        <Title>{offre.applicant}</Title>
                                        <Paragraph>{offre.offer}</Paragraph>
                                    </Card.Content>
                                    <Card.Cover source={{uri: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3900&q=80'}} />
                                    <Card.Actions>
                                        <Button onPress={() => this.props.navigation.navigate('detailOffer', {
                                    offerId: offre.id,
                                })}>Détail Offre</Button>
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
            </ScrollView>
        );
    }
}