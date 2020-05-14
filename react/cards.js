import React, {useState, useEffect} from 'react';
import {StyleSheet, useNavigation} from 'react-native';
import {Card, Title, Paragraph, Button, View} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {entrypoint} from "./entrypoint";

const HomeScreen = ({navigation}) => {
//const navigation = useNavigation();
const [count, setCount] = useState(null);
const [offres, setOffres] = React.useState([]);
const [token, setToken] = React.useState('');
AsyncStorage.getItem("token").then((value) => {
    const tokenb = JSON.parse(value);
    setToken(tokenb);
    //console.debug(value);
})
.then(res => {
    //do something else
});
console.debug(token);
useEffect(() => {
    fetch(`${entrypoint}/offers`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token,
        },
    }).then((resp) => resp.json())
    //.then((data) => setOffres(data));
    //AsyncStorage.setItem('offers', JSON.stringify(data)).then(() =>
    //alert('Charged offers'), 
    //);
}, []);

return (
    <>
        {/* {offres && offres.map((offre) => ( */}
        <Card style={styles.card}>
        <Card.Title title="Card Title" subtitle="Card Subtitle" />
        <Card.Content>
            <Title>sa</Title>
            <Paragraph>same</Paragraph>
        </Card.Content>
        <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
        <Card.Actions>
            <Button onPress={() => alert('test')}>Cancel</Button>
            <Button onPress={() => navigation.goBack()}>Go Back</Button>
        </Card.Actions>
        <Button onPress={() => navigation.navigate('home')}>Go To HomeScreen</Button>
        </Card>
        {/* ))}; */}
    </>
);
};

const styles = StyleSheet.create({
card: {
    marginHorizontal: 10,
    marginVertical: 10,
},
});

export default HomeScreen;