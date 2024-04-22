import React from "react";
import { View, Text } from "react-native";

import styles from "./contacts.style";

const Contacts = ({ hr_email,hr_phone }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>Contacts :</Text>
      <View style={styles.contentBox}>
        <Text style={styles.contextText}>HR Email : {hr_email}</Text>
        <Text style={styles.contextText}>HR Phone Number : {hr_phone}</Text>
      </View>
    </View>
  );
};

export default Contacts;