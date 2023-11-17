import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { BottomSheetHandleProps } from "@gorhom/bottom-sheet";
import {styles} from "../styles/styles";


interface HandleProps extends BottomSheetHandleProps {
    style?: StyleProp<ViewStyle>;
}

const CustomHandle: React.FC<HandleProps> = ({ style, animatedIndex }) => {
    return (
        <View style={styles.customHandle}>
        </View>
    );
};

export default CustomHandle;
