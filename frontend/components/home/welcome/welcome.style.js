import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  userName: {
    fontFamily: "Al Nile",
    fontSize: SIZES.large,
    color: COLORS.secondary,
  },
  welcomeMessage: {
    fontFamily: "AlNile-Bold",
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 2,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    height: 50,
    paddingHorizontal: 10,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  searchInput: {
    fontFamily: "Al Nile",
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
    borderColor: COLORS.primary,
    color: COLORS.secondary,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  tabsContainer: {
    width: "100%",
    marginTop: SIZES.medium,
  },
  tab: (activeJobType, item) => ({
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    borderColor: activeJobType === item ? COLORS.secondary : COLORS.gray2,
  }),
  tabText: (activeJobType, item) => ({
    fontFamily: "Al Nile",
    color: activeJobType === item ? COLORS.secondary : COLORS.gray2,
  }),
  modalContent: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  closeButton: {
    position: 'absolute',
    top: 35,
    left: 12,
  },
  searchPopUpContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 80,
    left: 10,
    right: 10,
    height: 50,
  },
  filterContainer: {
    marginTop: 120,
    flexDirection: "row",
  },
  filterItem: {
    marginRight: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  filterButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.medium,
    paddingHorizontal: SIZES.large,
    paddingVertical: SIZES.small,
    justifyContent: "center",
  },
  filterButtonText: {
    fontFamily: FONT.primary,
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
  topContainer: {
    padding: 20
  },
});

export default styles;