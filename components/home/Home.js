import { useState } from "react";
import { View, ScrollView, Text, ImageBackground } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES, FONT } from "../../constants";

import Welcome from "./welcome/Welcome";
import ScreenHeaderBtn from "../header/ScreenHeaderBtn";
import { StyleSheet } from "react-native";


const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <ImageBackground
      source={require("../../assets/images/bg.png")}
      resizeMode="stretch"
      style={{ flex: 1 }}
    >
      <View style={styles.header}>
        <ScreenHeaderBtn  iconUrl={icons.menu} dimension="60%" />
        <Text style={styles.title}>Home</Text>
        <ScreenHeaderBtn  iconUrl={images.profile} dimension="100%" />
      </View>

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

          {/* <Popularjobs />
            <Nearbyjobs /> */}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.white,
    flexDirection:"row",
    padding:10,
    paddingTop:20,
    justifyContent:"space-between",
    alignItems:"center"
  },
  title:{
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.primary,
    marginTop: 2,
  }
  
});

export default Home;
