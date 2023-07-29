import { StyleSheet } from "react-native";

export const customColors = {
  dark: "#2B2D34",
  light: "#FFFFFF",
  orange: "#F98452",
  yellow: "#F9CB48",
  purple: "#C28CFC",
  uwu: "#8FC9FF",
  green: "#A4EB5D",
  grey: "#EDEDED",
  softPurple: "#E0E3FF",
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0E3FF",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  //Modal
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderStyle: "solid",
    borderWidth: 1,
    overflow: "hidden",
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
    fontFamily: "accelerator",
    fontSize: 24,
    color: customColors.dark,
  },
  buttonBasics: {
    borderColor: customColors.dark,
    borderWidth: 1,
    borderRadius: 9999,
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    margin: 10,
    fontWeight: "400",
    fontFamily: "Work Sans",
  },
  buttonPrimary: {
    backgroundColor: customColors.orange,
  },
  buttonUwW: {
    backgroundColor: customColors.uwu,
  },
  buttonSuccess: {
    backgroundColor: customColors.green,
  },
  buttonText: {
    color: customColors.dark,
    fontFamily: "Work Sans",
    fontSize: 18,
  },
  //Map
  buttonBuilding: {
    backgroundColor: customColors.orange,
    color: customColors.yellow,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 9999,
    margin: 0,
    width: 50,
    height: 50,
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontFamily: "Work Sans",
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
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    flexDirection: "column",
    display: "flex",
  },
});
