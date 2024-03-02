import { useState } from "react";
import { View, ScrollView, SafeAreaView, ImageBackground } from "react-native";
import { Stack } from "expo-router";

import { COLORS, icons, images, SIZES } from "../../constants";
import Nearbyjobs from "./nearby/Nearbyjobs"
import Popularjobs from "./popular/Popularjobs"
import Welcome from "./welcome/Welcome"
import ScreenHeaderBtn from "../header/ScreenHeaderBtn"

const Home = () => {
  
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.white},
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
          ),
          headerTitle: "test",
        }}
      />
      <ImageBackground
        source={require("../../assets/images/bg.png")}
        resizeMode="stretch"
        style={{flex:1}}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, padding: SIZES.medium }}>
            <Welcome
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleClick={() => {
                if (searchTerm) {
                  router.push(`/search/${searchTerm}`);
                }
              }}
            />
            {/* <StartScreen></StartScreen> */}

            <Popularjobs />
            {/* <Nearbyjobs /> */}
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Home;
