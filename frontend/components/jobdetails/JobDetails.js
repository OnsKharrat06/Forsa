import { Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Share,
} from "react-native";

import { useCallback, useState } from "react";
import About from './about/About';
import Company from './company/Company'
import Footer from './footer/Footer'
import Specifics from './specifics/Specifics'
import Tabs from './tabs/Tabs'

import { COLORS, icons, SIZES } from "../../constants";

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {
  const route = useRoute();
  const item = route.params.job;

  return (
    <View>
      <Text>{item.id}</Text>
      <Text>{item.company_name}</Text>
      <Text>{item.title}</Text>
    </View>
  );
};

export default JobDetails;