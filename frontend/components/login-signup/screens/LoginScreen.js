import React, { useContext, useState } from 'react'
import { TouchableOpacity, StyleSheet, View,TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../element/Background'
import Logo from '../element/Logo'
import Header from '../element/Header'
import Button from '../element/Button'
import TextInput from '../element/TextInput'
import BackButton from '../element/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import axios from 'axios'
import { AsyncStorage } from 'react-native'
import { userContext } from '../../../context/userContext'
import { setToken } from '../../../Auth'
//test
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [error,setError]=useState();
  const {setUser} = useContext(userContext);

  const url="http://192.168.1.21:8000/login"

  const onLoginPressed = async () => {
    const emailValue = email.value; 
    const passwordValue = password.value; 

    const resultObj = {
      email: emailValue,
      password: passwordValue,
    };
    try {
      const response = await axios.post(url, resultObj);
      await setToken(response.data.token);
      setUser(response.data.user)
      navigation.navigate('DrawNavigation');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{flex: 1}}>
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome back</Header>
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
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
    </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.primary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
