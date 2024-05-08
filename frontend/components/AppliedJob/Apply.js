import React from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground } from 'react-native';
import JobCard from "../Jobs/JobCard";

const Apply = () => {

    const AppliedJobs = [
        {
          id: 1,
          company_name: "UIB",
          industry: "Banking",
          description: "Commercial bank offering financial services",
          city: "Tunis",
          country: "Tunisia",
          remote: false,
          hr_email: "recrutement@uib.com.tn",
          hr_phone: "+216 71 111 555",
          website_link: "https://www.uib.com.tn/",
          logo_url:"https://b2b.tn/files/2022/06/UIB.jpg",
          role: "Full-Time",
          title: "Full Stack Developer",
          city: "Tunis",
          country: "Tunisia",
          salary: "Negotiable",
          application_deadline: "2024-01-15",
          type: "On-Site",
          description: "Develop and maintain web applications",
          experience_level: "Mid-Level",
          applied:true,
        },
    ]



    return (
        <ImageBackground
            source={require("../../assets/images/bg.png")}
            resizeMode="stretch"
            style={{ flex: 1 }}
        >
            <View style={styles.container}>
                <Text>Applied Jobs</Text>
                <FlatList
                    data={AppliedJobs}
                    renderItem={({ item }) => (
                        <JobCard job={item} />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </ImageBackground >
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
});

export default Apply;