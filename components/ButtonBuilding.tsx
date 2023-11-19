import {Pressable, Text} from "react-native";
import {styles} from "../styles/styles";
import * as React from "react";
import { getPressedColor } from "../utils/utils";

interface Props {
    id: number,
    color: string,
    children: string,
    coords: [number, number],
    onBuilding: (id) => void,
    selected: boolean
}
export const ButtonBuilding = ({id, color, children, coords, onBuilding} : Props) => {

    //change background color if pressed
    const colorPressed = getPressedColor(color);

    return (
        <Pressable onPress={() => onBuilding(id)}
            style={({ pressed }) => [styles.buttonBuilding, {transform: [{ scale: pressed ? 0.95 : 1 }], backgroundColor: !pressed ? color : colorPressed, left: coords[0], top: coords[1], position: "absolute" }]}>
                <Text style={[styles.buttonBuildingText, {fontFamily: "TTTravels"}]}>
                    {children}
                </Text>
        </Pressable>
    );
};
