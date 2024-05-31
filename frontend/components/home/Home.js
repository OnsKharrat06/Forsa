import { useState } from "react";
import { View, ScrollView, Text, ImageBackground } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, images, SIZES, FONT } from "../../constants";

import Welcome from "./welcome/Welcome";
import { StyleSheet } from "react-native";
import JobSearch from "../Jobs/JobSeach";
import Tabs from "../jobdetails/tabs/Tabs";

const jobFilter = ["For you", "Latest", "Near by"];

const Home = ({ navigation }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("For you");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

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
          <Tabs tabs={jobFilter} activeTab={activeTab} setActiveTab={handleTabChange} />

          <View style={{ padding: SIZES.padding }}>
            {activeTab === "For you" && (
              <JobSearch />
            )}
            {activeTab === "Latest" && (
              <JobSearch />
            )}
            {activeTab === "Near by" && (
              <JobSearch />
            )}
          </View>

        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    padding: 10,
    paddingTop: 30,
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontFamily: "AlNile-Bold",
    fontSize: SIZES.large,
    color: "#F1F0EC",
    marginTop: 2,
  }

});

export default Home;
