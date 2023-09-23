import {styles} from "../styles/styles";
import {Pressable, View, Text} from "react-native";
import { StyleSheet } from "react-native";

interface Props {
    items: (string|number)[][],
    category: number,
    onRoomSelection: (i) => void
}
export const RoomSelection = ({items, onRoomSelection} : Props) => {
    return (
        <View style={styles.roomGrid}>
            {items.map((item: any, index: number) => (
                <Pressable style={styles.room} key={index} onPress={
                    () => onRoomSelection (item[2])
                }>
                    <View style={styles.roomTextView}>
                        <Text style={styles.roomTextPrim}>{item[0]}</Text>
                        <Text style={styles.roomTextSec}>{item[1]}</Text>
                    </View>
                    <View style={[styles.roomBottomBar, {backgroundColor: (item[5])}]}>
                    </View>
                </Pressable>
            ))}
        </View>
    );
};
