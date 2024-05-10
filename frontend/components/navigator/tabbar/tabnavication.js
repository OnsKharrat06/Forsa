import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation,  getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Text, View, Dimensions, Image } from "react-native";
import Home from "../../home/Home";
// import Profile from "../../screens/Profile";
// import ProfileSettings from "../../screens/Settings";
import { getPathDown } from "./curve";
import { Svg, Path } from "react-native-svg";
import { scale } from "react-native-size-scaling";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS } from "../../../constants";
import Profile from "../../Profile/Profile";
import Apply from "../../AppliedJob/Apply";
import Match from "../../AI/AIMatch";
import MatchesList from "../../AI/Matches";
import Save from "../../SavedJob/Save";


const Tab = createBottomTabNavigator();

export const BottomTabNavigator = ({navigation, route}) => {
  const [maxWidth, setMaxWidth] = useState(Dimensions.get("window").width);
  const returnpathDown = getPathDown(maxWidth, 60, 50);

  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    const headerTitle = routeName === "Home" ? "Home" : routeName || "Home";

    navigation.setOptions({ headerTitle });
  }, [navigation, route]);

  return (
    <Tab.Navigator
      safeAreaInsets={{ bottom: 0, top: 0 }}
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarStyle: {
          backgroundColor: "transparent",
          borderTopWidth: 0,
          position: "absolute",
          elevation: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarItemStyle: {
            margin: 0,
            backgroundColor: COLORS.white,
          },
          tabBarIcon: () => (
            <View>
              <Ionicons name="home" size={30} color={COLORS.tertiary} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Saved"
        component={Save}
        options={{
          headerShown: false,
          tabBarItemStyle: {
            margin: 0,
            backgroundColor: COLORS.white,
          },
          tabBarIcon: () => (
            <View>
              <Ionicons name="heart" size={30} color={COLORS.tertiary} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={Match}
        options={{
          headerShown: false,
          unmountOnBlur: false,
          tabBarItemStyle: {
            margin: 0,
            zIndex: -40,
          },
          tabBarIcon: () => (
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 56,
                width: 56,
                backgroundColor: COLORS.white,
                borderRadius: 35,
              }}
            >
              <Ionicons name="add-outline" size={40} color={COLORS.tertiary} />
            </View>
          ),
          tabBarLabel: () => (
            <View>
              <Svg width={maxWidth} height={scale(60)}>
                <Path fill={COLORS.white} {...{ d: returnpathDown }} />
              </Svg>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Applied"
        component={Apply}
        options={{
          headerShown: false,
          tabBarItemStyle: {
            margin: 0,
            backgroundColor: COLORS.white,
          },
          tabBarIcon: () => (
            <View>
              <Ionicons
                name="file-tray-full"
                size={30}
                color={COLORS.tertiary}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarItemStyle: {
            margin: 0,
            backgroundColor: COLORS.white,
          },
          tabBarIcon: () => (
            <View>
              <Ionicons name="person" size={30} color={COLORS.tertiary} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
