import React, {useState} from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { Fontisto, Ionicons, Octicons } from '@expo/vector-icons';
import KeyboardAvoindingWrapper from '../components/KeyboardAvoindingWrapper';
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
                        onSubmit={(values) => {
                            console.log(values);
                            navigation.navigate("Welcome");
                        }}
                    >
                        {({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>

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

                            <MsgBox>...</MsgBox>
                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>Login</ButtonText>
                            </StyledButton>
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