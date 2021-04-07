import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import {
  Text,
  Alert,
  Button,
  TextInput,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';


const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    {children}
  </TouchableWithoutFeedback>
);

const MainView = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const Input = styled.TextInput`
  width: 200px;
  height: 50px;
  border-width: 1px;
  border-color: black;
  margin-bottom: 10px;
  padding: 8px 16px;
  fontSize: 20px;
`;

const Header = styled.Text`
  fontSize: 20px;
  fontWeight: 700;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <DismissKeyboard>
      <View>
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />

        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
        />

        <Button
          title="Login"
          onPress={() => console.log("hiho")}
        />
      </View>
    </DismissKeyboard>
  );
};

export default function App() {
  return (
    <MainView>
      <Header>Login Dude</Header>
      <Login />
      <StatusBar style="auto" />
    </MainView>
  );
}
