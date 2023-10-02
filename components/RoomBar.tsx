import { View, Text } from "react-native";
import { styles } from "../styles/styles";
import * as React from "react";
import data from "../roomfinding/data.json";

interface Props {
    destination: {category: number, etage:number, room: number},
    hasBackground?: true
}

export default function RoomBar ({destination, hasBackground} : Props) {
    const buildingname = data.buildings[destination.category].name;
    const room = data.buildings[destination.category].etage[destination.etage].rooms[destination.room][1];
    return (
        <View style={styles.navigationTopBar}>
            <View style={hasBackground ? styles.navigationTopBarContentBackground : styles.navigationTopBarContent}>
                <View style={[styles.navTBC, styles.navTBCirclePurple]}></View>

                <Text style={[styles.defaultText, {marginRight: 10}]}>{buildingname}</Text>

                <View style={[styles.navTBC,styles.navTBCircleOrange]}></View>
                <Text style={styles.defaultText}>{room}</Text>
            </View>
        </View>
    )
};
