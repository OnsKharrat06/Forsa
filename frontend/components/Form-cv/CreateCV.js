import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,ImageBackground } from 'react-native';

const Form = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [resume, setResume] = useState('');

    const handleSubmit = () => {
        // Implement your form submission logic here
        // You can send the form data to your server or perform any other action
        console.log('Form submitted!');
    };

    return (
        <ImageBackground
            source={require("../../assets/images/bg.png")}
            resizeMode="stretch"
            style={{ flex: 1 }}
        >
            <View style={styles.container}>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />

                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    keyboardType="email-address"
                />

                <Text style={styles.label}>Phone:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your phone number"
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                    keyboardType="phone-pad"
                />

                <Text style={styles.label}>Skills:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your skills"
                    value={resume}
                    onChangeText={(text) => setResume(text)}
                />

                <Button title="Submit" onPress={handleSubmit} />

            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
    },
});

export default Form;
