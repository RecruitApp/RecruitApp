import axios from "axios";

export default class Call{
    
    constructor(){
        this.authListener = {}
        const url = "https://localhost:8443/";
        const user_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1ODk0NTQwMjAsImV4cCI6MTU4OTQ1NzYyMCwicm9sZXMiOlsiSVNfQVVUSEVOVElDQVRFRF9GVUxMWSIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImF6ZXJ0QHRvdG8uZnIifQ.cxIhiGqtcXe1OQJtBN8mUUvBKfEtdKujoGnmpAZ_gHv8sdwpwma0qWd6QaTTKCpnlDLUlw43lx1c5Fx_NeFxRlAzchHcbVZzVqWziXRaJraYUheiARRbIU29DrOUsIqLsIhtlEio4ao9aj26j6Gpy0wQcb74uKtiREXqvoTTza5uce6osG0hwMgLdTGJVlMHxnOy17I-a-NdFMd9yFNST0EDzTzv5JhmB0seYqMVyj1hHUVkQHwmaOQn71QIxjByNeJAzqZ7Kvnop61HutrJzGAJaBR5yVv5pjI95-dOIPuTWx3mnRxEVG6U7hHu4YyEE7y1FjqJoe8iSbWqidI3Y3DCeIZFnkpHp9-SCM_8XrV-eUPEzlhtt-ssYjMO5qzPCpjYxOqcxjy-fVcJLZbRst_zaS1fGBIAPyepDmn3238mJPl2FQhOzUMCBCaudxGOtqmQbJnVf0et6wv8jYctUvlqFwIZhteGTX9vdQnqf1ZaMO4e9j2M4H3SiikNGqV38V6yjce9sZtcV42-qNaeFZoVtZDiyqPAHDQpUeGFZuMkSObmf6URiNx6--zGioSdJ-8Hi7_YCmJbQcJqsBuetp4uhJHhOqBnSf-IRVwmtDFTYwEaLePwzKtfcs0EGQGsrhvjRP3OKoNVL_kNZkCSQVHMX_ATkKbRgcyiISIljgQ"
    }


    dosignWithEmailAndPassword = (data, uri) =>{
        
        return new Promise((resolve, reject) => { resolve(axios.post(
            this.url+"login",
            {
                "email": data.email,
                "password" : data.password
            }).then(response=> {

               
            }).catch(error =>{
                reject( console.log(error));
            })) });
    }



    getbyId = (uri, id) =>{
        return  new Promise((resolve, reject) => { resolve(axios.get(
            this.url+uri+"/"+id
            ,{
                params: {
                    'token':   this.user_token
                },
                
            }).then(response=> {
                console.log(response["Error"])
                return response.data;
                
            }).catch(error =>{
                reject( console.log(error));
            })) });
    }

    getAll = (uri) =>{
        return  new Promise((resolve, reject) => { resolve(axios.get(
            this.url+uri,
            {
                params: {
                    'token':   this.user_token
                },
                
            }).then(response=> {
                console.log(response["Error"])
                return response.data;
                
            }).catch(error =>{
                reject( console.log(error));
            })) });
    }


    post = (data, uri) =>{
        return  new Promise((resolve, reject) => { resolve(axios.post(
            this.url+uri,
            data
            ,{
                params: {
                    'token':   this.user_token
                },
                
            }).then(response=> {
                console.log(response["Error"])
                return response.data;
                
            }).catch(error =>{
                reject( console.log(error));
            })) });
    }


    put = (data, id, uri) =>{
        return  new Promise((resolve, reject) => { resolve(axios.put(
            this.url+uri+"/"+id,
            data
            ,{
                params: {
                    'token':   this.user_token
                },
                
            }).then(response=> {
                console.log(response["Error"])
                return response.data;
                
            }).catch(error =>{
                reject( console.log(error));
            })) });
    }

    consumToken = (token) =>{
        return  new Promise((resolve, reject) => { resolve(axios.post(
            this.url+"validate_token",
            {
                token : token
            },{
                params: {
                    'token':   this.user_token
                },
                
            }).then(response=> {
                console.log(response["Error"])
                return response.data;
                
            }).catch(error =>{
                reject( console.log(error));
            })) });
    }



}