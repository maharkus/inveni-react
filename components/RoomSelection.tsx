import {customColors, styles} from "../styles/styles";
import {View} from "react-native";
import {Text} from "react-native-paper";
import {ButtonText} from "./ButtonText";
import {getPathstoRooms} from "../Roomfinding/Roomfinder";

interface Props {
    items: string[],
    category: number
}
export const RoomSelection = ({items, category} : Props) => {
    return (
        <View style={styles.roomGrid}>
            {items.map((item: any, index: number) => (
                <ButtonText key={index} color={customColors.orange} action={
                    () => console.log(getPathstoRooms(index, category))
                }>
                    {item}
                </ButtonText>
            ))}
        </View>
    );
};
