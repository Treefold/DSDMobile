import { createContext, useContext, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// value: light / dark
const ThemeContext = createContext("light");

const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}

const CustomButton = () => {
  const {theme, toggleTheme} = useContext(ThemeContext);

  return (
    <TouchableOpacity style={{backgroundColor: theme === "light" ? "gray" : "white" }} onPress={toggleTheme}>
      <Text>Toggle Theme</Text>
    </TouchableOpacity>  
  )
}

const CustomTextInput = () => {
  const {theme} = useContext(ThemeContext);

  return (
    <TextInput style={{backgroundColor: theme === "light" ? "gray" : "white" }} />
  )
}

const CustomView = ({children}) => {
  const {theme} = useContext(ThemeContext);

  return (
    <View style={{backgroundColor: theme === "light" ? "gray" : "white" }}>
      (children)
    </View>
  )
}

export default function App() {
  const {theme} = useContext(ThemeContext);

  console.log('asd')

  return (
    <View style={{marginTop: 50}}>
      <ThemeProvider>
        <View style={{backgroundColor: theme === "light" ? "gray" : "white" }}>
          <CustomButton />
          <CustomTextInput />
        </View>
      </ThemeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    padding: 4,
    backgroundColor: 'gray',
  }
})