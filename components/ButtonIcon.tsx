import { Pressable, Image } from "react-native";
import { customColors, styles } from "../styles/styles";
import * as React from "react";

export default function ButtonIcon({ color, imageSource, action, size, buttonPadding, customStyles }) {
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
        case customColors.grey: {
            colorPressed = customColors.greyPressed;
            break;
        }
        default: {
            colorPressed = customColors.orangePressed;
            break;
        }
    }
    return (
        <Pressable
            style={ ({ pressed }) => [styles.iconButtonBasics, {backgroundColor: !pressed ? color : colorPressed, padding: buttonPadding}, customStyles] } onPress={action}>
            <Image style={{width: size, height: size}} source={imageSource}/>
        </Pressable>
    );
};
