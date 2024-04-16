import { TouchableOpacity } from "react-native";
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from "react-native-cards";
import jobstyles from "./jobcard.styles";

const JobCard = ({ job }) => {
  return (
    <TouchableOpacity>
      <Card style={jobstyles.container}>
        <CardImage source={{uri: job?.logo_url}}/>
        <CardTitle title={job.title} subtitle={job.type} />
        <CardContent text={job.description} />
        <CardAction separator={true} inColumn={false}>
          <CardButton onPress={() => {}} title="Save" color="#2F704D" />
          <CardButton onPress={() => {}} title="Explore" color="#2F704D" />
        </CardAction>
      </Card>
    </TouchableOpacity>
  );
};

export default JobCard;
