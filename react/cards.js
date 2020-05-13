import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Card, Title, Paragraph, Button, View} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {entrypoint} from "./entrypoint";

const HomeScreen = ({navigation}) => {
const [count, setCount] = useState(null);
const [offres, setOffres] = React.useState([]);

const onSave = () => {
    AsyncStorage.setItem('count', JSON.stringify(count)).then(() =>
    alert('saved'),
    );
};
const onAdd = () => {
    setCount(count + 1);
};

useEffect(() => {
    AsyncStorage.getItem('count').then(data => setCount(data));
/*     fetch(`${entrypoint}/offers`)
    .then((resp) => resp.json())
    .then((data) => setOffres(data));
    AsyncStorage.setItem('offers', JSON.stringify(data)).then(() =>
    alert('Charged offers'), 
    );*/
}, []);

return (
    //<View>
    //{offres && offres.map((offre) =>  (
    <Card style={styles.card}>
    <Card.Title title="Card Title" subtitle="Card Subtitle" />
    <Card.Content>
        {/*  "name": "string", {offre.name}
        "companyDescription": "string", {offre.description}
        "offerDescription": "string",
        "startDate": "2020-05-13T12:18:54.024Z",
        "typeOfContract": "string",
        "workplace": "string" */}
        <Title>Card title 2 </Title>
        <Paragraph>Card 2 content</Paragraph>
    </Card.Content>
    <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
    <Card.Actions>
        <Button onPress={() => alert('test')}>Cancel</Button>
        <Button onPress={onAdd}>+1</Button>
        <Button onPress={onSave}>Save</Button>
        <Button onPress={() => navigation.goBack()}>Go Back</Button>
        <Button onPress={() => navigation.navigate('home', {from: 'navigate'})}>
        Go To HomeScreen
        </Button>
    </Card.Actions>
    </Card>
    //))}
    //</View>
);
};

const styles = StyleSheet.create({
card: {
    marginHorizontal: 10,
    marginVertical: 10,
},
});

export default HomeScreen;