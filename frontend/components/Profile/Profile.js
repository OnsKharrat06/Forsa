import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, Pressable, Platform, TouchableOpacity, TextInput, ImageBackground, Image } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import styles from "./ProfileStyle";
import { hard, soft } from "./Skill";
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import axios from 'axios';

const ProfileScreen = () => {
    const [editMode, setEditMode] = useState(false);

    const [showBioModal, setShowBioModal] = useState(false);
    const [selectedBioIndex, setSelectedBioIndex] = useState(null);
    const [bio, setBio] = useState('');

    const [showEducationModal, setShowEducationModal] = useState(false);
    const [education, setEducation] = useState([]);
    const [schoolName, setSchoolName] = useState('');
    const [degree, setDegree] = useState('');
    const [fieldOfStudies, setFieldOfStudies] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [grade, setGrade] = useState('');
    const [selectedEducationIndex, setSelectedEducationIndex] = useState(null);

    const [showContactModal, setShowContactModal] = useState(false);
    const [selectedContactIndex, setSelectedContactIndex] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [linkedinURL, setlinkedinURL] = useState('');
    const [email, setEmail] = useState('');

    const [workExperience, setWorkExperience] = useState([]);
    const [selectedWorkExperienceIndex, setSelectedWorkExperienceIndex] = useState(null);
    const [companyName, setCompanyName] = useState('');
    const [location, setLocation] = useState('');
    const [currentlyWorking, setCurrentlyWorking] = useState(false);
    const [description, setDescription] = useState('');
    const [showWorkExperienceModal, setShowWorkExperienceModal] = useState(false);

    const [softSkills, setSoftSkills] = useState([]);
    const [hardSkills, setHardSkills] = useState([]);
    const [softselectedSkills, setSelectedSoftSkills] = useState([]);
    const [hardselectedSkills, setSelectedHardSkills] = useState([]);
    const [showHardSkillModal, setShowHardSkillModal] = useState(false);
    const [showSoftSkillModal, setShowSoftSkillModal] = useState(false);

    const [languages, setLanguages] = useState([]);
    const [languageName, setLanguageName] = useState('');
    const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(null);
    const [showLanguageModal, setShowLanguageModal] = useState(false);


    const [showPicker, setShowPicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

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
    }, []);

    const getAllSkills = async () => {
        try{
        const {data:{skills}} = await axios.get('http://192.168.167.43:8000/user_skills/9');
        console.log(skills);
        const allSkills = skills.map(({skill, skill_type,user_skill_id,...rest})=>({name: skill, skillType: skill_type, skillID: user_skill_id}));
        setSoftSkills(allSkills.filter(elm => elm.skillType == "soft"));
        setHardSkills(allSkills.filter(elm => elm.skillType == "hard"));

        }catch(error){
            console.error("error getting skills:", error);
        }
    
    }

    const handleContactIconPress = () => {
        setShowContactModal(true);
    };

    const handleSaveContactInfo = () => {
        // Save email and phone number to backend
        // Implement your logic here
        setShowContactModal(false);
    };

    const handleModalClose = () => {
        setSelectedContactIndex(null);
        setShowContactModal(false);
    };

    const handleSaveBio = () => {
        // Save edited bio to backend
        // Example:
        // saveBioToBackend(editBio);
        setShowBioModal(false);
    };

    const handleEditBio = () => {
        setShowBioModal(true);
    };

    const handleBioModalClose = () => {
        setSelectedBioIndex(null);
        setShowBioModal(false);
    };

    const handleAddEducation = () => {
        const newEducation = {
            schoolName,
            degree,
            fieldOfStudies,
            startDate: startDate || null,
            endDate: endDate || null,
            grade,
        };
        setEducation([...education, newEducation]);
        setShowEducationModal(false);
        // Reset form fields
        setSchoolName('');
        setDegree('');
        setFieldOfStudies('');
        setStartDate(new Date());
        setEndDate(new Date());
        setGrade('');
    };


    const handleDeleteEducation = (index) => {
        const updatedEducation = [...education];
        updatedEducation.splice(index, 1);
        setEducation(updatedEducation);
    };

    const handleEducationModalClose = () => {
        setSelectedEducationIndex(null);
        setShowEducationModal(false);
    };

    const handleAddWorkExperience = () => {
        const newWorkExperience = {
            companyName,
            location,
            startDate: startDate || null,
            endDate: currentlyWorking ? 'Currently Working' : endDate || null,
            description,
        };
        setWorkExperience([...workExperience, newWorkExperience]);
        setShowWorkExperienceModal(false);
        // Reset form fields
        setCompanyName('');
        setLocation('');
        setStartDate(new Date());
        setEndDate(new Date());
        setCurrentlyWorking(false);
        setDescription('');
    };

    const handleDeleteWorkExperience = (index) => {
        const updatedWorkExperience = [...workExperience];
        updatedWorkExperience.splice(index, 1);
        setWorkExperience(updatedWorkExperience);
    };
    const handleWorkExperienceModalClose = () => {
        setShowWorkExperienceModal(false);
    };

    const handleAddHardSkill = async () => {
        try {
            await axios.post("http://192.168.167.43:8000/user_skills/9", {skills:hardselectedSkills.map((elm)=>({skill:elm, skill_type: "hard"}))});
            await getAllSkills();
        } catch (error) {
            
        }
        setShowHardSkillModal(false);
        setSelectedHardSkills([]);
    };

    const handleAddSoftSkill = async () => {
        try {
            await axios.post("http://192.168.167.43:8000/user_skills/9", {skills:softselectedSkills.map((elm)=>({skill:elm, skill_type: "soft"}))});
            await getAllSkills();
        } catch (error) {
            
        }
        setShowSoftSkillModal(false);
        setSelectedSoftSkills([]);
    };


    const handleDeleteSkill = async (skillID) => {
        try {
            await axios.delete(`http://192.168.167.43:8000/user_skills/${skillID}`);
            await getAllSkills();
        } catch (error) {
            
        }
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

    const handleAddLanguage = () => {
        const newLanguage = { name: languageName };
        setLanguages([...languages, newLanguage]);
        setShowLanguageModal(false);
        setLanguageName('');
    };

    const handleDeleteLanguage = (index) => {
        const updatedLanguages = [...languages];
        updatedLanguages.splice(index, 1);
        setLanguages(updatedLanguages);
    };
    const handleLanguageModalClose = () => {
        setShowLanguageModal(false);
    };


    return (
        <ImageBackground
            source={require("../../assets/images/bg.png")}
            resizeMode="stretch"
            style={{ flex: 1 }}
        >
            <ScrollView>
                <View style={styles.container}>
                    {/* Cover Photo and Profile Photo */}
                    <View style={styles.coverPhotoContainer}>
                        {/* Cover Photo */}
                        <ImageBackground
                            source={require('../../assets/images/profilebg.png')}
                            style={styles.coverPhoto}
                        >
                            {/* Profile Picture */}
                            <View style={styles.profilePhotoContainer}>
                                <TouchableOpacity
                                    onPress={() => setEditMode(true)}
                                    activeOpacity={0.8}
                                    style={styles.profilePhoto}
                                >
                                    <Image
                                        source={require('../../assets/images/ons.jpg')}
                                        style={styles.profileImage}
                                    />
                                    {editMode && (
                                        <TouchableOpacity
                                            onPress={() => setEditMode(false)}
                                            style={styles.editIcon}
                                        >
                                            <Ionicons name="pencil" size={24} color="black" />
                                        </TouchableOpacity>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </View>

                    {/* Name, Title, Location */}
                    <View style={styles.userInfo}>
                        <View>
                            <Text style={styles.infoText}>Ons Kharrat</Text>
                            <Text style={styles.infoText}>Software Engineer</Text>
                            <Text style={styles.infoText}>Tunisia,Tunis</Text>
                        </View>
                        {/* Contact Icon */}
                        <TouchableOpacity onPress={handleContactIconPress} style={styles.contactIcon}>
                            <Ionicons name="mail" size={24} color="black" />
                        </TouchableOpacity>
                    </View>

                    {/* Contact Info Modal */}
                    <Modal visible={showContactModal} animationType="slide">
                        <View style={styles.modalContainer}>
                            <TouchableOpacity onPress={handleModalClose} style={styles.closeButton}>
                                <Ionicons name="close" size={24} color="black" />
                            </TouchableOpacity>
                            <Text style={styles.modalHeaderText}>Contact Information</Text>
                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Email"
                                style={styles.input}
                                placeholderTextColor="gray"
                            />
                            <TextInput
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                placeholder="Phone Number"
                                style={styles.input}
                                placeholderTextColor="gray"
                            />
                            <TextInput
                                value={linkedinURL}
                                onChangeText={setlinkedinURL}
                                placeholder="LinkedIn URL"
                                style={styles.input}
                                placeholderTextColor="gray"
                            />
                            <TouchableOpacity style={styles.saveButton} onPress={selectedContactIndex == null ? handleSaveContactInfo : undefined}>
                                <Text style={styles.saveButtonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>

                    {/* Separator */}
                    <View style={styles.separator} />

                    {/* Bio Section */}
                    <View style={styles.section}>
                        {/* Title and Edit Icon */}
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Bio</Text>
                            <TouchableOpacity onPress={handleEditBio}>
                                <Ionicons name="create" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        {/* Bio Text */}
                        <View>
                            <Text>{bio}</Text>
                        </View>
                    </View>

                    {/* Bio Modal */}
                    <Modal visible={showBioModal} animationType="slide">
                        <View style={styles.modalContainer}>
                            <TouchableOpacity onPress={handleBioModalClose} style={styles.closeButton}>
                                <Ionicons name="close" size={24} color="black" />
                            </TouchableOpacity>
                            <Text style={styles.modalHeaderText}>Edit Bio</Text>
                            <TextInput
                                multiline
                                value={bio}
                                onChangeText={setBio}
                                placeholder="Enter your bio"
                                style={styles.input}
                                placeholderTextColor="gray"
                            />
                            <TouchableOpacity style={styles.saveButton} onPress={selectedBioIndex == null ? handleSaveBio : undefined}>
                                <Text style={styles.saveButtonText}>Save</Text>
                            </TouchableOpacity>

                        </View>
                    </Modal>

                    {/* Education Section */}
                    <View style={styles.section}>
                        {/* Title and Add Icon */}
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Education</Text>
                            <TouchableOpacity onPress={() => setShowEducationModal(true)}>
                                <Ionicons name="add-circle" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        {/* Education List */}
                        <ScrollView>
                            {education.map((item, index) => (
                                <View key={index} style={styles.Item}>
                                    <View>
                                        <Text>School: {item.schoolName}</Text>
                                        <Text>Degree: {item.degree}</Text>
                                        <Text>Field of Studies: {item.fieldOfStudies}</Text>
                                        <Text>Start Date: {moment(item.startDate).format("MM/DD/YYYY")}</Text>
                                        <Text>End Date: {moment(item.endDate).format("MM/DD/YYYY")}</Text>
                                        <Text>Grade: {item.grade}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => handleDeleteEducation(index)}>
                                        <Ionicons name="trash" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Education Modal */}
                    <Modal visible={showEducationModal} animationType="slide">
                        <View style={styles.modalContainer}>
                            <TouchableOpacity onPress={handleEducationModalClose} style={styles.closeButton}>
                                <Ionicons name="close" size={24} color="black" />
                            </TouchableOpacity>
                            <Text style={styles.modalHeaderText}>{selectedEducationIndex !== null ? 'Edit Education' : 'Add Education'}</Text>
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
                                    textColor='gray'
                                />
                            )}
                            {showPicker && Platform.OS === "ios" && (
                                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                    <TouchableOpacity
                                        style={[styles.button, styles.pickerButton, { backgroundColor: "gray" }]}
                                        onPress={toggleDatepicker}
                                    >
                                        <Text>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, styles.pickerButton, { backgroundColor: "gray" }]}
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
                                    textColor='gray'
                                />
                            )}
                            {showEndDatePicker && Platform.OS === "ios" && (
                                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                    <TouchableOpacity
                                        style={[styles.button, styles.pickerButton, { backgroundColor: "gray" }]}
                                        onPress={toggleEndDatepicker}
                                    >
                                        <Text>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, styles.pickerButton, { backgroundColor: "gray" }]}
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
                            <TouchableOpacity style={styles.saveButton} onPress={selectedEducationIndex == null ? handleAddEducation : undefined}>
                                <Text style={styles.saveButtonText}>{selectedEducationIndex !== null ? 'Save' : 'Add'}</Text>
                            </TouchableOpacity>

                        </View>
                    </Modal>

                    {/* Work Experience Section */}
                    <View style={styles.section}>
                        {/* Title and Add Icon */}
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Work Experience</Text>
                            <TouchableOpacity onPress={() => setShowWorkExperienceModal(true)}>
                                <Ionicons name="add-circle" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        {/* Work Experience List */}
                        <ScrollView>
                            {workExperience.map((item, index) => (
                                <View key={index} style={styles.Item}>
                                    <View>
                                        <Text>Company Name: {item.companyName}</Text>
                                        <Text>Location: {item.location}</Text>
                                        <Text>Start Date: {moment(item.startDate).format("MM/DD/YYYY")}</Text>
                                        <Text>End Date: {moment(item.endDate).format("MM/DD/YYYY")}</Text>
                                        <Text>Description: {item.description}</Text>
                                    </View>

                                    <TouchableOpacity onPress={() => handleDeleteWorkExperience(index)}>
                                        <Ionicons name="trash" size={24} color="black" />
                                    </TouchableOpacity>

                                    <View style={styles.separator}></View>
                                </View>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Work Experience Modal */}
                    <Modal visible={showWorkExperienceModal} animationType="slide">
                        <View style={styles.modalContainer}>
                            <TouchableOpacity onPress={handleWorkExperienceModalClose} style={styles.closeButton}>
                                <Ionicons name="close" size={24} color="black" />
                            </TouchableOpacity>
                            <Text style={styles.modalHeaderText}>{selectedWorkExperienceIndex !== null ? 'Edit Work Experience' : 'Add Work Experience'}</Text>
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
                                    textColor='gray'
                                />
                            )}
                            {showPicker && Platform.OS === "ios" && (
                                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                    <TouchableOpacity
                                        style={[styles.button, styles.pickerButton, { backgroundColor: "gray" }]}
                                        onPress={toggleDatepicker}
                                    >
                                        <Text>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, styles.pickerButton, { backgroundColor: "gray" }]}
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
                                    textColor='gray'
                                />
                            )}
                            {showEndDatePicker && Platform.OS === "ios" && (
                                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                    <TouchableOpacity
                                        style={[styles.button, styles.pickerButton, { backgroundColor: "gray" }]}
                                        onPress={toggleEndDatepicker}
                                    >
                                        <Text>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, styles.pickerButton, { backgroundColor: "gray" }]}
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
                            <TouchableOpacity style={styles.saveButton} onPress={selectedWorkExperienceIndex == null ? handleAddWorkExperience : undefined}>
                                <Text style={styles.saveButtonText}>{selectedWorkExperienceIndex !== null ? 'Save' : 'Add'}</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>

                    <View style={styles.section}>

                        {/* Hard Skills */}
                        <View style={styles.section}>
                            {/* Hard Skills Header */}
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Hard Skills</Text>
                                <TouchableOpacity onPress={handleShowHardSkillModal}>
                                    <Ionicons name="add-circle" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                            <ScrollView>
                                {/* Display Hard Skills */}
                                {hardSkills.map((skill, index) => (
                                    <View key={index} style={styles.Item}>
                                        <View style={styles.smallItem}>
                                            <Text>{skill.name}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => handleDeleteSkill(skill.skillID)}>
                                            <Ionicons name="trash" size={24} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>

                        {/* Separator */}
                        <View style={styles.separator} />

                        {/* SoftSkills */}
                        <View style={styles.section}>
                            {/* Soft Skills Header */}
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Soft Skills</Text>
                                <TouchableOpacity onPress={handleShowSoftSkillModal}>
                                    <Ionicons name="add-circle" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                            <ScrollView>
                                {/* Display Soft Skills */}
                                {softSkills.map((skill, index) => (
                                    <View key={index} style={styles.Item}>
                                        <View style={styles.smallItem}>
                                            <Text>{skill.name}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => handleDeleteSkill(skill.skillID)}>
                                            <Ionicons name="trash" size={24} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    </View>

                    {/* Hard Skills Modal */}
                    <Modal visible={showHardSkillModal} animationType="slide">
                        <View style={styles.modalContainer}>
                            <TouchableOpacity onPress={handleHardSkillModalClose} style={styles.closeButton}>
                                <Ionicons name="close" size={24} color="black" />
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
                            <TouchableOpacity onPress={handleSoftSkillModalClose} style={styles.closeButton}>
                                <Ionicons name="close" size={24} color="black" />
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
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Languages</Text>
                            <TouchableOpacity onPress={() => setShowLanguageModal(true)}>
                                <Ionicons name="add-circle" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <ScrollView>
                            {languages.map((language, index) => (
                                <View key={index} style={styles.Item}>
                                    <View style={styles.smallItem}>
                                        <Text>{language.name}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => handleDeleteLanguage(index)}>
                                        <Ionicons name="trash" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                    {/* Language Modal */}
                    <Modal visible={showLanguageModal} animationType="slide">
                        <View style={styles.modalContainer}>
                            <TouchableOpacity onPress={handleLanguageModalClose} style={styles.closeButton}>
                                <Ionicons name="close" size={24} color="black" />
                            </TouchableOpacity>
                            <Text style={styles.modalHeaderText}>Add Language</Text>
                            <TextInput
                                value={languageName}
                                onChangeText={setLanguageName}
                                placeholder="Language Name"
                                style={styles.input}
                            />
                            <TouchableOpacity style={styles.saveButton} onPress={selectedLanguageIndex == null ? handleAddLanguage : undefined}>
                                <Text style={styles.saveButtonText}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View>
            </ScrollView >
        </ImageBackground >
    );
};


export default ProfileScreen;
