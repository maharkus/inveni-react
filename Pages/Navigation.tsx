import {Text, View} from "react-native";
import { styles } from "../styles/styles";
import {getPathstoRooms} from "../Roomfinding/Roomfinder";

export const Navigation = ({ navigation, route }) => {
    console.log(route.params.destination)
    console.log(getPathstoRooms(route.params.destination))
  return (
    <>
      <View style={styles.container}>
          <Text>
              {getPathstoRooms(route.params.destination)}
          </Text>
      </View>
    </>
  );
};
