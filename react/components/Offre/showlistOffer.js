import React, {Component} from 'react';
import { View, Text, Image, ScrollView, TextInput } from 'react-native';
import CALL from "../../utils/call";
import CardListOffer from "./cardListOffer"
export default class showlistOffer extends Component {
    constructor(props) {
		super(props);
		this.state = {
            listOffer: [],
            call : new CALL(),
         };
    }
    
    componentDidMount() {

        this.state.call.getAll("offer").then(value =>{
            if(value!== undefined){
                this.setState({
                    listOffer :  value.response
                })
            }
        })
        .catch(error => {
            this.setState({ error });  
        });
    } 
    

    render(){
        const {listOffer} = this.state;
        return (
            <ScrollView>
                 {listOffer && 
                 (
                    <ScrollView>
                     {  listOffer.map(Offer => (
                         <CardListOffer Offer = {Offer}/>
                        )).reverse()
                     }
                    </ScrollView>
                )   
                }

                {!listOffer && <Text>Aucune candidature n'a été trouvé ...</Text>}
            </ScrollView>
        );
    }
}