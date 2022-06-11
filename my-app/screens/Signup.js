import React, {useState, useContext} from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import axios from 'axios';
import { Ionicons, Octicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import env from "./../env";
import { CredentialsContext } from './../components/CredentialsContext';
import KeyboardAvoindingWrapper from './../components/KeyboardAvoindingWrapper';
import {
    Colors,
    StyledContainer, InnerContainer, 
    PageTitle, SubTitle, 
    StyledFormArea, StyledInputLabel, StyledTextInput, StyledButton, ButtonText,
    LeftIcon, RightIcon,
    MsgBox, Line,
    ExtraView, ExtraText, TextLink, TextLinkContent,
} from './../components/styles';

const { brand, darkLight, primary } = Colors;

const Signup = ({navigation}) => {
    const defaultDate = new Date(2000, 0, 1);
    const [hidePassword, setHidePassword] = useState(true);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(defaultDate);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState(); 
    const [errMessages, setErrMessages] = useState({});

    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
  
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
  
    const handleSignup = (credentials, setSubmitting) => {
        handleMessage(null);
        setErrMessages({});
    
        const url = env.endpoint + 'users';
    
        axios.post(url, credentials).then((response) => {
            persistLogin ({...response?.data})
        }).catch((error) => {
            const rawErrors = error?.response?.data || [];
            const newErrMessages = {};
            rawErrors.forEach ( (rawErr) => {
                const msgId = rawErr?.path[1];
                newErrMessages[msgId] = rawErr?.message;
            })
            setErrMessages(newErrMessages);
        }).finally(() => {
            setSubmitting(false);
        });
    };

    const onDateChange = (_event, selectedDate) => {
        if (selectedDate)
        {
            setDate(selectedDate);
            setShow(false);
        }
    }

    const showDatePicker = () => {
        setShow(true);
    }

    return (
        <KeyboardAvoindingWrapper>
            <StyledContainer>
                <StatusBar style='dark' />
                <InnerContainer>
                    <PageTitle>JustUs</PageTitle>
                    <SubTitle>Account Signup</SubTitle>

                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            maximumDate={new Date()} // today
                            mode='date'
                            is24Hour={true}
                            display="default"
                            onChange={onDateChange}
                        />
                    )}

                    <Formik
                        initialValues={{name: '', email: '', dateOfBirth: '', password: '', passwordConfirmation: '' }}
                        onSubmit={(values, { setSubmitting }) => {
                            values = {...values, dateOfBirth: (date || defaultDate).toLocaleDateString() }
                            if (!(
                                values.name?.length > 0 && 
                                values.email?.length > 0 && 
                                values.password?.length > 0  
                                && values.passwordConfirmation?.length > 0 
                                && values.dateOfBirth?.length > 0 
                            )) {
                                handleMessage("Please fill all fields");
                                setSubmitting(false);
                                return;
                            } else if (values.password != values.passwordConfirmation) {
                                handleMessage("Passwords do not match");
                                setSubmitting(false);
                                return;
                            }
                            
                            handleSignup(values, setSubmitting);
                            setSubmitting(false);
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (<StyledFormArea>

                            <MsgBox type={'FAILED'}>{errMessages?.name || null}</MsgBox>
                            <MyTextInput 
                                label="Full Name" 
                                icon="person" 
                                placeholder="Ion Ionescu" 
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                            />
                            
                            <MsgBox type={'FAILED'}>{errMessages?.email || null}</MsgBox>
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
                            
                            <MsgBox type={'FAILED'}>{errMessages?.dateOfBirth || null}</MsgBox>
                            <MyTextInput 
                                label="Date of Birth" 
                                icon="calendar" 
                                placeholder="YYYY - MM - DD" 
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('dateOfBirth')}
                                onBlur={handleBlur('dateOfBirth')}
                                value={(date || defaultDate).toLocaleDateString()}
                                isDate={true}
                                editable={false}
                                showDatePicker={showDatePicker}
                            />

                            <MsgBox type={'FAILED'}>{errMessages?.password || null}</MsgBox>
                            <MyTextInput 
                                label="Password" 
                                icon="lock" 
                                placeholder="********" 
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword={setHidePassword}
                            />

                            <MsgBox type={'FAILED'}>{errMessages?.passwordConfirmation || null}</MsgBox>
                            <MyTextInput 
                                label="Confirm Password" 
                                icon="lock" 
                                placeholder="********" 
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('passwordConfirmation')}
                                onBlur={handleBlur('passwordConfirmation')}
                                value={values.passwordConfirmation}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword={setHidePassword}
                            />

                            <MsgBox type={messageType}>{message}</MsgBox>                           
                
                            {!isSubmitting && <StyledButton onPress={handleSubmit}>
                                <ButtonText>Signup</ButtonText>
                            </StyledButton>}
                            {isSubmitting && <StyledButton disable={true}>
                                <ActivityIndicator size="small" color={primary} />
                            </StyledButton>}

                            <Line />
                            <ExtraView>
                                <ExtraText>Already Have an account? </ExtraText>
                                <TextLink onPress={() => {navigation.navigate("Login");}}>
                                    <TextLinkContent>Login</TextLinkContent>
                                </TextLink>
                            </ExtraView>

                        </StyledFormArea>)}
                    </Formik>

                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoindingWrapper>
    );
}

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props }) => {
    return(
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            {!isDate && <StyledTextInput {...props} />}
            {isDate && (
                <TouchableOpacity onPress={showDatePicker}>
                    <StyledTextInput {...props} />
                </TouchableOpacity> 
            )}
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} /> 
                </RightIcon>   
            )}
        </View>
    );
}

export default Signup;