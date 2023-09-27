import {styles} from "../styles/styles";
import {Pressable, View, Text} from "react-native";
import data from "../roomfinding/data.json";

interface Props {
    category: number,
    onRoomSelection: (etage, id) => void
}
export const RoomSelection = ({category, onRoomSelection} : Props) => {

    const items0 = []
    const items1 = []
    const items2 = []
    const items: any[] = [items0,items1,items2];

    for(let i = 0; i < data.buildings[category].etage.length; i++) {
        for(let j = 0; j < data.buildings[category].etage[i].rooms.length; j++) {
            items[i].push(data.buildings[category].etage[i].rooms[j]);
        }
    }
    return (
        <View style={styles.roomGrid}>
            {items[1].map((item: any, index: number) => (
                <Pressable style={styles.room} key={index} onPress={
                    () => onRoomSelection (item[6], index)
                }>
                    <View style={styles.roomTextView}>
                        <Text style={styles.roomTextPrim}>{item[0]}</Text>
                        <Text style={styles.roomTextSec}>{item[1]}</Text>
                    </View>
                    <View style={[styles.roomBottomBar, {backgroundColor: (item[5])}]} />
                </Pressable>
            ))}
        </View>
    );
};
