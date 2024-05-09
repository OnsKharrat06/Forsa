import React, { useState, useEffect, useMemo } from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, StyleSheet, Alert, Animated, useWindowDimensions } from "react-native";
import { useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";

import Tabs from './tabs/Tabs';
import About from './about/About';
import Company from './company/Company';
import Contacts from './contacts/Contacts';

import { COLORS, SIZES } from "../../constants";

const tabs = ["About", "Company", "Contacts"];

const JobDetails = ({ job, navigation }) => {
  const route = useRoute();
  const { id, company_name, title, description, website_link, role, salary, hr_email, hr_phone, logo_url, city, country, saved, ...otherJobDetails } = route.params.job;
  const [activeTab, setActiveTab] = useState("About");
  const [isSaved, setIsSaved] = useState(saved);
  const [isApplied, setIsApplied] = useState(false);
  useEffect(() => {
    // Fetch applied status when component mounts
    const fetchAppliedStatus = async () => {
      try {
        const response = await axios.get(`http://192.168.1.21:8000/joblistings/${id}/appliedStatus`);
        setIsApplied(response.data.applied === 1); // Update isApplied based on the fetched status
      } catch (error) {
        console.error('Error fetching applied status:', error);
      }
    };
    const fetchSavedStatus = async () => {
      try {
        const savedResponse = await axios.get(`http://192.168.1.21:8000/joblistings/${id}/savedStatus`);
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
      const response = await axios.put(`http://192.168.1.21:8000/joblistings/${id}/save`);
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
      const response = await axios.put(`http://192.168.1.21:8000/joblistings/${id}/apply`);
      console.log(response.data.message);
      setIsApplied(prevState => !prevState); // Toggle isApplied state
      Alert.alert("Job Applied", isApplied ? "You have applied for this job." : "You have unapplied for this job.");
    } catch (error) {
      console.error("Error applying to job:", error);
      Alert.alert("Error", "Failed to apply for this job. Please try again later.");
    }
  };

  const applyButtonTitle = isApplied ? "Applied" : "Apply";

  const { height: windowHeight } = useWindowDimensions();
  const scrollY = useMemo(() => new Animated.Value(0), []);

  const headerTranslateY = scrollY.interpolate({
    inputRange: [-250, 0, 250], // Adjust as needed
    outputRange: [-125, 0, 187.5], // Adjust as needed
  });

  const headerScale = scrollY.interpolate({
    inputRange: [-250, 0, 250], // Adjust as needed
    outputRange: [2, 1, 1],
  });

  const headerStyle = {
    transform: [{ translateY: headerTranslateY }, { scale: headerScale }],
  };
  return (
    <SafeAreaView>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <Animated.View style={[styles.headerContainer, headerStyle]}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Ionicons
                name="arrow-back"
                size={30}
                color={COLORS.tertiary}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} style={styles.heartButton}>
              <Ionicons
                name={isSaved ? 'heart' : 'heart-outline'}
                size={30}
                color={isSaved ? COLORS.tertiary : COLORS.gray}
              />
            </TouchableOpacity>
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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons
                name="location-sharp"
                size={20}
                color={COLORS.tertiary}
                style={{ marginRight: 5 }} // Add some margin between icon and text
              />
              <Text style={styles.locationName}>{`${city}, ${country}`}</Text>
            </View>
          </View>
        </Animated.View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={handleTabChange}
          />
        </View>
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
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default JobDetails;

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 50,
    flexDirection: 'column',
    padding: SIZES.padding,
    overflow: 'hidden',

  },
  buttonContainer: {
    flexDirection: 'row', // Maintains horizontal layout
    justifyContent: 'space-between', // Aligns buttons to the right
    marginBottom: 10,
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
    marginLeft: 250,
  },
  logoImage: {
    flex: 1,
    height: 250, // Adjust height as needed
    resizeMode: 'cover', // or 'contain' depending on desired scaling
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
