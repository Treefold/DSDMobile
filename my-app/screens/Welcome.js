import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    InnerContainer, 
    PageTitle, SubTitle, 
    StyledButton, ButtonText,
    Line,
    WelcomeContainter, Avatar, WelcomeImage,
} from './../components/styles';


const Welcome = () => {

    return (
        <>
            <StatusBar style='dark' />
            <InnerContainer>
                <WelcomeImage resizeMode="cover" source={require('./../assets/img/Logo.png')} />
                <WelcomeContainter>

                    <PageTitle welcome={true}>Welocome,</PageTitle>
                    <SubTitle welcome={true}>Mihai</SubTitle>
                    <Avatar resizeMode="cover" source={require('./../assets/img/Logo.png')} />

                    <Line />
                    <StyledButton onPress={() => {}}>
                        <ButtonText>Logout</ButtonText>
                    </StyledButton>

                </WelcomeContainter>
            </InnerContainer>
        </>
    );
}

export default Welcome;