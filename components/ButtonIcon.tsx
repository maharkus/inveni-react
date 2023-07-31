import { Pressable, Image } from "react-native";
import { customColors, styles } from "../styles/styles";
import * as React from "react";

interface Props {
    color: string,
    imageSource: string,
    action: () => void,
}
export const ButtonIcon = ({color, action, imageSource} : Props) => {
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
            <Image source={require('../assets/maps/map.png')} height={32} width={32}/>
        </Pressable>
    );
};
