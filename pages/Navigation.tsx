import {Text, View} from "react-native";
import { styles } from "../styles/styles";
import {getPathstoRooms} from "../roomfinding/Roomfinder";

export const Navigation = ({ route }) => {
  return (
    <>
      <View style={styles.container}>
          <Text>Your quickest path to</Text>
          <Text style={{marginTop: 10, fontFamily: "Accelerator"}}>
              {getPathstoRooms(route.params.destination)}
          </Text>
      </View>
    </>
  );
};
