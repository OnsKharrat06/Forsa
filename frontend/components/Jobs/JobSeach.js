import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import JobCard from "./JobCard";
import styles from "./styles";
import axios from "axios";

const JobSearch = () => {
  const [jobListings, setJobListings] = useState([]);

  useEffect(() => {
    // Define a function to fetch job listings
    const fetchJobListings = async () => {
      try {
        const response = await axios.get("http://192.168.1.21:8000/joblistings");
        // Assuming your backend returns job listings in response.data
        setJobListings(response.data);
      } catch (error) {
        console.error("Error fetching job listings:", error);
      }
    };

    // Call the fetchJobListings function when the component mounts
    fetchJobListings();
  }, []);

  return (
    <View>
      <FlatList
        data={jobListings}
        renderItem={({ item }) => <JobCard job={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingVertical: 16 }} // Adjust padding as needed
      />
    </View>
  );
};

export default JobSearch;
