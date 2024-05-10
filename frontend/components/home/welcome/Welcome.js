import React, { useState, } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Modal,
  ScrollView,
  FlatList
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { SelectList } from "react-native-dropdown-select-list";
import styles from "./welcome.style";
import { COLORS } from "../../../constants";
import { useContext } from "react";
import { userContext } from "../../../context/userContext";
import JobCard from "../../Jobs/JobCard";

const Welcome = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(userContext);
  // const [selectedFilters, setSelectedFilters] = useState({}); // State to store selected filters
  // const [allJobs, setAllJobs] = useState([]);
  // const [filteredJobs, setFilteredJobs] = useState([]);
  // const [canAddFilters, setCanAddFilters] = useState(true);

  const Jobs = [
    {
      companyid: 1,
      company_name: "UIB",
      industry: "Banking",
      company_description: "UIB is a leading commercial bank in Tunisia, offering a wide range of financial services to individuals and businesses. With a focus on innovation and customer satisfaction, UIB strives to be the bank of choice for all banking needs.",
      city: "Tunis",
      country: "Tunisia",
      remote: false,
      hr_email: "recrutement@uib.com.tn",
      hr_phone: "+216 71 111 555",
      website_link: "https://www.uib.com.tn/",
      logo_url: "https://b2b.tn/files/2022/06/UIB.jpg",
      role: "Full-Time",
      title: "Full Stack Developer",
      salary: "Negotiable",
      application_deadline: "2024-01-15",
      type: "On-Site",
      description: "Develop and maintain web applications using a full stack development approach. Collaborate with cross-functional teams to deliver high-quality software solutions.",
      experience_level: "Mid-Level",
      saved: false,
      applied: false
    },
    {
      companyid: 1,
      company_name: "UIB",
      industry: "Banking",
      company_description: "UIB is a leading commercial bank in Tunisia, offering a wide range of financial services to individuals and businesses. With a focus on innovation and customer satisfaction, UIB strives to be the bank of choice for all banking needs.",
      city: "Tunis",
      country: "Tunisia",
      remote: false,
      hr_email: "recrutement@uib.com.tn",
      hr_phone: "+216 71 111 555",
      website_link: "https://www.uib.com.tn/",
      logo_url: "https://b2b.tn/files/2022/06/UIB.jpg",
      role: "Part-Time",
      title: "Full Stack Developer",
      salary: "Negotiable",
      application_deadline: "2024-01-15",
      type: "On-Site",
      description: "Develop and maintain web applications using a full stack development approach. Collaborate with cross-functional teams to deliver high-quality software solutions.",
      experience_level: "Mid-Level",
      saved: false,
      applied: false
    }
  ];

  const filterData = [
    {
      label: 'Role',
      data: [
        { value: 'full-time', label: 'Full-Time' },
        { value: 'part-time', label: 'Part-Time' },
        { value: 'internship', label: 'Internship' },
      ],
    },
    {
      label: 'Type',
      data: [
        { value: 'remote', label: 'Remote' },
        { value: 'on-site', label: 'On-Site' },
        { value: 'hybrid', label: 'Hybrid' },
      ],
    },
    {
      label: 'Level',
      data: [
        { value: 'Entry-Level', label: '3' },
        { value: 'Mid-Level', label: '1' },
        { value: 'Experienced', label: '2' },
        { value: 'Senior', label: '4' },
      ],
    },
  ];

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  // const handleSelection = (filterLabel, selectedValue) => {
  //   if (canAddFilters) {
  //     setSelectedFilters({ ...selectedFilters, [filterLabel]: selectedValue });
  //   }
  // };

  // const handleCancel = () => {
  //   setSelectedFilters({});
  //   setFilteredJobs(allJobs);
  //   setCanAddFilters(true);
  // };

  // const filterJobs = () => {
  //   // Filter logic based on selectedFilters
  //   const filteredData = allJobs.filter((job) => {
  //     let isValid = true;
  //     Object.entries(selectedFilters).forEach(([filterLabel, filterValue]) => {
  //       if (job[filterLabel] !== filterValue) {
  //         isValid = false;
  //       }
  //     });
  //     return isValid;
  //   });
  //   setFilteredJobs(filteredData);
  // };

  const handleSearch = () => {
    // Implement filtering logic here
    const filteredJobs = Jobs.filter((job) => {
      if (!searchTerm) {
        return true; // Return all jobs if no search term
      }
  
      const regex = new RegExp(`\b.*${searchTerm}.*\b`, "i"); // Match "f" anywhere in title (case-insensitive)
      console.log("Testing regex:", regex.test(job.title)); // Log the test result
      return regex.test(job.title);
    });
    console.log("Filtered jobs:", filteredJobs); // Log the filtered jobs
    setFilteredJobsState(filteredJobs); // Update filteredJobsState with filtered jobs
  };

  const [filteredJobsState, setFilteredJobsState] = useState([]); // State for filtered jobs


  return (
    <View>
      <ImageBackground
        source={require('../../../assets/images/bg.png')}
        resizeMode="stretch"
        style={{ flex: 1 }}
      >
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              selectionColor={COLORS.primary}
              onFocus={toggleModal}
              placeholder="Search for a job"
            />
          </View>

          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons name="search-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <Modal
          visible={showModal}
          animationType="slide"
          onRequestClose={handleModalClose}
          style={{ zIndex: 10 }}
        >
          <View style={styles.modalContent}>
            <View style={styles.closeButton}>
              <TouchableOpacity onPress={handleModalClose}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.topContainer}>
              <View style={styles.searchPopUpContainer}>
                <View style={styles.searchWrapper}>
                  <TextInput
                    style={styles.searchInput}
                    selectionColor={COLORS.primary}
                    value={searchTerm}
                    onChangeText={(text) => setSearchTerm(text)}
                    placeholder="Search for a job"
                    placeholderTextColor="gray"
                  />
                </View>

                <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
                  <Ionicons name="search-outline" size={24} color="white" />
                </TouchableOpacity>

              </View>
              <View style={{ marginTop: 120 }}>
                {/* Conditionally render FlatLists */}
                {!searchTerm ? (
                  <FlatList
                    data={Jobs}
                    renderItem={({ item }) => <JobCard job={item} />}
                    keyExtractor={(item) => item.companyid.toString()}
                    contentContainerStyle={{ paddingVertical: 16 }}
                  />
                ) : (
                  <FlatList
                    data={filteredJobsState} // Use filteredJobsState here
                    renderItem={({ item }) => <JobCard job={item} />}
                    keyExtractor={(item) => item.companyid.toString()} // Use unique identifier
                    contentContainerStyle={{ paddingVertical: 16 }}
                  />
                )}
              </View>

              {/* Filtering section */}

              {/* <ScrollView horizontal style={styles.filterContainer}>
                {filterData.map((filterItem) => (
                  <View key={filterItem.label} style={styles.filterItem}>
                    <SelectList
                      data={filterItem.data}
                      placeholder={filterItem.label}
                      setSelected={(val) => handleSelection(filterItem.label, val)}
                      save="value"
                      label={filterItem.label}

                    />
                  </View>
                ))}
              </ScrollView>

              <View style={styles.buttonContainer}>
                <View>
                  <TouchableOpacity style={styles.filterButton} onPress={filterJobs}>
                    <Text style={styles.filterButtonText}>Filter</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity style={styles.filterButton} onPress={handleCancel}>
                    <Text style={styles.filterButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View> */}

            </View>
            <View>
              {/* {filteredJobs.length > 0 && ( // Display filtered jobs if any
                <FlatList
                  data={filteredJobs}
                  renderItem={({ item }) => <JobCard job={item} />} // Use JobCard for rendering jobs
                  keyExtractor={(item) => item.companyid.toString()}
                  contentContainerStyle={{ paddingVertical: 16 }} // Adjust padding as needed
                />
              )}

              {!filteredJobs.length && Object.keys(selectedFilters).length > 0 && ( // Display "No jobs" message if filters applied and no results
                <Text style={styles.noJobsText}>No jobs match your current filters.</Text>
              )}


              {Jobs && filteredJobs.length === 0 && Object.keys(selectedFilters).length === 0 && ( // Display all jobs if no filters applied
                <FlatList
                  data={Jobs}
                  renderItem={({ item }) => <JobCard job={item} />} // Use JobCard for rendering jobs
                  keyExtractor={(item) => item.companyid.toString()}
                  contentContainerStyle={{ paddingVertical: 16 }} // Adjust padding as needed
                />
              )} */}



            </View>

          </View>

        </Modal>

      </ImageBackground>

    </View>
  );
};

export default Welcome;

