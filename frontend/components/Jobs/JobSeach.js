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
import JobCard from "./JobCard";
import styles from "./styles";
import { COLORS, icons, SIZES } from "../../constants";

const JobSearch = () => {
  const data = [
    {
      id: 1,
      company_name: "UIB",
      industry: "Banking",
      description: "Commercial bank offering financial services",
      city: "Tunis",
      country: "Tunisia",
      remote: false,
      hr_email: "recrutement@uib.com.tn",
      hr_phone: "+216 71 111 555",
      website_link: "https://www.uib.com.tn/",
      logo_url:"https://b2b.tn/files/2022/06/UIB.jpg",
      role: "Full-Time",
      title: "Full Stack Developer",
      city: "Tunis",
      country: "Tunisia",
      salary: "Negotiable",
      application_deadline: "2024-01-15",
      type: "On-Site",
      description: "Develop and maintain web applications",
      experience_level: "Mid-Level",
    },
    {
      id: 2,
      company_name: "BIAT",
      industry: "Banking",
      description: "Leading private bank in Tunisia",
      city: "Tunis",
      country: "Tunisia",
      remote: false,
      hr_email: "recrutement@biat.com.tn",
      hr_phone: "+216 71 111 222",
      website_link: "https://www.biat.com.tn/",
      logo_url:"https://diwanfm.net/photos/posts/2024/02/14/970x546-65cc9b086656265cc9b0866564.png",
      role: "Full-Time",
      title: "Investment Analyst",
      city: "Sousse",
      country: "Tunisia",
      salary: "Competitive",
      application_deadline: "2023-12-31",
      type: "Hybrid",
      description:
        "Analyze financial data and provide investment recommendations",
      experience_level: "Entry-Level",
    },
    {
      id: 3,
      company_name: "One Tech Holding",
      industry: "Manufacturing",
      description:
        "Industrial group specializing in automotive components and mechatronics",
      city: "Sousse",
      country: "Tunisia",
      remote: false,
      hr_email: "rh@onetech-holding.com",
      hr_phone: "+216 73 222 000",
      website_link: "https://www.onetech-holding.com/",
      logo_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWyHzZgxMh9w_Kbu9k2Ylds4LD-YklaDnx6JF5Vk0QIQ&s",
      companyid: 10,
      role: "Full-Time",
      title: "Retail Banking Branch Manager",
      city: "Sfax",
      country: "Tunisia",
      salary: "Competitive + Bonus",
      application_deadline: "2024-02-12",
      type: "On-Site",
      description:
        "Manage a retail banking branch and achieve business objectives",
      experience_level: "Experienced",
    },
  ];
  const [searchResult, setSearchResult] = useState(data);
  return (
    <View>
      <FlatList
        data={searchResult}
        renderItem={({ item }) => <JobCard job={item}/>}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
      />
    </View>
  );
};

export default JobSearch;
