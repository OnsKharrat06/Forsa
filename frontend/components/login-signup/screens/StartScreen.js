import React from 'react'
import Background from '../element/Background'
import Logo from '../element/Logo'
import Header from '../element/Header'
import Button from '../element/Button'
import Paragraph from '../element/Paragraph'

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Logo />
      {/* <Header>Login Template</Header> */}
      <Paragraph>
        Unlock Your Next Opportunity
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button>
    </Background>
  )
}
