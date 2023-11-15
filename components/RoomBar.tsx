import { View, Text } from "react-native";
import { styles } from "../styles/styles";
import * as React from "react";
import data from "../roomfinding/data.json";

interface Props {
    destination: {category: number, etage:number, room: number}
}

export default function RoomBar ({destination} : Props) {
    const buildingname = data.buildings[destination.category].name;
    const room = data.buildings[destination.category].etage[destination.etage].rooms[destination.room][1];

    const getFontSize = (name) => {
        if (name.length > 35) return 10;
        if (name.length >= 35 && name.length > 25) return 12;
        if (name.length >= 25 && name.length > 15) return 14;
        return 15;
      };

    return (
        <View style={styles.navigationTopBar}>
            <View style={styles.navigationTopBarContent}>
                <View style={[styles.navTBC, styles.navTBCirclePurple]}></View>
                <Text style={[styles.defaultText, styles.roomBarText, {marginRight: 15, fontSize: getFontSize(room)}]}>{buildingname}</Text>

                <View style={[styles.navTBC, styles.navTBCircleOrange]}></View>
                <Text style={[styles.defaultText, styles.roomBarText, {fontSize: getFontSize(room)}]}>{room}</Text>
            </View>
        </View>
    )
};
