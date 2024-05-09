import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";

import Tabs from './tabs/Tabs';
import About from './about/About';
import Company from './company/Company';
import Contacts from './contacts/Contacts';

import { COLORS, SIZES } from "../../constants";

const tabs = ["About", "Company", "Contacts"];

const JobDetails = ({ job }) => {
  const route = useRoute();
  const { id, company_name, title, description, website_link, role, salary, hr_email, hr_phone, logo_url, city, country, saved,job_description,company_description, ...otherJobDetails } = route.params.job;
  const [activeTab, setActiveTab] = useState("About");
  const [isSaved, setIsSaved] = useState(saved);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    // Fetch applied status when component mounts
    const fetchAppliedStatus = async () => {
      try {
        const response = await axios.get(`http://192.168.18.70:8000/joblistings/${id}/appliedStatus`);
        setIsApplied(response.data.applied === 1); // Update isApplied based on the fetched status
      } catch (error) {
        console.error('Error fetching applied status:', error);
      }
    };
    const fetchSavedStatus = async () => {
      try {
        const savedResponse = await axios.get(`http://192.168.18.70:8000/joblistings/${id}/savedStatus`);
        setIsSaved(savedResponse.data.saved === 1);
      } catch (error) {
        console.error('Error fetching saved status:', error);
      }
    };
    fetchAppliedStatus();
    fetchSavedStatus();
  }, [id]); // Include id as dependency to re-fetch applied status when id changes

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://192.168.18.70:8000/joblistings/${id}/save`);
      console.log(response.data.message);
      setIsSaved(prevState => !prevState); // Toggle isApplied state
      Alert.alert("Job Saved", isSaved ? "You have saved this job." : "You have unsaved this job.");
    } catch (error) {
      console.error("Error applying to job:", error);
      Alert.alert("Error", "Failed to apply for this job. Please try again later.");
    }
  };

  const handleApply = async () => {
    try {
      const response = await axios.put(`http://192.168.18.70:8000/joblistings/${id}/apply`);
      console.log(response.data.message);
      setIsApplied(prevState => !prevState); // Toggle isApplied state
      Alert.alert("Job Applied", isApplied ? "You have applied for this job." : "You have unapplied for this job.");
    } catch (error) {
      console.error("Error applying to job:", error);
      Alert.alert("Error", "Failed to apply for this job. Please try again later.");
    }
  };

  const applyButtonTitle = isApplied ? "Applied" : "Apply";

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.headerContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleApply} style={styles.applyButton}>
              <Text style={styles.applyButtonText}>{applyButtonTitle}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSave} style={styles.heartButton}>
              <Ionicons
                name={isSaved ? 'heart' : 'heart-outline'}
                size={30}
                color={isSaved ? COLORS.tertiary : COLORS.gray}
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
              info={job_description}
            />
          )}
          {activeTab === "Company" && (
            <Company
              jobTitle={company_name}
              companyName={company_description}
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
