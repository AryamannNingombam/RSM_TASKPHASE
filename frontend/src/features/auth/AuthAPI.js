import axios from 'axios';
import { BACKEND_URL } from '../../constants';


export const SignInRequest = (data)=>{
    return axios.post(`${BACKEND_URL}/auth/sign-in/`,data,{
        headers: {
        'content-type' : 'application/json'    
        }
    })

};



export const SignUpRequest = (data)=>{
    return axios.post(`${BACKEND_URL}/auth/sign-up/`,data,{
        headers: {
        'content-type' : 'application/json'    
        }
    })

};


