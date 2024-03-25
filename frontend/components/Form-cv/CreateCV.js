import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { COLORS } from '../../constants';
import BackButton from '../../components/login-signup/element/BackButton';

const Form = ({ navigation }) => {
    const [formData, setFormData] = useState({});

    const handleInputChange = (id, value) => {
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = () => {
        // Implement your form submission logic here
        // You can send the form data to your server or perform any other action
        console.log('Form submitted!', formData);
        // Navigate to the CV screen and pass the form data as a parameter
        navigation.navigate('CVScreen', { formData: formData });
    };

    return (
        <ImageBackground
            source={require("../../assets/images/bg.png")}
            resizeMode="stretch"
            style={{ flex: 1 }}
        >
            <BackButton goBack={navigation.goBack} />
            <ScrollView style={styles.container}>
                <View>
                    <Text style={styles.label}>Education:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your Education"
                        value={formData[1]}
                        onChangeText={(text) => handleInputChange(1, text)}
                        multiline={true}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Phone Number:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your Contact number"
                        value={formData[2]}
                        onChangeText={(text) => handleInputChange(2, text)}
                        keyboardType="numeric"
                    />
                </View>

                <View>
                    <Text style={styles.label}>Email Id:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your Email Id"
                        value={formData[3]}
                        onChangeText={(text) => handleInputChange(3, text)}
                        keyboardType="email-address"
                    />
                </View>

                <View>
                    <Text style={styles.label}>Address:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your Address"
                        value={formData[4]}
                        onChangeText={(text) => handleInputChange(4, text)}
                    />
                </View>

                <View>
                    <Text style={styles.label}>LinkedIn Id:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your LinkedIn Id"
                        value={formData[5]}
                        onChangeText={(text) => handleInputChange(5, text)}
                    />
                </View>


                <View>
                    <Text style={styles.label}>Technical Skills:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your Technical Skills"
                        value={formData[7]}
                        onChangeText={(text) => handleInputChange(7, text)}
                        multiline={true}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Non-Technical Skills:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your Non-Technical Skills"
                        value={formData[8]}
                        onChangeText={(text) => handleInputChange(8, text)}
                        
                    />
                </View>

                <View>
                    <Text style={styles.label}>Work Experience:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your Work Experience"
                        value={formData[10]}
                        onChangeText={(text) => handleInputChange(10, text)}
                        multiline={true}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Projects:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter you Projects"
                        value={formData[11]}
                        onChangeText={(text) => handleInputChange(11, text)}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Extra Curricular Activities:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your Extra Curricular Activities"
                        value={formData[13]}
                        onChangeText={(text) => handleInputChange(13, text)}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Hobbies:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your Hobbies"
                        value={formData[14]}
                        onChangeText={(text) => handleInputChange(14, text)}
                        multiline={true}
                    />
                </View>

                {/* Add more input fields as needed */}

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
