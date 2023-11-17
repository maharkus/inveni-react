import { Pressable, View } from "react-native";
import { styles } from "../styles/styles";
import * as React from "react";
import { getPressedColor } from "../utils/utils";

export default function ButtonIcon({ color, action, children, buttonPadding, customStyles }) {
    
    //change background color if pressed
    const colorPressed = getPressedColor(color);

    return (
        <Pressable
            style={ ({ pressed }) => [styles.iconButtonBasics, {backgroundColor: !pressed ? color : colorPressed, padding: buttonPadding}, customStyles] } onPress={action}>
            <View>{children}</View>
        </Pressable>
    );
};
