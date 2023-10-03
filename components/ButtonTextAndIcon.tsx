import { Pressable, Image, Text } from "react-native";
import { customColors, styles } from "../styles/styles";
import * as React from "react";

export default function ButtonTextAndIcon({ color, imageSource, action, children, w, h, isActive, isLeft = false }) {
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
        <Pressable disabled={isActive}
            style={ ({ pressed }) => [styles.buttonBasics, styles.textIconButtonBasics, { backgroundColor: !pressed ? color : colorPressed, marginHorizontal: 10, marginVertical: 20, borderColor: isActive ? "#ACACAC" : customColors.dark}]} onPress={action}>
            {isLeft ?
                <Image style={{width: w, height: h, opacity: isActive ? 0.5 : 1}} source={imageSource}/> : ""
            }
            <Text style={[styles.buttonText, {opacity: isActive ? 0.5 : 1}]}>{children}</Text>
            {!isLeft ?
                <Image style={{width: w, height: h}} source={imageSource}/> : ""
            }
        </Pressable>
    );
};
