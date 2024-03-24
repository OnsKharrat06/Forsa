import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../element/Background';
import Logo from '../element/Logo';
import Header from '../element/Header';
import Button from '../element/Button';
import TextInput from '../element/TextInput';
import BackButton from '../element/BackButton';
import { theme } from '../core/theme';
import { emailValidator } from '../helpers/emailValidator';
import { passwordValidator } from '../helpers/passwordValidator';
import { nameValidator } from '../helpers/nameValidator';
import axios from 'axios';
//test
export default function RegisterScreen({ navigation }) {
  const [fname, setFName] = useState({ value: '', error: '' });
  const [lname, setLName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [phone, setPhone] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const url = "http://192.168.1.21:8000/users";

  const onSignUpPressed = () => {
    const fnameError = nameValidator(fname.value);
    const lnameError = nameValidator(lname.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError || fnameError || lnameError) {
      setFName({ ...fname, error: fnameError });
      setLName({ ...lname, error: lnameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    const userData = {
      fname: fname.value,
      lname: lname.value,
      email: email.value,
      phone: phone.value,
      password: password.value
    };
    axios.post(url, userData)
      .then(response => {
        console.log(response.data);
        navigation.navigate('LoginScreen');
      })
      .catch(error => {
        console.error("Registration failed", error);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <Background>
          <BackButton goBack={navigation.goBack} />
          <Logo />
          <Header>Create Account</Header>
          <TextInput
            label="First Name"
            returnKeyType="next"
            value={fname.value}
            onChangeText={(text) => setFName({ value: text, error: '' })}
            error={!!fname.error}
            errorText={fname.error}
          />
          <TextInput
            label="Last Name"
            returnKeyType="next"
            value={lname.value}
            onChangeText={(text) => setLName({ value: text, error: '' })}
            error={!!lname.error}
            errorText={lname.error}
          />
           <TextInput
            label="Phone"
            returnKeyType="next"
            value={phone.value}
            onChangeText={(text) => setPhone({ value: text, error: '' })}
          />
          <TextInput
            label="Email"
            returnKeyType="next"
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: '' })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <TextInput
            label="Password"
            returnKeyType="done"
            value={password.value}
            onChangeText={(text) => setPassword({ value: text, error: '' })}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
          />
          <Button
            mode="contained"
            onPress={onSignUpPressed}
            style={{ marginTop: 24 }}
          >
            Sign Up
          </Button>
          <View style={styles.row}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
          </View>
        </Background>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
