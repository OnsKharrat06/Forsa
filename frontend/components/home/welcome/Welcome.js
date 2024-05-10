import React, { useState, } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Modal,
  ScrollView,
  FlatList
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { SelectList } from "react-native-dropdown-select-list";
import styles from "./welcome.style";
import { COLORS } from "../../../constants";
import { useContext } from "react";
import { userContext } from "../../../context/userContext";
import JobCard from "../../Jobs/JobCard";

const Welcome = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(userContext);
  // const [selectedFilters, setSelectedFilters] = useState({}); // State to store selected filters
  // const [allJobs, setAllJobs] = useState([]);
  // const [filteredJobs, setFilteredJobs] = useState([]);
  // const [canAddFilters, setCanAddFilters] = useState(true);

  const Jobs = [
      {
        companyid: 1,
        company_name: "UIB",
        industry: "Banking",
        description:
          "UIB is a leading commercial bank in Tunisia, offering a wide range of financial services to individuals and businesses. With a focus on innovation and customer satisfaction, UIB strives to be the bank of choice for all banking needs.",
        city: "Tunis",
        country: "Tunisia",
        remote: false,
        hr_email: "recrutement@uib.com.tn",
        hr_phone: "+216 71 111 555",
        website_link: "https://www.uib.com.tn/",
        logo_url: "https://b2b.tn/files/2022/06/UIB.jpg",
        role: "Full-Time",
        title: "Full Stack Developer",
        salary: "Negotiable",
        application_deadline: "2024-01-15",
        type: "On-Site",
        job_description:
          "Develop and maintain web applications using a full stack development approach. Collaborate with cross-functional teams to deliver high-quality software solutions.",
        experience_level: "Mid-Level",
      },
      {
        companyid: 2,
        company_name: "BIAT",
        industry: "Banking",
        description:
          "BIAT is a premier private bank in Tunisia, renowned for its exceptional customer service and innovative banking solutions. With a commitment to excellence, BIAT aims to empower customers and drive economic growth.",
        city: "Tunis",
        country: "Tunisia",
        remote: false,
        hr_email: "recrutement@biat.com.tn",
        hr_phone: "+216 71 111 222",
        website_link: "https://www.biat.com.tn/",
        logo_url:
          "https://diwanfm.net/photos/posts/2024/02/14/970x546-65cc9b086656265cc9b0866564.png",
        role: "Part-Time",
        title: "Investment Analyst",
        salary: "Competitive",
        application_deadline: "2023-12-31",
        type: "On-Site",
        job_description:
          "Analyze financial data and market trends to provide investment recommendations. Conduct research and evaluations to support investment decisions.",
        experience_level: "Entry-Level",
      },
      {
        companyid: 3,
        company_name: "BNA",
        industry: "Banking",
        description:
          "BNA is a leading banking institution in Tunisia, offering diverse financial products and services. With a focus on integrity and professionalism, BNA is committed to driving economic growth and financial stability.",
        city: "Tunis",
        country: "Tunisia",
        remote: false,
        hr_email: "sami.guerfali@bna.com.tn",
        hr_phone: "+216 71 830 053",
        website_link: "http://www.bna.tn/",
        logo_url:
          "https://upload.wikimedia.org/wikipedia/commons/f/f1/Logo_BNA.png",
        role: "Internship",
        title: "Finance Intern",
        salary: "Stipend",
        application_deadline: "2024-01-15",
        type: "On-Site",
        job_description:
          "Assist with financial analysis, budgeting, and forecasting activities under the guidance of senior finance professionals.",
        experience_level: "Entry-Level",
      },
      {
        companyid: 4,
        company_name: "STB",
        industry: "Banking",
        description: "State-owned bank providing financial services",
        city: "Tunis",
        country: "Tunisia",
        remote: false,
        hr_email: "recrutement@stb.com.tn",
        hr_phone: "+216 71 222 333",
        website_link: "https://www.stb.com.tn/",
        logo_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQDw7eJsAOjxhnmSqWhYA-TZ6wV1lI9ekJAA&usqp=CAU",
        role: "Full-Time",
        title: "Senior Risk Analyst",
        salary: "Negotiable",
        application_deadline: "2024-06-30",
        type: "On-Site",
        job_description:
          "Assess and manage risks within the bank. Conduct thorough risk analysis and develop risk mitigation strategies.",
        experience_level: "Senior",
      },
      {
        companyid: 5,
        company_name: "Attijari Bank",
        industry: "Banking",
        description:
          "Attijari Bank, one of the largest banks in Tunisia, provides a wide range of retail banking, corporate banking, and Islamic banking solutions.",
        city: "Tunis",
        country: "Tunisia",
        remote: false,
        hr_email: "rh@attijaribank.com.tn",
        hr_phone: "+216 71 123 456",
        website_link: "https://www.attijaribank.com.tn/",
        logo_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwArck6EKxEeSBGprFVU6O3EmlgJG78auKmg&usqp=CAU",
        role: "Full-Time",
        title: "Marketing Manager",
        salary: "Competitive",
        application_deadline: "2024-07-15",
        type: "On-Site",
        job_description:
          "Develop and implement marketing strategies to promote products and services. Analyze market trends and consumer behavior to drive marketing initiatives.",
        experience_level: "Experienced",
      },
      {
        companyid: 6,
        company_name: "Groupe Telnet",
        industry: "Technology",
        description:
          "Groupe Telnet, a leading IT solutions and services provider, helps businesses with digital transformation, infrastructure management, and more.",
        city: "Tunis",
        country: "Tunisia",
        remote: false,
        hr_email: "recruitment@groupe-telnet.com.tn",
        hr_phone: "+216 71 654 321",
        website_link: "https://www.groupe-telnet.com.tn/",
        logo_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0S2BSgJNZb_4wvLMQ-ZP0ullv_4aP2ytd0g&usqp=CAU",
        role: "Part-Time",
        title: "Software Developer Intern",
        salary: "Stipend",
        application_deadline: "2024-06-15",
        type: "On-Site",
        job_description:
          "Assist in the design and development of software applications. Gain hands-on experience in software development methodologies.",
        experience_level: "Entry-Level",
      },
      {
        companyid: 7,
        company_name: "Société Générale",
        industry: "Banking",
        description:
          "Société Générale, a global banking and financial services company, offers its expertise in retail banking, corporate & investment banking, and financial services in Tunisia.",
        city: "Sfax",
        country: "Tunisia",
        remote: false,
        hr_email: "recruitment@socgen.tn",
        hr_phone: "+216 74 123 789",
        website_link: "https://www.socgen.tn/",
        logo_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg96HNPYFyzJx-EUP0zIEbL5QhQmEroeE1ow&usqp=CAU",
        role: "Full-Time",
        title: "Financial Advisor",
        salary: "Negotiable",
        application_deadline: "2024-07-30",
        type: "On-Site",
        job_description:
          "Provide personalized financial advice to clients based on their financial goals and risk tolerance. Develop comprehensive financial plans and investment strategies.",
        experience_level: "Experienced",
      },
      {
        companyid: 8,
        company_name: "Orange Tunisia",
        industry: "Telecommunications",
        description:
          "Orange Tunisia, the leading telecommunications operator, provides mobile, fixed internet, and TV services to individuals and businesses.",
        city: "Sousse",
        country: "Tunisia",
        remote: false,
        hr_email: "careers@orange.tn",
        hr_phone: "+216 73 456 789",
        website_link: "https://www.orange.tn/",
        logo_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv4j8S2V-xz5qz3P4vmGGH6J3q7QTQIQen2A&usqp=CAU",
        role: "Full-Time",
        title: "Network Engineer",
        salary: "Competitive",
        application_deadline: "2024-08-15",
        type: "On-Site",
        job_description:
          "Design, implement, and maintain network infrastructure to ensure reliability and security. Troubleshoot network issues and optimize network performance.",
        experience_level: "Mid-Level",
      },
      {
        companyid: 9,
        company_name: "Tunisie Télécom",
        industry: "Telecommunications",
        description:
          "Tunisie Télécom, the first telecom operator in Tunisia, offers a wide range of fixed-line, mobile, and internet services to individuals and businesses.",
        city: "Bizerte",
        country: "Tunisia",
        remote: false,
        hr_email: "hr@tunisietelecom.tn",
        hr_phone: "+216 72 987 654",
        website_link: "https://www.tunisietelecom.tn/",
        logo_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-AkDj15RPDmg8SJZ3JNVcbp2HE1QhQoMRQg&usqp=CAU",
        role: "Internship",
        title: "Customer Service Intern",
        salary: "Stipend",
        application_deadline: "2024-08-01",
        type: "On-Site",
        job_description:
          "Assist customers with inquiries, complaints, and requests. Learn customer service best practices and communication skills.",
        experience_level: "Entry-Level",
      },
      {
        companyid: 10,
        company_name: "One Tech Holding",
        industry: "Manufacturing",
        description:
          "One Tech Holding, an industrial group specializing in automotive components and mechatronics, is a leader in providing innovative solutions for the automotive industry.",
        city: "Sousse",
        country: "Tunisia",
        remote: false,
        hr_email: "rh@onetech-holding.com",
        hr_phone: "+216 73 222 000",
        website_link: "https://www.onetech-holding.com/",
        logo_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWyHzZgxMh9w_Kbu9k2Ylds4LD-YklaDnx6JF5Vk0QIQ&s",
        role: "Full-Time",
        title: "Retail Banking Branch Manager",
        salary: "Competitive + Bonus",
        application_deadline: "2024-02-12",
        type: "On-Site",
        job_description:
          "Lead and manage a retail banking branch to achieve business objectives, including customer satisfaction, revenue targets, and operational efficiency.",
        experience_level: "Experienced",
      },
      {
        companyid: 11,
        company_name: "Tunisair",
        industry: "Aviation",
        description:
          "Tunisair, the national airline of Tunisia, offers domestic and international flights, connecting Tunisia to the world and facilitating travel and tourism.",
        city: "Tunis",
        country: "Tunisia",
        remote: false,
        hr_email: "hr@tunisair.tn",
        hr_phone: "+216 71 222 777",
        website_link: "https://www.tunisair.com/",
        logo_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4sACTS6ttS3KY7hqpDw9AoTdHHpmdTMUlJw&usqp=CAU",
        role: "Full-Time",
        title: "Flight Attendant",
        salary: "Negotiable",
        application_deadline: "2024-09-30",
        type: "On-Site",
        job_description:
          "Ensure the safety and comfort of passengers during flights. Provide exceptional customer service and respond to emergencies.",
        experience_level: "Entry-Level",
      },
      {
        companyid: 12,
        company_name: "Carrefour Tunisia",
        industry: "Retail",
        description:
          "Carrefour Tunisia, one of the largest retail chains in Tunisia, offers a wide variety of products, including groceries, electronics, clothing, and household items, at competitive prices.",
        city: "Tunis",
        country: "Tunisia",
        remote: false,
        hr_email: "recrutement@carrefour.tn",
        hr_phone: "+216 71 333 888",
        website_link: "https://www.carrefour.tn/",
        logo_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXxMPXudFEaUx9xtsX99DglxaBVVdgijJ9iQ&usqp=CAU",
        role: "Full-Time",
        title: "Store Manager",
        salary: "Competitive + Bonus",
        application_deadline: "2024-10-15",
        type: "On-Site",
        job_description:
          "Oversee store operations and manage staff to achieve sales targets and customer satisfaction. Implement marketing strategies and promotions.",
        experience_level: "Experienced",
      },
      {
        companyid: 13,
        company_name: "Tunisie Autoroutes",
        industry: "Infrastructure",
        description:
          "Tunisie Autoroutes operates and maintains Tunisia toll highways, ensuring safe and efficient transportation for people and goods across the country.",
        city: "Tunis",
        country: "Tunisia",
        remote: false,
        hr_email: "careers@tunisieautoroutes.tn",
        hr_phone: "+216 71 444 999",
        website_link: "https://www.tunisieautoroutes.tn/",
        logo_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5qIZYgMO6ndDmf0hN0oVniHZ38lHQNx3ipw&usqp=CAU",
        role: "Full-Time",
        title: "Highway Maintenance Technician",
        salary: "Negotiable",
        application_deadline: "2024-09-15",
        type: "On-Site",
        job_description:
          "Perform routine maintenance and repairs on highways to ensure safety and usability. Conduct inspections and respond to maintenance requests.",
        experience_level: "Mid-Level",
      },
      {
        companyid: 14,
        company_name: "Tunisie Télécom",
        industry: "Telecommunications",
        description: "Leading telecommunications operator in Tunisia",
        city: "Tunis",
        country: "Tunisia",
        remote: false,
        hr_email: "hr@tunisietelecom.tn",
        hr_phone: "+216 71 987 654",
        website_link: "https://www.tunisietelecom.tn/",
        logo_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-AkDj15RPDmg8SJZ3JNVcbp2HE1QhQoMRQg&usqp=CAU",
        role: "Full-Time",
        title: "Network Administrator",
        salary: "Negotiable",
        application_deadline: "2024-09-30",
        type: "On-Site",
        job_description:
          "Maintain and administer computer networks and related computing environments, including systems software, applications software, hardware, and configurations.",
        experience_level: "Mid-Level",
      },
      {
        companyid: 15,
        company_name: "Banque de l'Habitat",
        industry: "Banking",
        description:
          "Banque de lHabitat, a specialized bank in Tunisia, offers a variety of financing solutions to support individuals and businesses in the real estate sector.",
        city: "Tunis",
        country: "Tunisia",
        remote: false,
        hr_email: "recrutement@bh.com.tn",
        hr_phone: "+216 71 555 444",
        website_link: "https://www.bh.com.tn/",
        logo_url:
          "https://www.ghorbel.tn/annuaire/uploads/images_thumbs/cd/cda3c8ac.jpg",
        role: "Full-Time",
        title: "Real Estate Agent",
        salary: "Commission-based",
        application_deadline: "2024-10-15",
        type: "On-Site",
        job_description:
          "Assist clients in buying, selling, and renting properties. Market and promote properties to potential buyers.",
        experience_level: "Entry-Level",
      },
      {
        companyid: 16,
        company_name: "Sofrecom Tunisie",
        industry: "Information Technology",
        description:
          "Sofrecom Tunisie, a leading consulting and engineering company in telecommunications, provides expertise in network design, network security, and IT solutions for the telecommunications industry.",
        city: "Tunis",
        country: "Tunisia",
        remote: false,
        hr_email: "recrutement@sofrecom.tn",
        hr_phone: "+216 71 777 888",
        website_link: "https://www.sofrecom.tn/",
        logo_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFSyJxiYWjlnEOxJyvziHAPxXIZJHxxZFXoA&usqp=CAU",
        role: "Full-Time",
        title: "Telecom Engineer",
        salary: "Negotiable",
        application_deadline: "2024-09-15",
        type: "On-Site",
        description:
          "Design and implement telecom systems, networks, and infrastructure. Troubleshoot telecom issues and provide technical support.",
        experience_level: "Experienced",
      },
      {
        companyid: 17,
        company_name: "Société Tunisienne de Banque",
        industry: "Banking",
        description: "One of the oldest banks in Tunisia",
        city: "Tunis",
        country: "Tunisia",
        remote: false,
        hr_email: "recrutement@stb.tn",
        hr_phone: "+216 71 888 999",
        website_link: "https://www.stb.tn/",
        logo_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQDw7eJsAOjxhnmSqWhYA-TZ6wV1lI9ekJAA&usqp=CAU",
        role: "Internship",
        title: "Banking Intern",
        salary: "Stipend",
        application_deadline: "2024-09-30",
        type: "On-Site",
        description:
          "Gain practical experience in banking operations, including customer service, account management, and financial analysis.",
        experience_level: "Entry-Level",
      },
      {
        companyid: 18,
        company_name: "Tunisie Leasing",
        industry: "Financial Services",
        description: "Leading leasing company in Tunisia",
        city: "Tunis",
        country: "Tunisia",
        remote: false,
        hr_email: "rh@tunisieleasing.tn",
        hr_phone: "+216 71 666 777",
        website_link: "https://www.tunisieleasing.tn/",
        logo_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxYtWt4bideTzvmzUGS2NeNMq0HTJZ8BQrFw&usqp=CAU",
        role: "Full-Time",
        title: "Financial Analyst",
        salary: "Competitive",
        application_deadline: "2024-10-15",
        type: "On-Site",
        description:
          "Analyze financial data and market trends to provide insights and recommendations for business decisions. Prepare financial reports and forecasts.",
        experience_level: "Experienced",
      },
      {
        companyid: 19,
        company_name: "Société Tunisienne de l'Electricité et du Gaz",
        industry: "Utilities",
        description: "Main electricity and gas supplier in Tunisia",
        city: "Tunis",
        country: "Tunisia",
        remote: false,
        hr_email: "rh@steg.tn",
        hr_phone: "+216 71 333 222",
        website_link: "https://www.steg.com.tn/",
        logo_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVXBb1wVr8DutLeVNRPcRTV6o4Hhy-msZoFQ&usqp=CAU",
        role: "Full-Time",
        title: "Electricity Technician",
        salary: "Negotiable",
        application_deadline: "2024-09-15",
        type: "On-Site",
        description:
          "Install, maintain, and repair electrical systems and equipment. Follow safety standards and regulations.",
        experience_level: "Mid-Level",
      },
      {
        companyid: 20,
        company_name: "Société Tunisienne des Assurances et de Réassurances",
        industry: "Insurance",
        description: "Leading insurance company in Tunisia",
        city: "Tunis",
        country: "Tunisia",
        remote: false,
        hr_email: "recrutement@star.com.tn",
        hr_phone: "+216 71 222 555",
        website_link: "https://www.star.com.tn/",
        logo_url:
          "https://www.entreprises-magazine.com/wp-content/uploads/2019/01/Star-assurances.jpg",
        role: "Full-Time",
        title: "Insurance Sales Representative",
        salary: "Commission-based",
        application_deadline: "2024-09-30",
        type: "On-Site",
        description:
          "Sell insurance policies to individuals and businesses. Evaluate clients' needs and recommend appropriate coverage options.",
        experience_level: "Entry-Level",
      },
    ];

  const filterData = [
    {
      label: 'Role',
      data: [
        { value: 'full-time', label: 'Full-Time' },
        { value: 'part-time', label: 'Part-Time' },
        { value: 'internship', label: 'Internship' },
      ],
    },
    {
      label: 'Type',
      data: [
        { value: 'remote', label: 'Remote' },
        { value: 'on-site', label: 'On-Site' },
        { value: 'hybrid', label: 'Hybrid' },
      ],
    },
    {
      label: 'Level',
      data: [
        { value: 'Entry-Level', label: '3' },
        { value: 'Mid-Level', label: '1' },
        { value: 'Experienced', label: '2' },
        { value: 'Senior', label: '4' },
      ],
    },
  ];

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  // const handleSelection = (filterLabel, selectedValue) => {
  //   if (canAddFilters) {
  //     setSelectedFilters({ ...selectedFilters, [filterLabel]: selectedValue });
  //   }
  // };

  // const handleCancel = () => {
  //   setSelectedFilters({});
  //   setFilteredJobs(allJobs);
  //   setCanAddFilters(true);
  // };

  // const filterJobs = () => {
  //   // Filter logic based on selectedFilters
  //   const filteredData = allJobs.filter((job) => {
  //     let isValid = true;
  //     Object.entries(selectedFilters).forEach(([filterLabel, filterValue]) => {
  //       if (job[filterLabel] !== filterValue) {
  //         isValid = false;
  //       }
  //     });
  //     return isValid;
  //   });
  //   setFilteredJobs(filteredData);
  // };

  const handleSearch = () => {
    // Implement filtering logic here
    const filteredJobs = Jobs.filter((job) => {
      if (!searchTerm) {
        return true; // Return all jobs if no search term
      }
  
      const regex = new RegExp(`\b.*${searchTerm}.*\b`, "i"); // Match "f" anywhere in title (case-insensitive)
      console.log("Testing regex:", regex.test(job.title)); // Log the test result
      return regex.test(job.title);
    });
    console.log("Filtered jobs:", filteredJobs); // Log the filtered jobs
    setFilteredJobsState(filteredJobs); // Update filteredJobsState with filtered jobs
  };

  const [filteredJobsState, setFilteredJobsState] = useState([]); // State for filtered jobs


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
              onFocus={toggleModal}
              placeholder="Search for a job"
            />
          </View>

          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons name="search-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <Modal
          visible={showModal}
          animationType="slide"
          onRequestClose={handleModalClose}
          style={{ zIndex: 10 }}
        >
          <View style={styles.modalContent}>
            <View style={styles.closeButton}>
              <TouchableOpacity onPress={handleModalClose}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.topContainer}>
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

                <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
                  <Ionicons name="search-outline" size={24} color="white" />
                </TouchableOpacity>

              </View>
              <View style={{ marginTop: 120 }}>
                {/* Conditionally render FlatLists */}
                {!searchTerm ? (
                  <FlatList
                    data={Jobs}
                    renderItem={({ item }) => <JobCard job={item} />}
                    keyExtractor={(item) => item.companyid.toString()}
                    contentContainerStyle={{ paddingVertical: 16 }}
                  />
                ) : (
                  <FlatList
                    data={filteredJobsState} // Use filteredJobsState here
                    renderItem={({ item }) => <JobCard job={item} />}
                    keyExtractor={(item) => item.companyid.toString()} // Use unique identifier
                    contentContainerStyle={{ paddingVertical: 16 }}
                  />
                )}
              </View>

              {/* Filtering section */}

              {/* <ScrollView horizontal style={styles.filterContainer}>
                {filterData.map((filterItem) => (
                  <View key={filterItem.label} style={styles.filterItem}>
                    <SelectList
                      data={filterItem.data}
                      placeholder={filterItem.label}
                      setSelected={(val) => handleSelection(filterItem.label, val)}
                      save="value"
                      label={filterItem.label}

                    />
                  </View>
                ))}
              </ScrollView>

              <View style={styles.buttonContainer}>
                <View>
                  <TouchableOpacity style={styles.filterButton} onPress={filterJobs}>
                    <Text style={styles.filterButtonText}>Filter</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity style={styles.filterButton} onPress={handleCancel}>
                    <Text style={styles.filterButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View> */}

            </View>
            <View>
              {/* {filteredJobs.length > 0 && ( // Display filtered jobs if any
                <FlatList
                  data={filteredJobs}
                  renderItem={({ item }) => <JobCard job={item} />} // Use JobCard for rendering jobs
                  keyExtractor={(item) => item.companyid.toString()}
                  contentContainerStyle={{ paddingVertical: 16 }} // Adjust padding as needed
                />
              )}

              {!filteredJobs.length && Object.keys(selectedFilters).length > 0 && ( // Display "No jobs" message if filters applied and no results
                <Text style={styles.noJobsText}>No jobs match your current filters.</Text>
              )}


              {Jobs && filteredJobs.length === 0 && Object.keys(selectedFilters).length === 0 && ( // Display all jobs if no filters applied
                <FlatList
                  data={Jobs}
                  renderItem={({ item }) => <JobCard job={item} />} // Use JobCard for rendering jobs
                  keyExtractor={(item) => item.companyid.toString()}
                  contentContainerStyle={{ paddingVertical: 16 }} // Adjust padding as needed
                />
              )} */}



            </View>

          </View>

        </Modal>

      </ImageBackground>

    </View>
  );
};

export default Welcome;

