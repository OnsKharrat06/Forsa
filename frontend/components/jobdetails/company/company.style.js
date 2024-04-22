import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.large,
    padding: SIZES.medium,
  },
  headText: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    fontFamily: "AlNile-Bold",
  },
  contentBox: {
    marginVertical: SIZES.small,
  },
  jobTitle: {
    fontSize: SIZES.large,
    color: COLORS.gray,
    fontFamily: "AlNile",
  },
  companyName: {
    fontSize: SIZES.medium - 2,
    color: COLORS.gray,
    fontFamily: "AlNile",
  },
});

export default styles;
