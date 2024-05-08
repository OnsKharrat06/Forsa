import React, { useState,useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, StyleSheet,Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import Tabs from './tabs/Tabs';
import About from './about/About';
import Company from './company/Company'
import Contacts from './contacts/Contacts'

import { COLORS, SIZES } from "../../constants";

const tabs = ["About", "Company", "Contacts"];

const JobDetails = ({ job }) => {
  const route = useRoute();
  const { id, company_name, title, description, website_link, role, salary, hr_email, hr_phone, logo_url, city, country,saved,applied, ...otherJobDetails } = route.params.job;
  const [activeTab, setActiveTab] = useState("About");
  const [isSaved, setIsSaved] = useState(saved);
  const [isApplied, setIsApplied] = useState(applied);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
 
  const handleSave = () => {
    const newSavedState = !isSaved;
    
    const updatedJob = { ...job, saved: newSavedState };
    Alert.alert(
      `Job ${newSavedState ? 'Saved' : 'Unsaved'}`,
      `The job has been ${newSavedState ? 'saved' : 'unsaved'} successfully.`
    );
  
    setIsSaved(newSavedState);
    console.log(updatedJob);
  };

  const handleApply = () => {
    const newApplyState = !isApplied;
  
    if (newApplyState) {
      Alert.alert("Job Applied", "You have applied for this job.");
    } else {
      Alert.alert("Job Conceal Applied", "You have conceal applied for this job.");
    }
  
    setIsApplied(newApplyState);
  };
  

  const applyButtonTitle = isApplied ? "Applied" : "Apply";

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.headerContainer}>
          
          <View style={styles.buttonContainer}>
            {/* Heart Button on the Left */}
            <TouchableOpacity onPress={handleSave} style={styles.heartButton}>
              <Ionicons
                name={isSaved ? 'heart' : 'heart-outline'}
                size={30}
                color={isSaved ? COLORS.tertiary : COLORS.primary}
              />
            </TouchableOpacity>
  
            {/* Apply Button on the Right */}
            <TouchableOpacity onPress={handleApply} style={styles.applyButton}>
              <Text style={styles.applyButtonText}>{applyButtonTitle}</Text>
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
      flexDirection: 'row', // Maintains horizontal layout
      justifyContent: 'flex-end', // Aligns buttons to the right
      marginBottom: 8,
    },
    applyButton: {
      paddingHorizontal: 15,
      paddingVertical: 10,
      backgroundColor: 'transparent', // Remove background color
      borderWidth: 1,
      borderColor: COLORS.primary,
      borderRadius: 5,
      marginRight: 10, // Add margin right in pixels
    },
    applyButtonText: {
      color: COLORS.primary,
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