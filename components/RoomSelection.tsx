import {styles} from "../styles/styles";
import {View} from "react-native";
import {Button} from "react-native-paper";

interface Props {
    items: (string|number)[][],
    category: number,
    onRoomSelection: (i) => void
}
export const RoomSelection = ({items, onRoomSelection} : Props) => {
    return (
        <View style={styles.roomGrid}>
            {items.map((item: any, index: number) => (
                <Button key={index} onPress={
                    () => onRoomSelection (item[2])
                }>
                    {item[0]}
                </Button>
            ))}
        </View>
    );
};
