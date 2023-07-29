import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0E3FF",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  containerContent: { flex: 1, marginTop: 40 },
  containerHeader: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    backgroundColor: "#F1F1F1",
  },
  headerContent: {
    marginTop: 0,
  },
  grid: {
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
  Modal: {
    backgroundColor: "#005252",
    marginTop: 0,
  },

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
});
