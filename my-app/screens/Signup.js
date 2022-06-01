import React, {useState} from 'react';
import { TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { Ionicons, Octicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import KeyboardAvoindingWrapper from '../components/KeyboardAvoindingWrapper';
import {
    Colors,
    StyledContainer, InnerContainer, 
    PageTitle, SubTitle, 
    StyledFormArea, StyledInputLabel, StyledTextInput, StyledButton, ButtonText,
    LeftIcon, RightIcon,
    MsgBox, Line,
    ExtraView, ExtraText, TextLink, TextLinkContent,
} from './../components/styles';

const { brand, darkLight } = Colors;

const Signup = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0, 1));

    const onDateChange = (_event, selectedDate) => {
        setDate(selectedDate);
        setShow(false);
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
                        initialValues={{fullName: '', email: '', dateOfBirth: '', password: '', confirmPassword: '' }}
                        onSubmit={(values) => {
                            console.log(values);
                            navigation.navigate("Welcome");
                        }}
                    >
                        {({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>

                            <MyTextInput 
                                label="Full Name" 
                                icon="person" 
                                placeholder="Ion Ionescu" 
                                placeholderTextColor={darkLight}
                                onChange={handleChange('fullName')}
                                onBlur={handleBlur('fullName')}
                                value={values.fullName}
                            />
                            
                            <MyTextInput 
                                label="Email Address" 
                                icon="mail" 
                                placeholder="example@mail.com" 
                                placeholderTextColor={darkLight}
                                onChange={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                            />
                            
                            <MyTextInput 
                                label="Date of Birth" 
                                icon="calendar" 
                                placeholder="YYYY - MM - DD" 
                                placeholderTextColor={darkLight}
                                onChange={handleChange('dateOfBirth')}
                                onBlur={handleBlur('dateOfBirth')}
                                value={date.toDateString()}
                                isDate={true}
                                editable={false}
                                showDatePicker={showDatePicker}
                            />

                            <MyTextInput 
                                label="Password" 
                                icon="lock" 
                                placeholder="********" 
                                placeholderTextColor={darkLight}
                                onChange={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword={setHidePassword}
                            />

                            <MyTextInput 
                                label="Confirm Password" 
                                icon="lock" 
                                placeholder="********" 
                                placeholderTextColor={darkLight}
                                onChange={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword={setHidePassword}
                            />

                            <MsgBox>...</MsgBox>
                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>Signup</ButtonText>
                            </StyledButton>
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