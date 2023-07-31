import { Pressable, Image } from "react-native";
import { customColors, styles } from "../styles/styles";
import * as React from "react";

export default function ButtonIcon({color, imageSource, action }) {
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
            style={ ({ pressed }) => [styles.iconButtonBasics, {backgroundColor: !pressed ? color : colorPressed}] } onPress={action}>
            <Image style={{width: 32, height: 32}} source={imageSource}/>
        </Pressable>
    );
};
