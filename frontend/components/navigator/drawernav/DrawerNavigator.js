import * as React from 'react';
import { ImageBackground } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Button } from "react-native-paper";
import { BottomTabNavigator } from "../tabbar/tabnavication";
import { COLORS } from '../../../constants';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect } from 'react';
import { userContext } from '../../../context/userContext';
import { useContext } from 'react';
import axios from 'axios';
import { logOut } from '../../../Auth';
import Save from '../../SavedJob/Save';
const Drawer = createDrawerNavigator();

const url = "http://192.168.102.43:8000/user"

const CustomDrawerContent = ({ navigation }) => {
    const { user, setUser } = useContext(userContext);
    useEffect(() => {
        console.log("user", user);
        if (user) return;
        getUserData();
    }
        , [user]);
    const handleLogout = async () => {
        await logOut();
        setUser(undefined);
        navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
        });
    };
    const getUserData = async () => {
        const response = await axios.get(url);
        setUser(response.data.user);
        console.log("response", response);
    }

    return (
        <ImageBackground
            source={require("../../../assets/images/bg.png")}
            resizeMode="stretch"
            style={{ flex: 1 }}
        >
            <React.Fragment>
                <DrawerContentScrollView style={{ flex: 1 }}>
                    <DrawerItem
                        drawerIcon={() => <Ionicons name="home-outline" size={24} />}
                        label="Home"
                        onPress={() => navigation.navigate('Home')}
                        style={{ marginBottom: 10 }}
                    />
                    <DrawerItem
                        drawerIcon={() => <Ionicons name="bookmark-outline" size={24} />}
                        label="Save"
                        onPress={() => navigation.navigate('Save')}
                        style={{ marginBottom: 10 }}
                    />
                </DrawerContentScrollView>
                <Button
                    mode="outlined"
                    onPress={handleLogout}
                    style={{
                        marginVertical: 10,
                        marginHorizontal: 16,
                        marginBottom: 16,
                    }}
                >
                    Logout
                </Button>
            </React.Fragment>
        </ImageBackground>
    );
};

export default function DrawNavigation() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerStyle: {
                    backgroundColor: COLORS.tertiary,
                },
                headerTintColor: 'white',
            }}
        >
            <Drawer.Screen
                name="Home"
                component={BottomTabNavigator}
                options={{
                    title: 'Home',
                    unmountOnBlur: true
                }}
            />
            <Drawer.Screen
                name="Save"
                component={Save}
                options={{
                    title: 'Save',
                    unmountOnBlur: true
                }}
            />
        </Drawer.Navigator>

    );
}

