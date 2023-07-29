import {styles} from "../styles/styles";
import {View} from "react-native";
import {Text} from "react-native-paper";

interface Props {
    items: string[]
}
export const RoomSelection = ({items} : Props) => {
    return (
        <View style={styles.roomGrid}>
            {items.map((item: any, index: number) => (
                <View key={index} style={styles.room}>
                    <Text>{item}</Text>
                </View>
            ))}
        </View>
    );
};
