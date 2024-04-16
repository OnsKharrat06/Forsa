import { useState } from "react";
import { View, ScrollView, Text, ImageBackground } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, images, SIZES, FONT } from "../../constants";

import Welcome from "./welcome/Welcome";
import ScreenHeaderBtn from "../header/ScreenHeaderBtn";
import { StyleSheet } from "react-native";
import JobSearch from "../Jobs/JobSeach";


const Home = ({ navigation }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <ImageBackground
      source={require("../../assets/images/bg.png")}
      resizeMode="stretch"
      style={{ flex: 1 }}
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

          <JobSearch/>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.primary,
    flexDirection:"row",
    padding:10,
    paddingTop:30,
    justifyContent:"space-between",
    alignItems:"center"
  },
  title:{
    fontFamily: "AlNile-Bold",
    fontSize: SIZES.large,
    color: "#F1F0EC",
    marginTop: 2,
  }
  
});

export default Home;
