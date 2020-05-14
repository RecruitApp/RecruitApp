import React, {Component} from 'react';
import { View, Text, Image, ScrollView, TextInput } from 'react-native';
import CALL from "../../utils/call";
import ApplicantCard from "./applicantCard";

export default class ListOfCandidate extends Component {
    constructor(props) {
		super(props);
		this.state = {
            listapplicant: [{
                "r" :"d"
            },{
                "r" :"d"
            }],
            call : new CALL(),
         };
    }
    
    componentDidMount() {
        this.state.call.consumToken(this.state.token).then(value =>{
            if(value!== undefined){
               
            }
        })
        .catch(error => {
            this.setState({ error });  
        });
    } 
    



    render(){
        const {listapplicant} = this.state;

        return (
            <ScrollView>
                 {listapplicant 
                 ?
                    <ScrollView>
                     {  listapplicant.map(applicant => (
                         <ApplicantCard applicant = {applicant}/>
                        )).reverse()
                     }
                     </ScrollView>
                   :<Text>Aucune candidature n'a été trouvé ...</Text>
                }

                {!listapplicant && <Text>Aucune candidature n'a été trouvé ...</Text>}
            </ScrollView>
        );
    }
}