import { Pressable, Text } from "react-native";
import { styles } from "../styles/styles";
import * as React from "react";

interface Props {
    color: string,
    children: string,
    action: () => void,
}
export const DefaultButton = ({color, action, children} : Props) => {
    return (
        <Pressable 
            style={ ({ pressed }) => [styles.buttonBasics, {backgroundColor: pressed ? "white" : color}] } onPress={action}>
            {({ pressed }) => (
                <Text style={[styles.buttonText, { color: pressed ? 'white' : 'black' }]}>
                    {children}
                </Text>
            )}
        </Pressable>
    );
};