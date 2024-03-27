import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { COLORS } from '../../constants';
import BackButton from '../../components/login-signup/element/BackButton';

const Form = () => {

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
            <ScrollView style={styles.container}>
                <View>
                    <Text style={styles.label}>Education:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your Education"
                        multiline={true}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Phone Number:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your Contact number"
                        keyboardType="numeric"
                    />
                </View>

                <View>
                    <Text style={styles.label}>Email Id:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your Email Id"
                        keyboardType="email-address"
                    />
                </View>

                <View>
                    <Text style={styles.label}>Address:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your Address"
                    />
                </View>

                <View>
                    <Text style={styles.label}>LinkedIn Id:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your LinkedIn Id"
                    />
                </View>


                <View>
                    <Text style={styles.label}>Skills:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your Technical Skills"
                        multiline={true}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Work Experience:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your Work Experience"
                        multiline={true}
                    />
                </View>

                <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 70,
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
    button: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 45,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
        marginBottom: 45,

    },
    buttonText: {
        color: COLORS.tertiary,
        textAlign: 'center',
    },

});

export default Form;
