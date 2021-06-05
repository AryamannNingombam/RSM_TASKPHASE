import React,{useState} from 'react';
import './LoginPage.css';
import {store} from '../../app/store';
import {SignInThunk} from '../../features/auth/AuthSlice';
import { Link, useHistory } from 'react-router-dom';


export const LoginPage = () => {
    const history = useHistory();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const onButtonClick = async(e)=>{
        e.preventDefault();
        const result = await store.dispatch(SignInThunk({email:email,password:password}));
        console.log(result);
        if (result.payload.success){
            
            history.push('/home');
        }else{
            alert("Wrong Credentials!")
        }

    };

    const onEmailChange = (e)=>{
           

            
                setEmail(e.target.value);
            

    };

    const onPasswordChange = (e)=>{
 
                setPassword(e.target.value);
 
    }


    return (
        <div id="login-page-main-background">
                <form id="login-page-main-area">
                        <span id='login-page-heading-area'>
                        <span className="login-page-main-heading" id="LOG">Log </span>
                         <span className="login-page-main-heading" id="IN"> In</span>
                       
                        </span>
                        
                    <input onChange={onEmailChange} placeholder="john@mail.com" id='login-input-email' required type="email" className="login-page-input"/>
                    <input required type="password" onChange={onPasswordChange} placeholder="**********" id='login-input-password'  className="login-page-input"/>

                    <button onClick={onButtonClick} id="submit-button">Submit</button>
                    <Link style={{color:"white"}} to="/sign-up">Don't have an account? Sign Up!</Link>
                </form>
        </div>
    )
}
