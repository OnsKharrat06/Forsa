import React from 'react';
import { View, Text, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Assuming you're using Expo for vector icons

// Define color variable
const verdeolivo = '#556B2F';

const CVScreen = () => (
  <ScrollView contentContainerStyle={{ padding: 10 }}>
    {/* Contact Information */}
    <View style={{ alignItems: 'center', marginBottom: 10 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>John Doe</Text>
      <Text style={{ fontSize: 18 }}>
        <FontAwesome5 name="briefcase" /> Quality Engineer
      </Text>
      <View style={{ flexDirection: 'row', marginTop: 5 }}>
        <TouchableOpacity onPress={() => Linking.openURL('tel:1234567890')}>
          <FontAwesome5 name="phone" size={20} color={verdeolivo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('mailto:john.doe@example.com')}>
          <FontAwesome5 name="envelope" size={20} color={verdeolivo} style={{ marginLeft: 20 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/in/johndoe/')}>
          <FontAwesome5 name="linkedin" size={20} color={verdeolivo} style={{ marginLeft: 20 }} />
        </TouchableOpacity>
      </View>
    </View>

    {/* Professional Profile */}
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontSize: 20, color: verdeolivo }}>
        <FontAwesome5 name="user" /> Professional Profile
      </Text>
      <Text>
        I am a Chemical Engineer with a passion for problem solving and quality. With my experience with leading medical
        device manufacturing companies, I have developed skills and knowledge about the regulations of this highly
        regulated industry with high quality standards.
      </Text>
    </View>

    {/* Work Experience */}
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontSize: 20, color: verdeolivo }}>
        <FontAwesome5 name="building" /> Work Experience
      </Text>

      {/* ABCD Medical */}
      <View style={{ marginVertical: 5 }}>
        <Text style={{ fontWeight: 'bold' }}>ABCD Medical</Text>
        <Text style={{ fontStyle: 'italic' }}>Quality Engineer | Apr 2022 - Present</Text>
        <Text>
          Implementing regulations, GMP, Lean methodologies, and 6S. Conducting risk management and analysis through
          FMEAs. Developing and executing protocols, procedures, and validation reports (TMVs). Actively contributing
          to the creation of a Validation Master Plan for various new production lines. Defining Critical to Quality
          (CTQs), establishing quality controls, and developing validation strategies for IQs, OQs, PQs, PPQs as
          required. Drafting Component Specifications (CSs) and overseeing raw material inspection processes (FAIs).
          Collaborating closely with customers and working alongside operators, technicians, buyers, and sterilization
          teams to ensure quality and timely deliveries.
        </Text>
      </View>

      {/* Agroindustrial RIMAC */}
      <View style={{ marginVertical: 5 }}>
        <Text style={{ fontWeight: 'bold' }}>Agroindustrial RIMAC</Text>
        <Text style={{ fontStyle: 'italic' }}>Regulatory Assistant | Jan 2022 - Apr 2022</Text>
        <Text>To provide regulatory documentation support for various Active Ingredients</Text>
      </View>
    </View>

    {/* Education */}
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontSize: 20, color: verdeolivo }}>
        <FontAwesome5 name="graduation-cap" /> Education
      </Text>
      <Text>
        Universidad de Costa Rica | In progress{'\n'}
        Lic. Chemical Engineer | Thesis topic "Implementation of the Failure Modes and Effects Analysis (FMEA)
        methodology for risk detection in the electro-surgical pencil device with smoke evacuation to enhance product
        quality."
      </Text>
    </View>

    {/* Technical Skills */}
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontSize: 20, color: verdeolivo }}>
        <FontAwesome5 name="cogs" /> Technical Skills
      </Text>
      <View style={{ marginLeft: 20 }}>
        <Text>
          <FontAwesome5 name="check" /> Process Validation{'\n'}
          <FontAwesome5 name="check" /> Quality Regulations and Standards{'\n'}
          <FontAwesome5 name="check" /> Risk Analysis{'\n'}
          <FontAwesome5 name="check" /> Problem Solving
        </Text>
      </View>
    </View>

    {/* Certifications */}
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontSize: 20, color: verdeolivo }}>
        <FontAwesome5 name="certificate" /> Certifications
      </Text>
      <Text>
        <FontAwesome5 name="certificate" /> Prints Reading{'\n'}
        <FontAwesome5 name="certificate" /> Applied Statistics in Medical Devices Manufacturing{'\n'}
        <FontAwesome5 name="certificate" /> Design of Experiments (DOE){'\n'}
        <FontAwesome5 name="certificate" /> Root Cause Analysis
      </Text>
    </View>

    {/* Languages */}
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontSize: 20, color: verdeolivo }}>
        <FontAwesome5 name="language" /> Languages
      </Text>
      <Text>
        <FontAwesome5 name="globe" /> Spanish - Native{'\n'}
        <FontAwesome5 name="globe" /> English - Business Competence
      </Text>
    </View>

    {/* References */}
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontSize: 20, color: verdeolivo }}>
        <FontAwesome5 name="thumbs-up" /> References
      </Text>
      <Text>For reference contact Jane Smith</Text>
      <Text>
        <FontAwesome5 name="linkedin" />{' '}
        <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/in/jane-smith/')}>
          <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>LinkedIn: jane-smith</Text>
        </TouchableOpacity>
      </Text>
    </View>
  </ScrollView>
);

export default CVScreen;
