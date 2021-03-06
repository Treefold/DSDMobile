import React, { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import ShareComponent from './../components/ShareComponent';
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
    const {name, email, photoUrl, dateOfBirth} = storedCredentials;
    const avatarSource = photoUrl ? {uri: photoUrl} : require('./../assets/img/Logo.png');

    const today = new Date();
    const startBirthday = new Date(dateOfBirth || today);
    const myAge = today.getFullYear() - startBirthday.getFullYear();
    startBirthday.setFullYear(today.getFullYear())
    const endBirthday = new Date(startBirthday);
    endBirthday.setDate(endBirthday.getDate() + 1)

    if (today >= endBirthday) {
        // next year :(
        startBirthday.setFullYear(startBirthday.getFullYear() + 1);
    }
    const daysToMyNextBirthday = Math.ceil((startBirthday - today) / (1000 * 3600 * 24));
    const isMyBirthday = (daysToMyNextBirthday == 0);
    
    return (
        <>
            <StatusBar style='dark' />
            <InnerContainer>
                <WelcomeImage resizeMode="cover" source={require('./../assets/img/Logo.png')} />
                <WelcomeContainter>

                    <PageTitle welcome={true}>Welocome,</PageTitle>
                    <SubTitle welcome={true}>{name || 'Test'}</SubTitle>
                    <SubTitle welcome={true}>{email || 'test@mail.com'}</SubTitle>
                    <Avatar resizeMode="cover" source={avatarSource} />

                    {!dateOfBirth  && (
                        <SubTitle welcome={true}>
                            Birthdate unknown, so happy birthday anyway!
                        </SubTitle>
                    )}
                    {dateOfBirth && !isMyBirthday && (   
                        <SubTitle welcome={true}>
                            Your birthday is in {daysToMyNextBirthday} {daysToMyNextBirthday > 1 ? 'days' : 'day' }
                        </SubTitle>
                    )}
                    {dateOfBirth && isMyBirthday && (<>
                        <SubTitle welcome={true}>
                            Happy birthday!
                        </SubTitle>
                        <ShareComponent shareMessage={"Happy birthday to me! I'm " + myAge + " now. Also, you are invited to my party!"} shareButtonText="Let everybody know!" />
                    </>)}

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