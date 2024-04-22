import React from "react";
import { View, Text, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import styles from "./company.style";
import { COLORS } from "../../../constants";

const Company = ({ jobTitle, companyName }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>About the company:</Text>
      <View style={styles.contentBox}>
        <Text style={styles.jobTitle}>{jobTitle}</Text>
        <Text style={styles.companyName}>{companyName}</Text>
      </View>
    </View>
  );
};

export default Company;
