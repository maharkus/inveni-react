import { Text } from "react-native";

export const TestScreen = ({ navigation, route }) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};
