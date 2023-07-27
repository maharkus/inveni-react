import {Text} from "react-native";


export const Test = ({navigation, route}) => {
    return <Text>This is {route.params.name}'s profile</Text>;
};
