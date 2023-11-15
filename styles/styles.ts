import { StyleSheet } from "react-native";

export const customColors = {
  dark: "#2B2D34",
  light: "#FFFFFF",
  orange: "#F98452",
  yellow: "#F9CB48",
  purple: "#C28CFC",
  uwu: "#8FC9FF",
  green: "#A4EB5D",
  softPurple: "#E0E3FF",
  grey: "#EDEDED",
  orangePressed: "#f57040",
  yellowPressed: "#ccab37",
  purplePressed: "#8f5dc6",
  uwuPressed: "#558bbe",
  greenPressed: "#79bb37",
  softPurplePressed: "#8f94bf",
  greyPressed: "#C3C3C3",
  transparent: "rgba(0,0,0,0)"
};


export const styles = StyleSheet.create({
  homeContainer: {
    display: "flex",
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  //Modal
  contentContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 25,
    paddingBottom: 50,
    backgroundColor: "#ffffff",
    width: "100%",
  },
  modalContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderStyle: "solid",
    borderWidth: 1.4,
    overflow: "hidden",
    zIndex: 5,
    width: "100%",
  },
  customHandle: {
    backgroundColor: "#2B2D34",
    width: 65,
    height: 1,
    marginTop: 20,
    marginBottom: 10,
  },

  //Reusable Components
  defaultText: {
    fontFamily: "Work Sans",
    fontSize: 16,
    color: customColors.dark,
  },
  defaultHeader: {
    fontFamily: "TTTravels",
    fontSize: 20,
    marginTop: 30,
    marginBottom: 15,
    color: customColors.dark,
  },
  buttonBasics: {
    borderColor: customColors.dark,
    borderWidth: 1.4,
    borderRadius: 9999,
    paddingTop: 20,
    paddingRight: 35,
    paddingBottom: 20,
    paddingLeft: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonBasics: {
    borderColor: customColors.dark,
    borderWidth: 1.4,
    borderRadius: 9999,
  },
  textIconButtonBasics: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  buttonPrimary: {
    backgroundColor: customColors.orange,
  },
  buttonUwU: {
    backgroundColor: customColors.uwu,
  },
  buttonSuccess: {
    backgroundColor: customColors.green,
  },
  buttonText: {
    color: customColors.dark,
    fontFamily: "Work Sans",
    fontSize: 20,
    textAlign: "center",
  },
  buttonTextOnly: {
    color: customColors.dark,
    fontSize: 18,
    fontFamily: "Work Sans Bold",
    opacity: 0.3,
  },
  buttonIcon: {
    borderRadius: 9999,
    borderWidth: 1.4,
    borderColor: customColors.dark,
    color: customColors.dark,
    padding: 0,
  },

  closeButton: {
  },

  //Map
  campusWrap: {
    height: "100%",
    width: "100%",
    backgroundColor: "#ffffff",
    zIndex: -3,
  },
  buttonBuilding: {
    backgroundColor: customColors.orange,
    color: customColors.yellow,
    borderColor: customColors.dark,
    borderWidth: 1.4,
    borderRadius: 9999,
    margin: 0,
    width: 60,
    height: 60,
    padding: 0,
    paddingTop: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonBuildingText: {
    fontSize: 15,
    fontWeight: "700",
    fontFamily: "TTTravels",
  },
  canvas: {
    width: 1500,
    height: 1650,
    position: "absolute",
    zIndex: 2,
  },
  //Room Grids
  roomGrid: {
    flex: 1,
    maxWidth: "86%",
    width: "86%",
    height: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    padding: 0,
    marginBottom: 50,
    margin: 0,
    marginLeft: "-2.5%",
    marginRight: "-2.5%"
  },
  room: {
    width: "45%",
    backgroundColor: customColors.light,
    borderStyle: "solid",
    borderWidth: 1.4,
    borderColor: customColors.dark,
    borderRadius: 25,
    height: 90,
    display: "flex",
    justifyContent: "space-between",
    overflow: "hidden",
    margin: 0,
    marginTop: "2.5%",
    marginBottom: "2.5%",
    marginLeft: "2.5%",
    marginRight: "2.5%",
  },
  roomTextView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: customColors.dark,
    padding: 15,
    height: 75,
  },
  roomTextPrim: {
    fontWeight: "700",
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Work Sans Bold",
  },
  roomTextSec: {
    marginTop: 4,
    fontSize: 12,
    textAlign: "center",
    fontFamily: "Work Sans",
  },
  roomBottomBar: {
    minHeight: 15,
    maxHeight: 15,
    width: "100%",
    backgroundColor: customColors.dark,
    borderTopWidth: 1,
    borderTopColor: customColors.dark,
  },
  //Julz RoomGrid
  roomBox: {
    borderStyle: "solid",
    borderWidth: 1.4,
    borderRadius: 20,
    display: "flex",
    justifyContent: "space-between",
    width: "50%",
    overflow: "hidden",
  },
  roomBoxContent: {
    height: 60,
    display: "flex",
    justifyContent: "center",
    padding: 10,
  },
  roomBoxBottom: {
    minHeight: 10,
    maxHeight: 10,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  //TopBar
  topBarContainer: {
    width: "100%",
    paddingTop: 65,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 25,
    margin: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0)",
    top: 0,
    zIndex: 0,
  },
  topBarGrad: {
    position: "absolute",
    height: 250,
    width: "100%",
    left: 0,
    right: 0,
    zIndex: -1,
  },
  //Top Bar Navigation
  navigationTopBarWrapper: {
    position: "absolute",
    top: 50,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  navigationTopBar: {
    backgroundColor: customColors.grey,
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 999,
    borderWidth: 1.4,
    borderColor: customColors.dark,
    marginRight: 15,
  },
  navigationTopBarContent: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 999,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  navTBC: {
    height: 25,
    width: 25,
    borderRadius: 999,
    marginRight: 5,
    borderWidth: 1.4,
    borderColor: customColors.dark,
  },
  navTBCirclePurple: {
    backgroundColor: customColors.purple,
  },
  navTBCircleOrange: {
    backgroundColor: customColors.orange,
  },
  roomBarText: {
    fontSize: 13,
    fontFamily: "Work Sans Bold"
  },
  floorWrapper: {
    backgroundColor: customColors.softPurple,
    height: "100%",
    maxWidth: 80,
    minWidth: 80,
    borderWidth: 1.4,
    borderColor: customColors.dark,
    borderRadius: 999,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  floorText: {
    fontFamily: "TTTravels"
  },
  //Bottom Nav
  bottomNav: {
    backgroundColor: customColors.transparent,
    width: "100%",
    position: "absolute",
    left: 0,
    right: 0,
    flex: 1,
    alignItems: "center",
    bottom: 32,
  },
  bottomNavBackNext: {
    backgroundColor: customColors.grey,
    borderRadius: 50,
    marginRight: 5,
    borderWidth: 1.4,
    borderColor: customColors.dark,
    width: "85%",
    left: "7.5%",
    paddingBottom: 16,
  },

  //Settings
  settingsBox: {
    width: "90%",
    borderRadius: 40,
    borderWidth: 1.4,
    borderColor: customColors.dark,
    paddingVertical: 25,
    paddingHorizontal: 25,
    fontFamily: "Work Sans",
  },

  //SearchBar
  searchBarWrapper: {
    width: "100%",
    minWidth: "100%",
    margin: 0,
    marginBottom: -32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  searchBarInput: {
    minWidth: "100%",
    height: 70,
    fontSize: 16,
    fontFamily: "Work Sans",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderWidth: 1.4,
    borderRadius: 999,
  },

  //Success Screen
  gifWrap: {
    borderRadius: 20,
    borderWidth: 1.4,
    overflow: "hidden",
    marginTop: 150,
  },

  //roomBarView
  roomBarView: {
    top: 30,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5
  },

  //Home Navigation Bar
  homeBottomNav: {
    backgroundColor: customColors.yellow,
    width: "90%",
    position: "relative",
    flex: 1,
    flexDirection: "row",
    flexWrap: "nowrap",
    gap: 10,
    padding: 15,
    borderRadius: 999,
    borderWidth: 1.4,
    borderColor: customColors.dark,
  },
  bhnSearchBar: {
    maxWidth: "100%",
    padding: 15,
    borderRadius: 999,
    borderWidth: 1.4,
    backgroundColor: customColors.light,
    height: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "flex-start",
  },
  bhnSearchBarText: {
    opacity: 0.4,
    fontFamily: "Work Sans",
    fontSize: 16,
  },
  bhnIcon: {
    borderRadius: 999,
    borderWidth: 1.4,
    backgroundColor: customColors.uwu,
    padding: 15,
  }
});
