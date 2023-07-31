import { Pressable, Image, Text } from "react-native";
import { customColors, styles } from "../styles/styles";
import * as React from "react";

export default function ButtonTextAndIcon({color, imageSource, action, children }) {
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
            style={ ({ pressed }) => [styles.buttonBasics, styles.textIconButtonBasics, {backgroundColor: !pressed ? color : colorPressed}] } onPress={action}>
            <Text style={styles.buttonText}>{children}</Text>
            <Image style={{width: 20, height: 20}} source={imageSource}/>
        </Pressable>
    );
};
