
import { View, Text, FlatList, StyleSheet, ImageBackground,TouchableOpacity } from "react-native";
import JobCard from "../Jobs/JobCard";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
const Save = () => {

    // const savedJobs = [
    //     {
    //       id: 1,
    //       company_name: "UIB",
    //       industry: "Banking",
    //       description: "Commercial bank offering financial services",
    //       city: "Tunis",
    //       country: "Tunisia",
    //       remote: false,
    //       hr_email: "recrutement@uib.com.tn",
    //       hr_phone: "+216 71 111 555",
    //       website_link: "https://www.uib.com.tn/",
    //       logo_url:"https://b2b.tn/files/2022/06/UIB.jpg",
    //       role: "Full-Time",
    //       title: "Full Stack Developer",
    //       city: "Tunis",
    //       country: "Tunisia",
    //       salary: "Negotiable",
    //       application_deadline: "2024-01-15",
    //       type: "On-Site",
    //       description: "Develop and maintain web applications",
    //       experience_level: "Mid-Level",
    //       saved: true,
    //     },
    // ]
    
    // // const handle = () => {
    // // //     console.log(savedJobs);
    // // //   };
    const [savedJobs, setSavedJobs] = useState([]);
    
    useFocusEffect(
    React.useCallback(() => {
    const fetchSavedJobs = async () => {
      try {
        const response = await axios.get("http://192.168.1.21:8000/joblistings/saved");
        setSavedJobs(response.data);
      } catch (error) {
        console.error('Error fetching saved jobs:', error);
      }
    };
    fetchSavedJobs();
    return () => {}; // Clean-up function
  }, [])
);
    const unsaveJob = (job) => {
        // Logic to remove the job from saved list
        // This logic will depend on how you are managing the saved jobs in your app
      };
  

    return (
        <ImageBackground
            source={require("../../assets/images/bg.png")}
            resizeMode="stretch"
            style={{ flex: 1 }}
        >
             {/* <TouchableOpacity onPress={handle}>
              <Text>test</Text>
            </TouchableOpacity> */}

            <View style={styles.container}>
                <Text>Saved Jobs</Text>
                <FlatList
                    data={savedJobs}
                    renderItem={({ item }) => (
                        <JobCard job={item} saveJob={unsaveJob} saved={item.saved} />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
});

export default Save;
