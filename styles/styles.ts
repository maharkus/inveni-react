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
}

export const styles = StyleSheet.create({
  homeContainer: {
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
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 25,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderStyle: "solid",
    borderWidth: 1,
    overflow: "hidden",
    zIndex: 5
  },
  customHandle: {
    backgroundColor: "#2B2D34",
    width: 65,
    height: 1,
    marginTop: 20,
    marginBottom: 10,
  },

  //Reusable Components
  accelerator: {
    fontFamily: "Accelerator"
  },
  defaultText: {
    fontFamily: "Work Sans",
    fontSize: 16,
    color: customColors.dark,
  },
  defaultHeader: {
    fontFamily: "Accelerator",
    fontSize: 20,
    marginTop: 30,
    marginBottom: 15,
    color: customColors.dark,
  },
  buttonBasics: {
    borderColor: customColors.dark,
    borderWidth: 1,
    borderRadius: 9999,
    paddingTop: 20,
    paddingRight: 35,
    paddingBottom: 20,
    paddingLeft: 35,
    margin: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  iconButtonBasics: {
    borderColor: customColors.dark,
    borderWidth: 1,
    borderRadius: 9999,
    margin: 10,
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
    textAlign: "center"
  },
  buttonTextOnly: {
    color: customColors.dark,
    fontFamily: "Work Sans",
    fontSize: 20,
    fontWeight: "700",
    opacity: .3
  },
  buttonIcon: {
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: customColors.dark,
    color: customColors.dark,
    padding: 0,
  },

  //Map
  campusWrap: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: '#ffffff',
    zIndex: -1
  },
  buttonBuilding: {
    backgroundColor: customColors.orange,
    color: customColors.yellow,
    borderColor: customColors.dark,
    borderWidth: 1,
    borderRadius: 9999,
    margin: 0,
    width: 30,
    height: 30,
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonBuildingText: {
    fontSize: 8,
    fontWeight: "700"
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
    width: 300,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  room: {
    width: "46%",
    backgroundColor: customColors.light,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: customColors.dark,
    borderRadius: 25,
    height: 90,
    margin: "2%",
    display: "flex",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  roomTextView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: customColors.dark,
    padding: 15,
  },
  roomTextPrim: {
    fontWeight: "700",
    textAlign: "center",
    fontSize: 12,
  },
  roomTextSec: {
    fontSize: 14,
    textAlign: "center",
  },
  roomBottomBar: {
    height: 15,
    width: "100%",
    backgroundColor: "#000",
    borderTopWidth: 1,
    borderTopColor: customColors.dark,
  },
  //Julz RoomGrid
  roomBox: {
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 20,
    display: "flex",
    justifyContent: "space-between",
    width: "50%",
    overflow: "hidden",
  },
  roomBoxContent: {
    minHeight: 60,
    display: "flex",
    justifyContent: "center",
    padding: 10,
  },
  roomBoxBottom: {
    height: 10,
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
    position: "absolute",
    top: 0,
    zIndex : 2
  },
  //Bottom Nav
  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: 'center',
    bottom: 32,
  }
});
