import { Pressable, Text } from "react-native";
import { styles } from "../styles/styles";
import * as React from "react";

interface Props {
    children: string,
    action: () => void,
}
export const ButtonTextOnly = ({action, children} : Props) => {

    return (
        <Pressable
            onPress={action}>
            {({ pressed }) => (
                <Text style={styles.buttonTextOnly}>
                    {children}
                </Text>
            )}
        </Pressable>
    )
};
