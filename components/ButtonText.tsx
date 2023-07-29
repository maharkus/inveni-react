import { Pressable, Text } from "react-native";
import { customColors, styles } from "../styles/styles";
import * as React from "react";

interface Props {
    color: string,
    children: string,
    action: () => void,
}
export const ButtonText = ({color, action, children} : Props) => {
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
        <Pressable 
            style={ ({ pressed }) => [styles.buttonBasics, {backgroundColor: !pressed ? color : colorPressed}] } onPress={action}>
            {({ pressed }) => (
                <Text style={styles.buttonText}>
                    {children}
                </Text>
            )}
        </Pressable>
    );
};