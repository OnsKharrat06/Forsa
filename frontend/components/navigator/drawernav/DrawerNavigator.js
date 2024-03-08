import * as React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Button } from "react-native-paper";
import { BottomTabNavigator } from "../tabbar/tabnavication";
import { COLORS } from '../../../constants';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }) => {
    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
        });
    };

    return (
        <React.Fragment>
            <DrawerContentScrollView style={{ flex: 1 }}>
                <DrawerItem
                    label="Home"
                    onPress={() => navigation.navigate('BottomTabNavigator')}
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
            <Drawer.Screen name="Home" component={BottomTabNavigator} />
        </Drawer.Navigator>
    );
}
