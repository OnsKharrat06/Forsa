import React from "react";
import { TouchableOpacity , Alert} from "react-native";
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from "react-native-cards";
import jobstyles from "./jobcard.styles";
import { useNavigation } from "@react-navigation/native";

const JobCard = ({ job, saveJob }) => {
  const navigation = useNavigation();

  const navigate = () => {
    navigation.navigate("JobDetails", { job: job });
  };

  const handleSave = () => {
    saveJob(job);
    Alert.alert("Job Saved", "The job has been saved successfully.");
  };

  return (
    <TouchableOpacity>
      <Card style={jobstyles.container}>
        <CardImage source={{ uri: job?.logo_url }} />
        <CardTitle title={job.title} subtitle={job.type} />
        <CardContent text={job.description} />
        <CardAction separator={true} inColumn={false}>
          <CardButton onPress={handleSave} title="Save" color="#2F704D" />
          <CardButton onPress={navigate} title="Explore" color="#2F704D" />
        </CardAction>
      </Card>
    </TouchableOpacity>
  );
};

export default JobCard;
