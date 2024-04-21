import React, { useEffect, useState, useCallback, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Platform,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Image,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import styles from "./ProfileStyle";
import { hard, soft, proficiencyOptions } from "./Skill";
import {
  MultipleSelectList,
  SelectList,
} from "react-native-dropdown-select-list";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import axios from "axios";
import { Card } from "react-native-elements";
import { userContext } from "../../context/userContext";

const ProfileScreen = () => {
  const [editMode, setEditMode] = useState(false);

  const [showBioModal, setShowBioModal] = useState(false);
  const [selectedBioIndex, setSelectedBioIndex] = useState(null);
  const [bio, setBio] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  const [showEducationModal, setShowEducationModal] = useState(false);
  const [education, setEducation] = useState([]);
  const [schoolName, setSchoolName] = useState("");
  const [degree, setDegree] = useState("");
  const [fieldOfStudies, setFieldOfStudies] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [grade, setGrade] = useState("");
  const [selectedEducationIndex, setSelectedEducationIndex] = useState(null);

  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedContactIndex, setSelectedContactIndex] = useState(null);
  const [phone, setPhone] = useState("");
  const [linkedinurl, setlinkedinUrl] = useState("");
  const [email, setEmail] = useState("");

  const [workExperience, setWorkExperience] = useState([]);
  const [selectedWorkExperienceIndex, setSelectedWorkExperienceIndex] =
    useState(null);
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [currentlyWorking, setCurrentlyWorking] = useState(false);
  const [description, setDescription] = useState("");
  const [showWorkExperienceModal, setShowWorkExperienceModal] = useState(false);

  const [softSkills, setSoftSkills] = useState([]);
  const [hardSkills, setHardSkills] = useState([]);
  const [softselectedSkills, setSelectedSoftSkills] = useState([]);
  const [hardselectedSkills, setSelectedHardSkills] = useState([]);
  const [showHardSkillModal, setShowHardSkillModal] = useState(false);
  const [showSoftSkillModal, setShowSoftSkillModal] = useState(false);

  const [languages, setLanguages] = useState([]);
  const [languageName, setLanguageName] = useState("");
  const [proficiencyName, setProficiencyName] = useState("");
  const [proficiencyIndex, setProficiencyIndex] = useState(null);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const [showPicker, setShowPicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const [loadingBio, setLoadingBio] = useState(true);
  const [LoadingContactInfo, setLoadingContactInfo] = useState(true);

  const {user} = useContext(userContext);


  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  const toggleEndDatepicker = () => {
    setShowEndDatePicker(!showEndDatePicker);
  };

  const confirmIOSDate = (selectedDate) => {
    setStartDate(selectedDate);
    toggleDatepicker();
  };

  const confirmEndDate = (selectedDate) => {
    setEndDate(selectedDate);
    toggleEndDatepicker();
  };

  const onChange = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate || startDate;
      setShowPicker(Platform.OS === "ios");
      setStartDate(currentDate);
    } else {
      setShowPicker(false);
    }
  };

  const onChangeEndDate = (event, selectedDate) => {
    if (event.type === "set") {
      const currentDate = selectedDate || endDate;
      setShowEndDatePicker(Platform.OS === "ios");
      setEndDate(currentDate);
    } else {
      setShowEndDatePicker(false);
    }
  };

  useEffect(() => {
    getAllSkills();
    getAllLanguages();
    getAllEducations();
    getAllWorkExperience();
    getUserBio();
    getUserContactInfo();
  }, []);

  const getUserBio = async () => {
    try {
      const response = await axios.get(`http://192.168.102.43:8000/users/bio/4`);
      const { bio } = response.data;
      setBio(bio);
      setLoadingBio(false);
    } catch (error) {
      console.error("Error fetching user bio:", error);
    }
  };
  const getUserContactInfo = async () => {
    try {
      const response = await axios.get(
        `http://192.168.102.43:8000/users/contactinfo/5`
      );
      const { linkedinurl, phone, email } = response.data;
      setEmail(email);
      setPhone(phone);
      setlinkedinUrl(linkedinurl);
      setLoadingContactInfo(false);
    } catch (error) {
      console.error("Error fetching user contact info:", error);
    }
  };
  const getAllSkills = async () => {
    try {
      const {
        data: { skills },
      } = await axios.get("http://192.168.102.43:8000/user_skills/"+user?.userid);
      console.log(skills);
      const allSkills = skills.map(
        ({ skill, skill_type, user_skill_id, ...rest }) => ({
          name: skill,
          skillType: skill_type,
          skillID: user_skill_id,
        })
      );
      setSoftSkills(allSkills.filter((elm) => elm.skillType == "soft"));
      setHardSkills(allSkills.filter((elm) => elm.skillType == "hard"));
    } catch (error) {
      console.error("error getting skills:", error);
    }
  };

  const getAllLanguages = async () => {
    try {
      const {
        data: { languages },
      } = await axios.get("http://192.168.102.43:8000/user_languages/"+user?.userid);
      console.log(languages);
      const allLanguages = languages.map(
        ({ language, proficiency, user_language_id, ...rest }) => ({
          name: language,
          proficiency,
          languageID: user_language_id,
        })
      );
      setLanguages(allLanguages);
    } catch (error) {
      console.error("error getting languages:", error);
    }
  };

  const getAllEducations = async () => {
    try {
      const {
        data: { educations },
      } = await axios.get("http://192.168.102.43:8000/education/"+user?.userid);
      console.log(educations);
      const allEducations = educations.map(
        ({
          education_id,
          school_name,
          degree,
          field_of_study,
          start_date,
          end_date,
          grade,
          ...rest
        }) => ({
          educationID: education_id,
          schoolName: school_name,
          degree: degree,
          fieldOfStudies: field_of_study,
          startDate: start_date,
          endDate: end_date,
          grade: grade,
        })
      );
      setEducation(allEducations);
    } catch (error) {
      console.error("error education", error);
    }
  };
  const getAllWorkExperience = async () => {
    try {
      const {
        data: { workExperience },
      } = await axios.get("http://192.168.102.43:8000/user_work_experience/4");
      console.log(workExperience);
      const allWorkExperiences = workExperience.map(
        ({
          experience_id,
          job_title,
          companyname,
          location,
          start_date,
          end_date,
          short_description,
          ...rest
        }) => ({
          workExperienceID: experience_id,
          jobTitle: job_title,
          companyName: companyname,
          location: location,
          startDate: start_date,
          endDate: end_date,
          description: short_description,
        })
      );
      setWorkExperience(allWorkExperiences);
    } catch (error) {
      console.error("error work experience", error);
    }
  };
  const handleContactIconPress = () => {
    getUserContactInfo();
    setShowContactModal(true);
  };

  const handleSaveContactInfo = async () => {
    try {
      const response = await axios.put(`192.168.102.43:8000/users/5`, {
        email,
        phone,
        linkedinurl,
      });
      console.log(response.data); // Log the response from the server
      setShowContactModal(false);
      // Assuming you want to update the state with new values after successful update
    } catch (error) {
      console.error("Error updating contact information:", error);
      // Handle error here
    }
  };

  const handleModalClose = () => {
    setSelectedContactIndex(null);
    setShowContactModal(false);
  };

  const handleSaveBio = async () => {
    try {
      const response = await axios.put(`http://192.168.102.43:8000/users/4`, {
        bio,
      });
      console.log(response.data); // Log the response from the server
      setShowBioModal(false);
    } catch (error) {
      console.error("Error updating bio:", error);
      // Handle error here
    }
  };

  const handleEditBio = () => {
    setShowBioModal(true);
  };

  const handleBioModalClose = () => {
    setSelectedBioIndex(null);
    setShowBioModal(false);
  };

  const handleAddEducation = async () => {
    if (
      schoolName.trim() === "" ||
      degree.trim() === "" ||
      fieldOfStudies.trim() === ""
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      await axios.post("http://192.168.1.21:8000/education/9", {
        school_name: schoolName,
        degree,
        field_of_study: fieldOfStudies,
        start_date: startDate,
        end_date: endDate,
        grade,
      });
      getAllEducations();
    } catch (error) {
      console.error("Error adding education:", error);
    }
    setShowEducationModal(false);
    // Reset form fields
    setSchoolName("");
    setDegree("");
    setFieldOfStudies("");
    setStartDate(new Date());
    setEndDate(new Date());
    setGrade("");
  };
  const handleAddWorkExperience = async () => {
    if (companyName.trim() === "" || location.trim() === "") {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      await axios.post("http://192.168.1.21:8000/user_work_experience/4", {
        job_title: jobTitle,
        companyname: companyName,
        location,
        start_date: startDate,
        end_date: endDate,
        short_description: description,
      });
      getAllWorkExperience();
    } catch (error) {
      console.error("Error adding work experience:", error);
    }

    setShowWorkExperienceModal(false);
    // Reset form fields
    setJobTitle("");
    setCompanyName("");
    setLocation("");
    setStartDate(new Date());
    setEndDate(new Date());
    setDescription("");
  };

  const handleDeleteEducation = async (educationID) => {
    try {
      await axios.delete(`http://192.168.1.21:8000/education/${educationID}`);
      await getAllEducations();
    } catch (error) {}
  };

  const handleEducationModalClose = () => {
    setSelectedEducationIndex(null);
    setShowEducationModal(false);
  };

  const handleDeleteWorkExperience = async (workExperienceID) => {
    try {
      await axios.delete(
        `http://192.168.1.21:8000/user_work_experience/${workExperienceID}`
      );
      await getAllWorkExperience();
    } catch (error) {}
  };

  const handleWorkExperienceModalClose = () => {
    setShowWorkExperienceModal(false);
  };

  const handleAddHardSkill = async () => {
    if (hardselectedSkills.length === 0) {
      alert("Please select at least one hard skill.");
      return;
    }

    try {
      await axios.post("http://192.168.102.43:8000/user_skills/"+user?.userid, {
        skills: hardselectedSkills.map((elm) => ({
          skill: elm,
          skill_type: "hard",
        })),
      });
      await getAllSkills();
    } catch (error) {
      alert(
        "An error occurred while adding hard skills. Please try again later."
      );
      console.error("Error adding hard skills:", error);
    }
    setShowHardSkillModal(false);
    setSelectedHardSkills([]);
  };

  const handleAddSoftSkill = async () => {
    if (softselectedSkills.length === 0) {
      alert("Please select at least one soft skill.");
      return;
    }

    try {
      await axios.post("http://192.168.102.43:8000/user_skills/"+user?.userid, {
        skills: softselectedSkills.map((elm) => ({
          skill: elm,
          skill_type: "soft",
        })),
      });
      await getAllSkills();
    } catch (error) {
      alert(
        "An error occurred while adding hard skills. Please try again later."
      );
      console.error("Error adding hard skills:", error);
    }
    setShowSoftSkillModal(false);
    setSelectedSoftSkills([]);
  };

  const handleDeleteSkill = async (skillID) => {
    try {
      await axios.delete(`http://192.168.102.43:8000/user_skills/${skillID}`);
      await getAllSkills();
    } catch (error) {}
  };

  const handleShowHardSkillModal = () => {
    setShowHardSkillModal(true);
  };

  const handleShowSoftSkillModal = () => {
    setShowSoftSkillModal(true);
  };

  const handleHardSkillModalClose = () => {
    setShowHardSkillModal(false);
  };

  const handleSoftSkillModalClose = () => {
    setShowSoftSkillModal(false);
  };

  const handleAddLanguage = async () => {
    if (languageName.trim() === "" || proficiencyName.trim() === "") {
      alert("Please enter a language name and select a proficiency level.");
      return;
    }
    const newLanguage = {
      name: languageName,
      proficiency: proficiencyName,
    };

    try {
      await axios.post("http://192.168.1.21:8000/user_languages/9", {
        language: newLanguage.name,
        proficiency: newLanguage.proficiency,
      });
      getAllLanguages();
    } catch (error) {
      console.error("Error adding language:", error);
    }

    setLanguages([...languages, newLanguage]);
    setShowLanguageModal(false);
    setLanguageName("");
    setProficiencyName("");
  };

  const handleDeleteLanguage = async (languageID) => {
    try {
      await axios.delete(
        `http://192.168.1.21:8000/user_languages/${languageID}`
      );
      await getAllLanguages();
    } catch (error) {}
  };

  const handleLanguageModalClose = () => {
    setShowLanguageModal(false);
    setLanguageName("");
    setProficiencyIndex(null);
  };

  return (
    <ImageBackground
      source={require("../../assets/images/bg.png")}
      resizeMode="stretch"
      style={{ flex: 1 }}
    >
      <ScrollView>
        {/* First Card with Profile Info */}
        <Card containerStyle={styles.profileCard}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../../assets/images/ons.jpg")}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.nameText}>{user?.fname} {user?.lname}</Text>
              <Text style={styles.emailText}>{user?.email}</Text>
            </View>
          </View>
        </Card>
        {/* Bio */}
        <Card containerStyle={styles.profileCard}>
          <Card.Title style={styles.sectionTitle}>Bio</Card.Title>
          <Card.Divider />
          <View style={styles.sectionHeader}>
            <Text>{bio}</Text>
            <TouchableOpacity onPress={handleEditBio}>
              <Ionicons name="create" size={24} color="#2F704D" />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Bio Modal*/}
        <Modal visible={showBioModal} animationType="slide">
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={handleBioModalClose}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#2F704D" />
            </TouchableOpacity>
            <Text style={styles.modalHeaderText}>Edit Your Bio</Text>
            <TextInput
              multiline
              value={bio}
              onChangeText={setBio}
              placeholder="Enter your bio"
              style={styles.input}
              placeholderTextColor="gray"
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={selectedBioIndex == null ? handleSaveBio : undefined}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* Education */}
        <Card containerStyle={styles.profileCard}>
          <Card.Title style={styles.sectionTitle}>Education</Card.Title>
          <Card.Divider />
          <View style={styles.sectionHeader}>
            <ScrollView>
              {education.map((item, index) => (
                <View key={index} style={styles.Item}>
                  <View>
                    <Text>School: {item.schoolName}</Text>
                    <Text>Degree: {item.degree}</Text>
                    <Text>Field of Studies: {item.fieldOfStudies}</Text>
                    <Text>
                      Start Date: {moment(item.startDate).format("MM/DD/YYYY")}
                    </Text>
                    <Text>
                      End Date: {moment(item.endDate).format("MM/DD/YYYY")}
                    </Text>
                    <Text>Grade: {item.grade}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleDeleteEducation(item.educationID)}
                  >
                    <Ionicons name="trash" size={24} color="#2F704D" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setShowEducationModal(true)}>
              <Ionicons name="add-circle" size={24} color="#2F704D" />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Education Modal*/}
        <Modal visible={showEducationModal} animationType="slide">
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={handleEducationModalClose}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#2F704D" />
            </TouchableOpacity>
            <Text style={styles.modalHeaderText}>
              {selectedEducationIndex !== null
                ? "Edit Education"
                : "Add Education"}
            </Text>
            <TextInput
              value={schoolName}
              onChangeText={setSchoolName}
              placeholder="School Name"
              style={styles.input}
              placeholderTextColor="gray"
            />
            <TextInput
              value={degree}
              onChangeText={setDegree}
              placeholder="Degree"
              style={styles.input}
              placeholderTextColor="gray"
            />
            <TextInput
              value={fieldOfStudies}
              onChangeText={setFieldOfStudies}
              placeholder="Field of Studies"
              style={styles.input}
              placeholderTextColor="gray"
            />

            {showPicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                value={startDate}
                onChange={onChange}
                // style={styles.datePicker}
                textColor="gray"
              />
            )}
            {showPicker && Platform.OS === "ios" && (
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.pickerButton,
                    { backgroundColor: "gray" },
                  ]}
                  onPress={toggleDatepicker}
                >
                  <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.pickerButton,
                    { backgroundColor: "gray" },
                  ]}
                  onPress={() => confirmIOSDate(startDate)}
                >
                  <Text>Confirm</Text>
                </TouchableOpacity>
              </View>
            )}
            {!showPicker && (
              <Pressable onPress={toggleDatepicker}>
                <TextInput
                  value={moment(startDate).format("MM/DD/YYYY")}
                  onChangeText={setStartDate}
                  placeholder="Start Date"
                  style={styles.input}
                  placeholderTextColor="gray"
                  editable={false}
                  onPressIn={toggleDatepicker}
                />
              </Pressable>
            )}

            {showEndDatePicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                value={endDate}
                onChange={onChangeEndDate}
                textColor="gray"
              />
            )}
            {showEndDatePicker && Platform.OS === "ios" && (
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.pickerButton,
                    { backgroundColor: "gray" },
                  ]}
                  onPress={toggleEndDatepicker}
                >
                  <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.pickerButton,
                    { backgroundColor: "gray" },
                  ]}
                  onPress={() => confirmEndDate(endDate)}
                >
                  <Text>Confirm</Text>
                </TouchableOpacity>
              </View>
            )}
            {!showEndDatePicker && (
              <Pressable onPress={toggleEndDatepicker}>
                <TextInput
                  value={moment(endDate).format("MM/DD/YYYY")}
                  placeholder="End Date"
                  style={styles.input}
                  placeholderTextColor="gray"
                  editable={false}
                  onPressIn={toggleEndDatepicker}
                />
              </Pressable>
            )}
            <TextInput
              value={grade}
              onChangeText={setGrade}
              placeholder="Grade"
              style={styles.input}
              placeholderTextColor="gray"
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={
                selectedEducationIndex == null ? handleAddEducation : undefined
              }
            >
              <Text style={styles.saveButtonText}>
                {selectedEducationIndex !== null ? "Save" : "Add"}
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* Work Experience */}
        <Card containerStyle={styles.profileCard}>
          <Card.Title style={styles.sectionTitle}>Work Experience</Card.Title>
          <Card.Divider />
          <View style={styles.sectionHeader}>
            <ScrollView>
              {workExperience.map((item, index) => (
                <View key={index} style={styles.Item}>
                  <View>
                    <Text>Company Name: {item.companyName}</Text>
                    <Text>Location: {item.location}</Text>
                    <Text>
                      Start Date: {moment(item.startDate).format("MM/DD/YYYY")}
                    </Text>
                    <Text>
                      End Date: {moment(item.endDate).format("MM/DD/YYYY")}
                    </Text>
                    <Text>Description: {item.description}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      handleDeleteWorkExperience(item.workExperienceID)
                    }
                  >
                    <Ionicons name="trash" size={24} color="#2F704D" />
                  </TouchableOpacity>
                  <View style={styles.separator}></View>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setShowWorkExperienceModal(true)}>
              <Ionicons name="add-circle" size={24} color="#2F704D" />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Work Experience Modal */}
        <Modal visible={showWorkExperienceModal} animationType="slide">
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={handleWorkExperienceModalClose}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#2F704D" />
            </TouchableOpacity>
            <Text style={styles.modalHeaderText}>
              {selectedWorkExperienceIndex !== null
                ? "Edit Work Experience"
                : "Add Work Experience"}
            </Text>
            <TextInput
              value={jobTitle}
              onChangeText={setJobTitle}
              placeholder="Job Title"
              style={styles.input}
              placeholderTextColor="gray"
            />
            <TextInput
              value={companyName}
              onChangeText={setCompanyName}
              placeholder="Company Name"
              style={styles.input}
              placeholderTextColor="gray"
            />
            <TextInput
              value={location}
              onChangeText={setLocation}
              placeholder="Location"
              style={styles.input}
              placeholderTextColor="gray"
            />
            {showPicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                value={startDate}
                onChange={onChange}
                // style={styles.datePicker}
                textColor="gray"
              />
            )}
            {showPicker && Platform.OS === "ios" && (
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.pickerButton,
                    { backgroundColor: "gray" },
                  ]}
                  onPress={toggleDatepicker}
                >
                  <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.pickerButton,
                    { backgroundColor: "gray" },
                  ]}
                  onPress={() => confirmIOSDate(startDate)}
                >
                  <Text>Confirm</Text>
                </TouchableOpacity>
              </View>
            )}
            {!showPicker && (
              <Pressable onPress={toggleDatepicker}>
                <TextInput
                  value={moment(startDate).format("MM/DD/YYYY")}
                  onChangeText={setStartDate}
                  placeholder="Start Date"
                  style={styles.input}
                  placeholderTextColor="gray"
                  editable={false}
                  onPressIn={toggleDatepicker}
                />
              </Pressable>
            )}

            {showEndDatePicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                value={endDate}
                onChange={onChangeEndDate}
                textColor="gray"
              />
            )}
            {showEndDatePicker && Platform.OS === "ios" && (
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.pickerButton,
                    { backgroundColor: "gray" },
                  ]}
                  onPress={toggleEndDatepicker}
                >
                  <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.pickerButton,
                    { backgroundColor: "gray" },
                  ]}
                  onPress={() => confirmEndDate(endDate)}
                >
                  <Text>Confirm</Text>
                </TouchableOpacity>
              </View>
            )}
            {!showEndDatePicker && (
              <Pressable onPress={toggleEndDatepicker}>
                <TextInput
                  value={moment(endDate).format("MM/DD/YYYY")}
                  placeholder="End Date"
                  style={styles.input}
                  placeholderTextColor="gray"
                  editable={false}
                  onPressIn={toggleEndDatepicker}
                />
              </Pressable>
            )}
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Description"
              style={styles.input}
              placeholderTextColor="gray"
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={
                selectedWorkExperienceIndex == null
                  ? handleAddWorkExperience
                  : undefined
              }
            >
              <Text style={styles.saveButtonText}>
                {selectedWorkExperienceIndex !== null ? "Save" : "Add"}
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* Hard Skills */}
        <Card containerStyle={styles.profileCard}>
          <Card.Title style={styles.sectionTitle}>Hard Skills</Card.Title>
          <Card.Divider />
          <View style={styles.sectionHeader}>
            <ScrollView>
              {/* Display Hard Skills */}
              {hardSkills.map((skill, index) => (
                <View key={index} style={styles.Item}>
                  <View style={styles.smallItem}>
                    <Text>{skill.name}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleDeleteSkill(skill.skillID)}
                  >
                    <Ionicons name="trash" size={24} color="#2F704D" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={handleShowHardSkillModal}>
              <Ionicons name="add-circle" size={24} color="#2F704D" />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Soft Skills */}
        <Card containerStyle={styles.profileCard}>
          <Card.Title style={styles.sectionTitle}>Soft Skills</Card.Title>
          <Card.Divider />
          <View style={styles.sectionHeader}>
            <ScrollView>
              {/* Display Soft Skills */}
              {softSkills.map((skill, index) => (
                <View key={index} style={styles.Item}>
                  <View style={styles.smallItem}>
                    <Text>{skill.name}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleDeleteSkill(skill.skillID)}
                  >
                    <Ionicons name="trash" size={24} color="#2F704D" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={handleShowSoftSkillModal}>
              <Ionicons name="add-circle" size={24} color="#2F704D" />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Hard Skills Modal */}
        <Modal visible={showHardSkillModal} animationType="slide">
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={handleHardSkillModalClose}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#2F704D" />
            </TouchableOpacity>
            <Text style={styles.modalHeaderText}>Add Hard Skill</Text>
            <MultipleSelectList
              data={hard}
              placeholder="Skills"
              setSelected={(val) => setSelectedHardSkills(val)}
              save="value"
              label="Hard Skills"
            />
            {/* Add HardSkill */}
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleAddHardSkill}
            >
              <Text style={styles.saveButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* Soft Skills Modal */}
        <Modal visible={showSoftSkillModal} animationType="slide">
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={handleSoftSkillModalClose}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#2F704D" />
            </TouchableOpacity>
            <Text style={styles.modalHeaderText}>Add Soft Skill</Text>
            <MultipleSelectList
              data={soft}
              placeholder="Skills"
              setSelected={(val) => setSelectedSoftSkills(val)}
              save="value"
              label="Soft Skills"
            />
            {/* Add Soft Skill */}
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleAddSoftSkill}
            >
              <Text style={styles.saveButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* Languages */}
        <Card containerStyle={styles.profileCard}>
          <Card.Title style={styles.sectionTitle}>Languages</Card.Title>
          <Card.Divider />
          <View style={styles.sectionHeader}>
            <ScrollView>
              {languages.map((language, index) => (
                <View key={index} style={styles.Item}>
                  <View style={styles.smallItem}>
                    <Text>
                      {language.name} : {language.proficiency}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleDeleteLanguage(language.languageID)}
                  >
                    <Ionicons name="trash" size={24} color="#2F704D" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setShowLanguageModal(true)}>
              <Ionicons name="add-circle" size={24} color="#2F704D" />
            </TouchableOpacity>
          </View>
        </Card>

        <Modal visible={showLanguageModal} animationType="slide">
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={handleLanguageModalClose}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#2F704D" />
            </TouchableOpacity>
            <Text style={styles.modalHeaderText}>Add Language</Text>
            <TextInput
              value={languageName}
              onChangeText={setLanguageName}
              placeholder="Language Name"
              style={styles.input}
              placeholderTextColor="gray"
            />
            <SelectList
              data={proficiencyOptions}
              placeholder="Language Proficiency"
              setSelected={(val) => setProficiencyName(val)}
              save="value"
              label="Language Proficiency"
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleAddLanguage}
            >
              <Text style={styles.saveButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </ImageBackground>
  );
};

export default ProfileScreen;
