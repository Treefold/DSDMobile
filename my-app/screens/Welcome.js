import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    InnerContainer, 
    PageTitle, SubTitle, 
    StyledButton, ButtonText,
    Line,
    WelcomeContainter, Avatar, WelcomeImage,
} from './../components/styles';


const Welcome = ({ navigation, route }) => {

    const {name, email} = route.params;

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
                    <StyledButton onPress={() => {navigation.navigate("Login");}}>
                        <ButtonText>Logout</ButtonText>
                    </StyledButton>

                </WelcomeContainter>
            </InnerContainer>
        </>
    );
}

export default Welcome;