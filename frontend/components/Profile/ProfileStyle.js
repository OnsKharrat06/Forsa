import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginBottom: 60,
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
    contactIcon: {
        marginRight: 11, 
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
        marginLeft: 11,
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
        backgroundColor: '#F1F0EC', // Add background color of contact information card  here
        borderRadius: 10,
        borderWidth: 1, // Add border width
        borderColor: '#2F704D', // Add border color
    },
    modalHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color:'#2F704D',
    },
    input: {
        width: '80%',
        borderWidth: 1,
        borderColor: '#2F704D', // Update border color
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        backgroundColor: 'transparent', // Make background transparent
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
        backgroundColor: 'transparent', // Make background transparent
        borderWidth: 1, // Add border width
        borderColor: '#2F704D', // Set border color
        padding: 10,
        borderRadius: 5,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingBottom: 5, // Add padding below the border
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
        color: '#2F704D', // Set text color to match border
    },
    saveButton: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: COLORS.tertiary,
        padding: 10,
        borderRadius: 5,
        width: 130, // Set desired width
        height: 40, // Set desired height
    },
    saveButtonText: {
        color: 'white',
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
    },
    datePicker: {
        height: 120,
        marginTop: -10,
    },
    button: {
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        marginTop: 10,
        marginBottom: 15,
        backgroundColor: "#075985",
    },
    pickerButton: {
        paddingHorizontal: 20,
    },

});

export default styles;