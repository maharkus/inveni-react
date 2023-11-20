import { Pressable, Image, Text } from "react-native";
import { customColors, styles } from "../styles/styles";
import * as React from "react";
import { getPressedColor } from "../utils/utils";

export default function ButtonTextAndIcon({ color, imageSource, action, children, w, h, isActive, customStyle, isLeft = false }) {
    
    //change background color if pressed
    const colorPressed = getPressedColor(color);

    return (
        <Pressable disabled={isActive}
            style={ ({ pressed }) => [styles.buttonBasics, styles.textIconButtonBasics, { transform: [{ scale: pressed ? 0.95 : 1 }], backgroundColor: !pressed ? color : colorPressed, marginHorizontal: "2 %", marginVertical: "4%", borderColor: isActive ? "#ACACAC" : customColors.dark}, customStyle]} onPress={action}>
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
