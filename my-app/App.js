import { createContext, useContext, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native'

const Column = styled(View)`
  flex-direction: column;
`;

const Row = styled(View)`
  flex-direction: row;
`;

const Container = styled(View)`
  flex: 1;
  align-items: center;
  padding-top: 50px;
  background-color: #f7e6b7;
`;

const CustomTextInput = styled(TextInput)`
  width: 150px;
  height: 30px;
  background-color: #d4be83;
  border-radius: 5px;
  padding-left: 5px;
`;

const CustomButton = styled(TouchableOpacity)`
  width: 80px;
  height: 30px;
  background-color: #d4be83;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;

export default function App() {

  const [text, setText] = useState('');

  return (
    <Container>
      <CustomTextInput value={text} onChangeText={setText} />
      <CustomButton>
        <Text>Add to list</Text>
      </CustomButton>
    </Container>
  );
}