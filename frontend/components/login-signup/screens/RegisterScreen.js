import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
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
import { SelectList } from 'react-native-dropdown-select-list'
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import { COLORS } from "../../../constants";

const citiesInTunisia = [
  { key: '1', value: 'Ariana' },
  { key: '2', value: 'Bizerte' },
  { key: '3', value: 'Ben Arous' },
  { key: '4', value: 'Gabès' },
  { key: '5', value: 'Gafsa' },
  { key: '6', value: 'Jendouba' },
  { key: '7', value: 'Kairouan' },
  { key: '8', value: 'Kasserine' },
  { key: '9', value: 'Kebili' },
  { key: '10', value: 'Monastir' },
  { key: '11', value: 'Mahdia' },
  { key: '12', value: 'Manouba' },
  { key: '13', value: 'Médenine' },
  { key: '14', value: 'Nabeul' },
  { key: '15', value: 'Sfax' },
  { key: '16', value: 'Sousse' },
  { key: '17', value: 'Siliana' },
  { key: '18', value: 'Tunis' },
  { key: '19', value: 'Tozeur' },
  { key: '20', value: 'Tataouine' },
  { key: '21', value: 'Zaghouan' }
];

const industries =[
  { key: '1', value: 'Mining & Metals' },
  { key: '2', value: 'Oil & Energy' },
  { key: '3', value: 'Pharmaceuticals' },
  { key: '4', value: 'Food Production' },
  { key: '5', value: 'Aviation & Aerospace' },
  { key: '6', value: 'Automotive' },
  { key: '7', value: 'Chemicals' },
  { key: '8', value: 'Machinery' },
  { key: '9', value: 'Textiles' },
  { key: '10', value: 'Paper & Forest Products' },
  { key: '11', value: 'Printing' },
  { key: '12', value: 'Electrical & Electronic Manufacturing' },
  { key: '13', value: 'Plastics' },
  { key: '14', value: 'Renewables & Environment' },
  { key: '15', value: 'Packaging & Containers' },
  { key: '16', value: 'Industrial Automation' },
  { key: '17', value: 'Computer Hardware' },
  { key: '18', value: 'Computer Software' },
  { key: '19', value: 'Computer Networking' },
  { key: '20', value: 'Internet' },
  { key: '21', value: 'Semiconductors' },
  { key: '22', value: 'Telecommunications' },
  { key: '23', value: 'Motion Pictures & Film' },
  { key: '24', value: 'Broadcast Media' },
  { key: '25', value: 'Newspapers' },
  { key: '26', value: 'Publishing' },
  { key: '27', value: 'Information Technology & Services' },
  { key: '28', value: 'Writing & Editing' },
  { key: '29', value: 'Computer Games' },
  { key: '30', value: 'Online Media' },
  { key: '31', value: 'Computer & Network Security' },
  { key: '32', value: 'Media Production' },
  { key: '33', value: 'Banking' },
  { key: '34', value: 'Insurance' },
  { key: '35', value: 'Financial Services' },
  { key: '36', value: 'Investment Banking' },
  { key: '37', value: 'Investment Management' },
  { key: '38', value: 'Venture Capital & Private Equity' },
  { key: '39', value: 'Law Practice' },
  { key: '40', value: 'Legal Services' },
  { key: '41', value: 'Management Consulting' },
  { key: '42', value: 'Biotechnology' },
  { key: '43', value: 'Veterinary' },
  { key: '44', value: 'Accounting' },
  { key: '45', value: 'Architecture & Planning' },
  { key: '46', value: 'Research' },
  { key: '47', value: 'Executive Office' },
  { key: '48', value: 'Marketing & Advertising' },
  { key: '49', value: 'Information Services' },
  { key: '50', value: 'Environmental Services' },
  { key: '51', value: 'Market Research' },
  { key: '52', value: 'Public Relations & Communications' },
  { key: '53', value: 'Design' },
  { key: '54', value: 'Professional Training & Coaching' },
  { key: '55', value: 'Translation & Localization' },
  { key: '56', value: 'Events Services' },
  { key: '57', value: 'Outsourcing/Offshoring' },
  { key: '58', value: 'Mechanical Or Industrial Engineering' },
  { key: '59', value: 'Photography' },
  { key: '60', value: 'Graphic Design' },
  { key: '61', value: 'Entertainment' },
  { key: '62', value: 'Gambling & Casinos' },
  { key: '63', value: 'Sports' },
  { key: '64', value: 'Museums & Institutions' },
  { key: '65', value: 'Fine Art' },
  { key: '66', value: 'Performing Arts' },
  { key: '67', value: 'Arts & Crafts' },
  { key: '68', value: 'Music' },
  { key: '69', value: 'Health, Wellness & Fitness' },
  { key: '70', value: 'Animation' }
];

export default function RegisterScreen({ navigation }) {
  const [fname, setFName] = useState({ value: '', error: '' });
  const [lname, setLName] = useState({ value: '', error: '' });
  const [age, setAge] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [phone, setPhone] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [selectedCity, setSelectedCity] = useState({ value: '', error: '' });
  const [selectedIndustry, setSelectedIndustry] = useState([]);

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
      age: age.value,
      email: email.value,
      phone: phone.value,
      password: password.value,
      city: selectedCity,
      industries: selectedIndustry.map(item => item.value)
    };
    console.log("User Data:", userData);
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
          <ScrollView contentContainerStyle={styles.container}>
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
              label="Age"
              returnKeyType="next"
              value={age.value}
              onChangeText={(text) => setAge({ value: text, error: '' })}
            />
            <TextInput
              label="Phone"
              returnKeyType="next"
              value={phone.value}
              onChangeText={(text) => setPhone({ value: text, error: '' })}
            />
            <SelectList
              placeholder="City"
              setSelected={(val) => setSelectedCity(val)}
              data={citiesInTunisia}
              save="value"
              boxStyles={{ backgroundColor: COLORS.lightWhite, borderRadius: 5, width: 300 ,marginTop: 20}}
              dropdownStyles={{ backgroundColor: COLORS.lightWhite }}
            />
            <MultipleSelectList
              placeholder="Industry"
              setSelected={(val) => setSelectedIndustry(val)}
              data={industries}
              save="value"
              label="Industry"
              boxStyles={{ backgroundColor: COLORS.lightWhite, borderRadius: 5, width: 300 , marginTop: 30}}
              dropdownStyles={{ backgroundColor: COLORS.lightWhite }}
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

          </ScrollView>
          <Button
            mode="contained"
            onPress={onSignUpPressed}
            style={{
              marginTop: 4,
            }}
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
    marginBottom: 25
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  container: {
    marginTop: 25,
    alignContent: 'center',
    alignItems: 'center'
  }

});
