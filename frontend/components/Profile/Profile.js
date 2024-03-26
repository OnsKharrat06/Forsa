import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, ImageBackground, Image } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import { COLORS } from '../../constants';

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
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
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

    const [technicalSkills, setTechnicalSkills] = useState([]);
    const [nonTechnicalSkills, setNonTechnicalSkills] = useState([]);
    const [skillName, setSkillName] = useState('');
    const [selectedSkillIndex, setSelectedSkillIndex] = useState(null);
    const [showSkillModal, setShowSkillModal] = useState(false);

    const [languages, setLanguages] = useState([]);
    const [languageName, setLanguageName] = useState('');
    const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(null);
    const [showLanguageModal, setShowLanguageModal] = useState(false);

    useEffect(() => {
        // Fetch user data from your backend or API
        // Update state with user data
        // Example:
        // fetchUserData().then(data => setUserData(data));
    }, []);

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
            startDate,
            endDate,
            grade,
        };
        setEducation([...education, newEducation]);
        setShowEducationModal(false);
        // Reset form fields
        setSchoolName('');
        setDegree('');
        setFieldOfStudies('');
        setStartDate('');
        setEndDate('');
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
            startDate,
            endDate: currentlyWorking ? 'Currently Working' : endDate,
            description,
        };
        setWorkExperience([...workExperience, newWorkExperience]);
        setShowWorkExperienceModal(false);
        // Reset form fields
        setCompanyName('');
        setLocation('');
        setStartDate('');
        setEndDate('');
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

    const handleAddSkill = (isTechnical) => {
        const newSkill = { name: skillName };
        if (isTechnical === true) {
            setTechnicalSkills([...technicalSkills, newSkill]);
        } else {
            setNonTechnicalSkills([...nonTechnicalSkills, newSkill]);
        }
        setShowSkillModal(false);
        setSkillName('');
    };



    const handleDeleteSkill = (isTechnical, index) => {
        const updatedSkills = isTechnical ? [...technicalSkills] : [...nonTechnicalSkills];
        updatedSkills.splice(index, 1);
        if (isTechnical) {
            setTechnicalSkills(updatedSkills);
        } else {
            setNonTechnicalSkills(updatedSkills);
        }
    };
    const handleSkillModalClose = () => {
        setShowSkillModal(false);
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
                            />
                            <TextInput
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                placeholder="Phone Number"
                                style={styles.input}
                            />
                            <TextInput
                                value={phoneNumber}
                                onChangeText={setlinkedinURL}
                                placeholder="LinkedIn URL"
                                style={styles.input}
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
                                        <Text>Start Date: {item.startDate}</Text>
                                        <Text>End Date: {item.endDate}</Text>
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
                            />
                            <TextInput
                                value={degree}
                                onChangeText={setDegree}
                                placeholder="Degree"
                                style={styles.input}
                            />
                            <TextInput
                                value={fieldOfStudies}
                                onChangeText={setFieldOfStudies}
                                placeholder="Field of Studies"
                                style={styles.input}
                            />
                            <TextInput
                                value={startDate}
                                onChangeText={setStartDate}
                                placeholder="Start Date"
                                style={styles.input}
                            />
                            <TextInput
                                value={endDate}
                                onChangeText={setEndDate}
                                placeholder="End Date (or currently working there)"
                                style={styles.input}
                            />
                            <TextInput
                                value={grade}
                                onChangeText={setGrade}
                                placeholder="Grade"
                                style={styles.input}
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
                                        <Text>Start Date: {item.startDate}</Text>
                                        <Text>End Date: {item.endDate}</Text>
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
                            />
                            <TextInput
                                value={location}
                                onChangeText={setLocation}
                                placeholder="Location"
                                style={styles.input}
                            />
                            <TextInput
                                value={startDate}
                                onChangeText={setStartDate}
                                placeholder="Start Date"
                                style={styles.input}
                            />
                            <TextInput
                                value={endDate}
                                onChangeText={setEndDate}
                                placeholder="End Date (or currently working there)"
                                style={styles.input}
                            />
                            <TextInput
                                value={description}
                                onChangeText={setDescription}
                                placeholder="Description"
                                style={styles.input}
                            />
                            <TouchableOpacity style={styles.saveButton} onPress={selectedWorkExperienceIndex == null ? handleAddWorkExperience : undefined}>
                                <Text style={styles.saveButtonText}>{selectedWorkExperienceIndex !== null ? 'Save' : 'Add'}</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>

                    {/* Skills */}
                    <View style={styles.section}>
                        {/* Technical Skills */}
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Technical Skills</Text>
                            <TouchableOpacity onPress={() => setShowSkillModal(true, true)}>
                                <Ionicons name="add-circle" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <ScrollView>
                            {technicalSkills.map((skill, index) => (
                                <View key={index} style={styles.Item}>
                                    <View style={styles.smallItem}>
                                        <Text>{skill.name}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => handleDeleteSkill(true, index)}>
                                        <Ionicons name="trash" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>

                        {/* Separator */}
                        <View style={styles.separator} />

                        {/* Non-Technical Skills */}
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Non-technical Skills</Text>
                            <TouchableOpacity onPress={() => setShowSkillModal(true, false)}>
                                <Ionicons name="add-circle" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <ScrollView>
                            {nonTechnicalSkills.map((skill, index) => (
                                <View key={index} style={styles.Item}>
                                    <View style={styles.smallItem}>
                                        <Text>{skill.name}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => handleDeleteSkill(false, index)}>
                                        <Ionicons name="trash" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Skill Modal */}
                    <Modal visible={showSkillModal} animationType="slide">
                        <View style={styles.modalContainer}>
                            <TouchableOpacity onPress={handleSkillModalClose} style={styles.closeButton}>
                                <Ionicons name="close" size={24} color="black" />
                            </TouchableOpacity>
                            <Text style={styles.modalHeaderText}>Add Skill</Text>
                            <TextInput
                                value={skillName}
                                onChangeText={setSkillName}
                                placeholder="Skill Name"
                                style={styles.input}
                            />
                            {/* Add Technical Skill */}
                            <View style={padding = 10}>
                                <TouchableOpacity
                                    style={styles.saveButton}
                                    onPress={() => handleAddSkill(true)}
                                >
                                    <Text style={styles.saveButtonText}>Add Technical Skill</Text>
                                </TouchableOpacity>

                                {/* Add Non-Technical Skill */}
                                <TouchableOpacity
                                    style={styles.saveButton}
                                    onPress={() => handleAddSkill(false)}
                                >
                                    <Text style={styles.saveButtonText}>Add Non-technical Skill</Text>
                                </TouchableOpacity>
                            </View>
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
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginBottom: 60
    },
    coverPhotoContainer: {
        marginBottom: 20,
    },
    coverPhoto: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profilePhotoContainer: {
        position: 'absolute',
        bottom: -60,
        alignSelf: 'center',
        zIndex: 1,
    },
    profilePhoto: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    editIcon: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 20,
        padding: 5,
    },
    userInfo: {
        marginBottom: 20,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    infoText: {
        fontSize: 16,
        marginBottom: 5,
    },
    modalContainer: {
        width: '80%',
        height: '60%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    modalHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        color: COLORS.primary,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 20,
    },
    section: {
        marginBottom: 20,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
    saveButton: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: COLORS.tertiary,
        padding: 10,
        borderRadius: 5,
        alignSelf: 'flex-end',
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalHeader: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
        marginBottom: 20,
    },
    Item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    smallItem: {
        borderRadius: 20,
        padding: 5,
        borderWidth: 2,
        borderColor: COLORS.tertiary,
    }

});

export default ProfileScreen;
