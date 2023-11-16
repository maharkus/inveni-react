import React, { useMemo } from "react";
import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import Animated, {
    Extrapolate,
    interpolate, interpolateColor,
    useAnimatedStyle,
} from "react-native-reanimated";

const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
    const containerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            animatedIndex.value,
            [-1, 0],
            [0, 1],
            Extrapolate.CLAMP
        ),
        backgroundColor: interpolateColor(
            animatedIndex.value,
            [-1, 0],
            ['#ffffff', '#E0E3FF'])
    }));

    const containerStyle = useMemo(
        () => [
            style,
            {
                backgroundColor: "#a8b5eb",
            },
            containerAnimatedStyle,
        ],
        [style, containerAnimatedStyle]
    );

    return <Animated.View pointerEvents={"none"} style={containerStyle} >
    </Animated.View>;
};

export default CustomBackdrop;
