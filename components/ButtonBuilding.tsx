import {Pressable, Text} from "react-native";
import {customColors, styles} from "../styles/styles";
import * as React from "react";

interface Props {
    color: string,
    children: string,
    coords: [number, number]
}
export const ButtonBuilding = ({color, children, coords} : Props) => {
    return (
        <Pressable
            style={({ pressed }) => [styles.buttonBuilding, {backgroundColor: pressed ? 'white' : color, left: coords[0], top: coords[1], position: "absolute" }]}>
            {({ pressed }) => (
                <Text style={[styles.buttonText, { color: pressed ? 'white' : 'black' }]}>
                    {children}
                </Text>
            )}
        </Pressable>
    );
};
