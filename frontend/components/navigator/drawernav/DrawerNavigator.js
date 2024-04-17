import * as React from 'react';
import { ImageBackground } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Button } from "react-native-paper";
import { BottomTabNavigator } from "../tabbar/tabnavication";
import { COLORS } from '../../../constants';
import Home from '../../home/Home';
const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }) => {
    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
        });
    };

    return (
        <ImageBackground
            source={require("../../../assets/images/bg.png")}
            resizeMode="stretch"
            style={{ flex: 1 }}
        >
            <React.Fragment>
                <DrawerContentScrollView style={{ flex: 1 }}>
                    <DrawerItem
                        label="Home"
                        onPress={() => navigation.navigate('Home')}
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
                    unmountOnBlur:true
                  }}
            />
        </Drawer.Navigator>

    );
}

