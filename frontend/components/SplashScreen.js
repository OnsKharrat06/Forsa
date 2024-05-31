import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "expo-router"; 
import { StartScreen } from "./login-signup/screens";
const SplashScreen = ({ navigation, onNavigationReady }) => {
    const animationRef = useRef(null);
  
    useEffect(() => {
      animationRef.current?.play(); // Play the animation on mount
    }, []);
  
    const handleAnimationComplete = () => {
      if (onNavigationReady) {
        onNavigationReady(); // Call the callback prop when animation finishes
      }
    };
  
    return (
      <View style={styles.container}>
        <LottieView
          source={require("../assets/images/Splash.json")}
          autoPlay
          loop
          onAnimationComplete={handleAnimationComplete} // Set callback for animation completion
          ref={animationRef}
        />
      </View>
    );
  };