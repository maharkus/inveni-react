import { Pressable, Image } from "react-native";
import { styles } from "../styles/styles";
import * as React from "react";
import { getPressedColor } from "../utils/utils";

export default function ButtonIcon({ color, imageSource, action, size, buttonPadding, customStyles }) {
    
    const colorPressed = getPressedColor(color);

    return (
        <Pressable
            style={ ({ pressed }) => [styles.iconButtonBasics, {backgroundColor: !pressed ? color : colorPressed, padding: buttonPadding}, customStyles] } onPress={action}>
            <Image style={{width: size, height: size}} source={imageSource}/>
        </Pressable>
    );
};
