import React, { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { CredentialsContext } from './../components/CredentialsContext';
import {
    InnerContainer, 
    PageTitle, SubTitle, 
    StyledButton, ButtonText,
    Line,
    WelcomeContainter, Avatar, WelcomeImage,
} from './../components/styles';


const Welcome = () => {

    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {name, email} = storedCredentials;

    return (
        <>
            <StatusBar style='dark' />
            <InnerContainer>
                <WelcomeImage resizeMode="cover" source={require('./../assets/img/Logo.png')} />
                <WelcomeContainter>

                    <PageTitle welcome={true}>Welocome,</PageTitle>
                    <SubTitle welcome={true}>{name || 'Test'}</SubTitle>
                    <SubTitle welcome={true}>{email || 'test@mail.com'}</SubTitle>
                    <Avatar resizeMode="cover" source={require('./../assets/img/Logo.png')} />

                    <Line />
                    <StyledButton onPress={() => {
                        AsyncStorage.removeItem('normalCredentials')
                        .then(() => {
                            setStoredCredentials ('');
                        }).catch(err => console.log(err));
                    }}>
                        <ButtonText>Logout</ButtonText>
                    </StyledButton>

                </WelcomeContainter>
            </InnerContainer>
        </>
    );
}

export default Welcome;