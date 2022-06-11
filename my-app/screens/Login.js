import React, {useState} from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import axios from 'axios';
import { Fontisto, Ionicons, Octicons } from '@expo/vector-icons';
import env from "./../env";

import KeyboardAvoindingWrapper from './../components/KeyboardAvoindingWrapper';
import {
    Colors,
    StyledContainer, InnerContainer, 
    PageLogo, PageTitle, SubTitle, 
    StyledFormArea, StyledInputLabel, StyledTextInput, StyledButton, ButtonText,
    LeftIcon, RightIcon,
    MsgBox, Line,
    ExtraView, ExtraText, TextLink, TextLinkContent,
} from './../components/styles';

const { brand, darkLight, primary } = Colors;

const Login = ({navigation}) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState(); 

  const handleMessage = (message, type = 'FAILED') => {
      setMessage (message);
      setMessageType (type);
  }

  const handleLogin = (credentials, setSubmitting) => {
    handleMessage(null);

    const url = env.endpoint + 'sessions';

    axios.post(url, credentials).then((response) => {
        navigation.navigate('Welcome', {...response?.data});
        setSubmitting(false);
    }).catch((error) => {
        handleMessage(error?.response?.data || 'An error occured', 'FAILED');
        setSubmitting(false);
    });
  };
  
  return (    
    <KeyboardAvoindingWrapper>
      <StyledContainer>
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
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                <MyTextInput
                    label="Email Address" 
                    icon="mail" 
                    placeholder="example@mail.com" 
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email-address"
                />
                <MyTextInput
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
                <StyledButton onPress={handleSubmit}>
                    <ButtonText>Login</ButtonText>
                </StyledButton>
                
                {/* {!isSubmitting && <StyledButton onPress={handleSubmit}>
                    <ButtonText>Login</ButtonText>
                </StyledButton>}

                {isSubmitting && <StyledButton disable={true}>
                    <ActivityIndicator size="small" color={primary} />
                </StyledButton>} */}

                <Line />
                <StyledButton google={true} onPress={handleSubmit}>
                    <Fontisto name="google" color={primary} size={25} />
                    <ButtonText google={true}>Sigh in with google</ButtonText>
                </StyledButton>
                <ExtraView>
                    <ExtraText>Don't have an account already? </ExtraText>
                    <TextLink onPress={() => {navigation.navigate("Signup");}}>
                        <TextLinkContent>Signup</TextLinkContent>
                    </TextLink>
                </ExtraView>
                

              </StyledFormArea>)}
            </Formik> 

        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoindingWrapper>
 );
}

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return(
      <View>
          <LeftIcon>
              <Octicons name={icon} size={30} color={brand} />
          </LeftIcon>
          <StyledInputLabel>{label}</StyledInputLabel>
          <StyledTextInput {...props} />
          {isPassword && (
              <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                  <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} /> 
              </RightIcon>   
          )}
      </View>
  );
}
  
export default Login;