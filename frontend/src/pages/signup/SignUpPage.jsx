import React,{useState} from 'react';
import {Form,Button} from 'react-bootstrap'; 
import {store} from '../../app/store';
import {SignUpThunk} from '../../features/auth/AuthSlice';
import { Link,useHistory } from 'react-router-dom';
import { Formik } from "formik";
import * as yup from "yup";
import './SignUpPage.css';
import Recaptcha from 'react-recaptcha'; 




const validationSchema = yup.object().shape({
    email: yup.string()
      .email("Invalid email format")
      .required("This is a required field")
      .strict(),
    password : yup.string()
    .min(8,'The password should be of minimum 8 characters!')
    .required('This field is required!'),
    password2 : yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
    

  
  })
  
  const formInitialValues = {
    email:'',
    password:'',
    password2:''
  }




export const SignUpPage = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const history = useHistory();
    const siteKey = '6Lf6TtsaAAAAAGpdnPlDVBwsFXYKPrTpPU5GtDo5';    

    const recaptchaCallback = () =>{
      console.log("Loaded baby!"); 
    }
    const onRecaptchaVerified = (args)=>{
      console.log("INNINII")
      console.log(args);
    }

    return (
        <div id="signup-page-main-background">
                  <Formik
            initialValues={formInitialValues}
            validationSchema={validationSchema}
            onSubmit={async(values) => {
              const result = await store.dispatch(SignUpThunk(values));
              console.log(result);
              if (result.payload.success){

                  history.push('/home')
              }else{
                alert("Error signing up!")
              }
            }}>
            {
              ({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => {
                return (
                <Form id="signup-page-main-area">
                        <span id='signup-page-heading-area'>
                        <span className="signup-page-main-heading" id="SIGN">Sign </span>
                         <span className="signup-page-main-heading" id="UP"> Up</span>
                       
                        </span>
                        <Form.Group className="signup-page-form-group">
                    <Form.Control  placeholder="john@mail.com" id='login-input-email' required type="email"                          name="message"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={errors.email}
                          name="email"
                             className="signup-page-input"/>

                        <Form.Control.Feedback type='invalid' className="ml-3">
                          {errors.email}
                        </Form.Control.Feedback>
                        </Form.Group>


                        <Form.Group className="signup-page-form-group">
                        <Form.Control required type="password"
                    name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={errors.password}
                    placeholder="**********" id='login-input-password' className="signup-page-input"/>

                        <Form.Control.Feedback type='invalid' className="ml-3">       
                          {errors.password}
                        </Form.Control.Feedback>
                        </Form.Group>
                    
                    <Form.Group className="signup-page-form-group">
                    <Form.Control required type="password"
                    name="password2"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={errors.password2}
                    placeholder="**********" id='login-input-password2' className="signup-page-input"/>
                        <Form.Control.Feedback type='invalid' className="ml-3">       
                          {errors.password2}
                        </Form.Control.Feedback>


                    </Form.Group>
                    <Recaptcha sitekey={siteKey}
                    render="explicit"
                    onloadCallback={recaptchaCallback}
                    verifyCallback={onRecaptchaVerified}
                    />

                    <Button onClick={(e)=>{
                        e.preventDefault();
                        handleSubmit();
                    }} 
                    
                    type="submit"
                    id="submit-button">Submit</Button>
                    <Link style={{color:"white"}} to="/log-in">Already have an account? Sign In!</Link>
                </Form>)
              }}
              </Formik>
        </div>
    )
 
 
}


 
