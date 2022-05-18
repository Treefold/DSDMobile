import React from 'react';
import {
    StyledContainer, InnerContainer, PageLogo, PageTitle
} from './../components/styles'

const Login = () => {
    return (
        <StyledContainer>
            <InnerContainer>
                <PageLogo resizeMode="cover" source={require('./../assets/img/Logo.png')} />
                <PageTitle>JustUs</PageTitle>
            </InnerContainer>
        </StyledContainer>
    );
}

export default Login;