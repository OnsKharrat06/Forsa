import React from "react";
import { View, Text } from "react-native";

import styles from "./about.style";

const About = ({ info, role,salary,application_deadline,type,experience_level }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>About the job:</Text>
      <View style={styles.contentBox}>
        <Text style={styles.contextText}>{info}</Text>
        <Text style={styles.contextText}>Role:{role}</Text>
        <Text style={styles.contextText}>Salary:{salary}</Text>
        <Text style={styles.contextText}>Application Deadline:{application_deadline}</Text>
        <Text style={styles.contextText}>Type:{type}</Text>
        <Text style={styles.contextText}>Experience Level:{experience_level}</Text>
      </View>
    </View>
  );
};

export default About;
