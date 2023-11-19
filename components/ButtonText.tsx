import { Pressable, Text } from "react-native";
import { styles } from "../styles/styles";
import * as React from "react";
import { getPressedColor } from "../utils/utils";

interface Props {
    color: string,
    children: string,
    action: () => void,
}
export const ButtonText = ({color, action, children} : Props) => {
   
    //change background color if pressed
    const colorPressed = getPressedColor(color);
    
    return (
        <Pressable 
            style={ ({ pressed }) => [styles.buttonBasics, {transform: [{ scale: pressed ? 0.95 : 1 }], backgroundColor: !pressed ? color : colorPressed}] } onPress={action}>
            {({ pressed }) => (
                <Text style={styles.buttonText}>
                    {children}
                </Text>
            )}
        </Pressable>
    );
};