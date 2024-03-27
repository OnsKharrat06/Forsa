import React from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "./components/login-signup/core/theme";
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
} from "./components/login-signup/screens";
import Home from "./components/home/Home";
import { BottomTabNavigator } from './components/navigator/tabbar/tabnavication'
import DrawNavigation from "./components/navigator/drawernav/DrawerNavigator.js";
import Form from "./components/Form-cv/CreateCV.js";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider theme={theme}>
     <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
          <Stack.Screen name="Home" component={DrawNavigation} />
          <Stack.Screen name="CreateCV" component={Form} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
