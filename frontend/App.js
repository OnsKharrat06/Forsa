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
import JobDetails from "./components/jobdetails/JobDetails.js";
import JobCard from "./components/Jobs/JobCard.js";
import JobSearch from "./components/Jobs/JobSeach.js";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider theme={theme}>
     <NavigationContainer>
        <Stack.Navigator
          initialRouteName="DrawNavigation"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
          <Stack.Screen name="DrawNavigation" component={DrawNavigation} />
          <Stack.Screen name="JobSearch" component={JobSearch} />
          <Stack.Screen name="JobDetails" component={JobDetails} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


