import {Pressable, Text} from "react-native";
import {customColors, styles} from "../styles/styles";
import * as React from "react";

interface Props {
    id: number,
    color: string,
    children: string,
    coords: [number, number],
    onBuilding: (id) => void,
    selected: boolean
}
export const ButtonBuilding = ({id, color, children, coords, onBuilding, selected} : Props) => {
    let colorPressed: string;
    switch(color) {
        case customColors.orange: {
            colorPressed = customColors.orangePressed;
            break;
        }
        case customColors.yellow: {
            colorPressed = customColors.yellowPressed;
            break;
        }
        case customColors.purple: {
            colorPressed = customColors.purplePressed;
            break;
        }
        case customColors.uwu: {
            colorPressed = customColors.uwuPressed;
            break;
        }
        case customColors.green: {
            colorPressed = customColors.greenPressed;
            break;
        }
        case customColors.softPurple: {
            colorPressed = customColors.softPurplePressed;
            break;
        }
        default: {
            colorPressed = customColors.orangePressed;
            break;
        }
    }

    return (
        <Pressable onPress={() => onBuilding(id)}
            style={({ pressed }) => [styles.buttonBuilding, {backgroundColor: !selected? customColors.softPurple : !pressed ? color : colorPressed, left: coords[0], top: coords[1], position: "absolute" }]}>
                <Text style={[styles.buttonText, styles.buttonBuildingText]}>
                    {children}
                </Text>
        </Pressable>
    );
};
