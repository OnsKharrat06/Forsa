import React, { useEffect, useRef, useState } from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer, createNavigationContainerRef } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "./components/login-signup/core/theme";
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
} from "./components/login-signup/screens";
import DrawNavigation from "./components/navigator/drawernav/DrawerNavigator.js";
import JobDetails from "./components/jobdetails/JobDetails.js";
import JobCard from "./components/Jobs/JobCard.js";
import JobSearch from "./components/Jobs/JobSeach.js";
import { UserContextProvider } from "./context/userContext.js";
import { getToken } from "./Auth.js";
import { setToken
 } from "./Auth.js";
const Stack = createStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState("DrawNavigation");
  const NavigationContainerRef = createNavigationContainerRef();
  const checkSession = async () =>{
    const token = await getToken();
    if(token){
      await setToken(token);
      NavigationContainerRef?.navigate('DrawNavigation');
    }
  };

  useEffect(()=>{
    checkSession();
  },[]);
  return (
    <Provider theme={theme}>
      <UserContextProvider>
        <NavigationContainer ref={NavigationContainerRef}>
          <Stack.Navigator
            initialRouteName={initialRoute}
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
     
      </UserContextProvider>
    </Provider>
  );
}


