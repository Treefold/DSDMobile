import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from '../components/styles';
const { tertiary } = Colors;

import { CredentialsContext } from './../components/CredentialsContext';

// screens
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Welcome from './../screens/Welcome';

const Stack = createStackNavigator();

const RootStack = () => {
    return(
        /* Context API */
        <CredentialsContext.Consumer>
            {({ storedCredentials }) => (
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerStyled: {
                                backgroundColor: 'transparent'
                            },
                            headerTintColor: tertiary,
                            headerTransparent: true,
                            headerTitle: '',
                            headerLeftContainerStyle: {
                                paddingLeft: 20
                            }
                        }}
                        initialRouteName="Login"
                    >
                        { 
                            storedCredentials ? (
                                <Stack.Screen name="Welcome" component={Welcome} options={{ headerTintColor: 'black' }} />
                            ) : (
                                <>
                                    <Stack.Screen name="Login" component={Login} />
                                    <Stack.Screen name="Signup" component={Signup} />
                                </>
                            )
                        }
                    </Stack.Navigator>
                </NavigationContainer>
            )}
        </CredentialsContext.Consumer>
    );
}

export default RootStack;