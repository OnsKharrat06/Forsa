import React from "react";
import { View, Text, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import styles from "./company.style";
import { COLORS } from "../../../constants";

const Company = ({ jobTitle, companyName, industry, city, remote }) => {
  const renderRemoteStatus = () => {
    return remote === 0 ? "No" : "Yes";
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>About the company:</Text>
      <View style={styles.contentBox}>
        <Text style={styles.jobTitle}>{jobTitle}</Text>
        <Text style={styles.companyName}>CompanyName: {companyName}</Text>
        <Text style={styles.companyName}>Industry: {industry}</Text>
        <Text style={styles.companyName}>City:{city}</Text>
        <Text style={styles.companyName}>Remote: {renderRemoteStatus()}</Text>
      </View>
    </View>
  );
};

export default Company;
