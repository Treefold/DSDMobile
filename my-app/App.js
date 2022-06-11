import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RootStack from './navigation/RootStack';
import AppLoading from "expo-app-loading";
import { CredentialsContext } from './components/CredentialsContext';

const App = () => {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState(null);

  const checkLoginCredentials = () => {
    AsyncStorage.getItem('normalCredentials')
      .then((result) => {
        console.log("result", result);
        if (result) {
          setStoredCredentials(JSON.parse(result));
        } else {
          setStoredCredentials(null);
        }
      })
      .catch(err => console.log(err));
  };

  if (!appReady) {
    return (<AppLoading 
      startAsync={checkLoginCredentials}
      onFinish={() => setAppReady(true)}
      onError={console.log}
    />);
  }

  return (
    /* Context API */
    <CredentialsContext.Provider value={{storedCredentials, setStoredCredentials}}>
      <RootStack />
    </CredentialsContext.Provider>
  );
}


export default App;