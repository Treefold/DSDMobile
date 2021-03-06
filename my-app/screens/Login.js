import React, { useState, useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import axios from 'axios';
import * as Google from "expo-google-app-auth"
import { Fontisto, } from '@expo/vector-icons';
import env from "./../env";

import LoadingComponent from './../components/LoadingComponent';
import CredentialsContext from './../components/CredentialsContext';
import FormikTextInput from './../components/FormikTextInput';
import KeyboardAvoindingWrapper from './../components/KeyboardAvoindingWrapper';
import {
    Colors,
    StyledContainer, InnerContainer, 
    PageLogo, PageTitle, SubTitle, 
    StyledFormArea, StyledButton, ButtonText,
    MsgBox, Line,
    ExtraView, ExtraText, TextLink, TextLinkContent,
} from './../components/styles';

const { darkLight, primary } = Colors;

const Login = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState(); 
    const [googleSubmitting, setGoogleSubmitting] = useState(false);

    const { setStoredCredentials } = useContext(CredentialsContext);

    const handleMessage = (message, type = 'FAILED') => {
        setMessage (message);
        setMessageType (type);
    }
    
    const persistLogin = (credentials) => {
        AsyncStorage.setItem('normalCredentials', JSON.stringify(credentials))
        .then(() => {
            setStoredCredentials(credentials);
        }).catch( err => {
            console.log(err);
            handleMessage('Login Persisting failed');
        })
    };

    const handleLogin = (credentials, setSubmitting) => {
        handleMessage(null);

        const url = env.endpoint + 'sessions';

        axios.post(url, credentials).then((response) => {
            persistLogin ({...response?.data})
        }).catch((error) => {
            handleMessage(error?.response?.data || 'An error occured', 'FAILED');
        }).finally(() => {
            setSubmitting(false);
        });
    };

    const handleGoogleSignin = () => {
        setGoogleSubmitting(true);
        const config = {
            androidClientId: env.androidClientId,
            iosClientId: env.iosClientId,
            scopes: ['profile', 'email'], //'https://www.googleapis.com/auth/user.birthday.read'
        }

        Google
            .logInAsync(config)
            .then((result) => {
                const {type, user, accessToken, refreshToken} = result;
                if (type == 'success') {
                    const {email, name, photoUrl} = user;
                    handleMessage('Successful Google Signin', 'SUCCESS');
                    setTimeout(() => {
                        handleMessage(null);
                        setGoogleSubmitting(false);
                        persistLogin ({email, name, photoUrl, accessToken, refreshToken})
                    }, 3000); // 3s
                } else {
                    handleMessage('Unsuccessful Google Signin', 'FAILED');
                    setGoogleSubmitting(false);
                }
                
            }).catch((error) => {
                console.log(error);
                handleMessage('Failed to sign in into with Google', 'FAILED');
                setGoogleSubmitting(false);
            });
    };

    return (<>
        {googleSubmitting && (
            <LoadingComponent />
        )}

        {!googleSubmitting && (<>
            <KeyboardAvoindingWrapper><StyledContainer>
                <StatusBar style='dark' />
                <InnerContainer> 
                    <PageLogo resizeMode="cover" source={require('./../assets/img/Logo.png')} />
                    <PageTitle>JustUs</PageTitle>
                    <SubTitle>Account Login</SubTitle>
                    
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={(values, { setSubmitting }) => {
                            if (!(values.email?.length > 0 && values.password?.length > 0 )) {
                                handleMessage("Please fill all fields");
                                setSubmitting(false);
                                return;
                            }
                            
                            handleLogin(values, setSubmitting);
                            setSubmitting(false);
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (<StyledFormArea>
                            <FormikTextInput
                                label="Email Address" 
                                icon="mail" 
                                placeholder="example@mail.com" 
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                            />
                            <FormikTextInput
                                label="Password" 
                                icon="lock" 
                                placeholder="********" 
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword={setHidePassword}
                            />

                            <MsgBox type={messageType}>{message}</MsgBox>
                            
                            {!isSubmitting && <StyledButton onPress={handleSubmit}>
                                <ButtonText>Login</ButtonText>
                            </StyledButton>}
                            {isSubmitting && <StyledButton disable={true}>
                                <ActivityIndicator size="small" color={primary} />
                            </StyledButton>}

                            <Line />

                            {!googleSubmitting && (
                                <StyledButton google={true} onPress={handleGoogleSignin}>
                                    <Fontisto name="google" color={primary} size={25} />
                                    <ButtonText google={true}>Sigh in with google</ButtonText>
                                </StyledButton>
                            )}
                            {googleSubmitting && (
                                <StyledButton google={true}  disable={true}>
                                    <ActivityIndicator size="small" color={primary} />
                                </StyledButton>
                            )}

                            <ExtraView>
                                <ExtraText>Don't have an account already? </ExtraText>
                                <TextLink onPress={() => {navigation.navigate("Signup");}}>
                                    <TextLinkContent>Signup</TextLinkContent>
                                </TextLink>
                            </ExtraView>
                            
                        </StyledFormArea>)}
                    </Formik>

                </InnerContainer>
            </StyledContainer></KeyboardAvoindingWrapper>
        </>)}
    </>);
}
  
export default Login;