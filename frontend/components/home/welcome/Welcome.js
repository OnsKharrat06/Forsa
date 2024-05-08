import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
  Modal,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";

import styles from "./welcome.style";
import { COLORS, icons, SIZES } from "../../../constants";
import { useContext } from "react";
import { userContext } from "../../../context/userContext";

const Welcome = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const {user} = useContext(userContext);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <View>
      <ImageBackground
        source={require('../../../assets/images/bg.png')}
        resizeMode="stretch"
        style={{ flex: 1 }}
      >

        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              selectionColor={COLORS.primary}
              onFocus={toggleModal} // Show modal on focus
              placeholder="Search for a job"
            />
          </View>

          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons name="search-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.tabsContainer}>
          {/* <FlatList
            data={jobTypes}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.tab(activeJobType, item)}
                onPress={() => {
                  setActiveJobType(item);
                  router.push(`/search/${item}`);
                }}
              >
                <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
            contentContainerStyle={{ columnGap: SIZES.small }}
            horizontal
          /> */}
        </View>
      </ImageBackground>

      <Modal
        visible={showModal}
        animationInTiming={0}
        // animationType="fade"
      >
          <View style={styles.modalContent}>
            <View style={styles.closeButton}>
              <TouchableOpacity onPress={handleModalClose}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.searchPopUpContainer}>
              <View style={styles.searchWrapper}>
                <TextInput
                  style={styles.searchInput}
                  selectionColor={COLORS.primary}
                  value={searchTerm}
                  onChangeText={(text) => setSearchTerm(text)}
                  placeholder="Search for a job"
                  placeholderTextColor="gray"
                />
              </View>

              <TouchableOpacity style={styles.searchBtn}>
                <Ionicons name="search-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
      </Modal>
    </View>
  );
};

export default Welcome;
