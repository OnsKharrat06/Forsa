import React, { useState,useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import Tabs from './tabs/Tabs';
import About from './about/About';
import Company from './company/Company'
import Contacts from './contacts/Contacts'

import { COLORS, icons, SIZES } from "../../constants";

const tabs = ["About", "Company", "Contacts"];

const JobDetails = ({ jobDetails }) => {
  const route = useRoute();
  const { id, company_name, title, description, website_link, role, salary, hr_email, hr_phone, logo_url, city, country, ...otherJobDetails } = route.params.job;
  const [activeTab, setActiveTab] = useState("About");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.headerContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.heartButton}>
              <Ionicons
                name={'heart'}
                size={30}
                color={COLORS.tertiary}
              />
            </TouchableOpacity>
          </View>

          {logo_url && (
            <Image
              source={{ uri: logo_url }}
              style={styles.logoImage}
            />
          )}

          <View style={styles.companyNameTitleContainer}>
            <Text style={styles.companyNameText}>{company_name}</Text>
            <Text style={styles.titleText}>{title}</Text>
            <Ionicons
              name="location-sharp"
              size={20}
              color={COLORS.tertiary}
            />
            <Text style={styles.locationName}>{`${city}, ${country}`} </Text>
          </View>
        </View>

        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={handleTabChange} />

        <View style={{ padding: SIZES.padding }}>
          {activeTab === "About" && (
            <About
              info={description}
            />
          )}
          {activeTab === "Company" && (
            <Company
              jobTitle={title}
              companyName={company_name}
            />
          )}
          {activeTab === "Contacts" && (
            <Contacts
              hr_email={hr_email}
              hr_phone={hr_phone}
            />
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default JobDetails;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'column',
    padding: SIZES.padding,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  applyButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  applyButtonText: {
    color: COLORS.white,
  },
  heartButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  logoImage: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 10,
  },
  companyNameTitleContainer: {
    alignItems: 'center',
  },
  companyNameText: {
    fontSize: SIZES.large,
    color: COLORS.black,
  },
  titleText: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  locationName: {
    fontSize: SIZES.medium - 2,
    color: COLORS.gray,
    fontFamily: "AlNile-Bold",
    marginLeft: 2,
  },
});