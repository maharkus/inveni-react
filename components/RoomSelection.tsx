import {customColors, styles} from "../styles/styles";
import {View} from "react-native";
import {ButtonText} from "./ButtonText";
import {getPathstoRooms} from "../roomfinding/Roomfinder";
import {Button} from "react-native-paper";

interface Props {
    items: string[],
    category: number,
    onRoomSelection: (i) => void
}
export const RoomSelection = ({items, category, onRoomSelection} : Props) => {
    return (
        <View style={styles.roomGrid}>
            {items.map((item: any, index: number) => (
                <Button key={index} onPress={
                    () => onRoomSelection (index)
                }>
                    {item}
                </Button>
            ))}
        </View>
    );
};
