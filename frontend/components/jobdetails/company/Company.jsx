import React from "react";
import { View, Text, Image } from "react-native";
import { icons, images } from "../../../constants";

import styles from "./company.style";
import { checkImageURL } from "../../../utils";

const Company = ({ companyLogo, jobTitle, companyName, location }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        {checkImageURL(companyLogo) ? (
          <Image
            source={{
              uri: companyLogo,
            }}
            resizeMode="contain"
            style={styles.logoImage}
          />
        ) : (
          <Image
            source={images.placeholder}
            resizeMode="contain"
            style={{ width: "50%", height: "50%" }}
          />
        )}
      </View>
      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{jobTitle}</Text>
      </View>
      <View style={styles.companyInfoBox}>
        <Text style={styles.companyName}>{companyName} / </Text>
        <View style={styles.locationBox}>
          <Image
            source={icons.location}
            resizeMode="contain"
            style={styles.locationImage}
          />
          <Text style={styles.locationName}>{location}</Text>
        </View>
      </View>
    </View>
  );
};

export default Company;
