import React, { useMemo } from "react";
import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import Animated, {
    Extrapolate,
    interpolate, interpolateColor,
    useAnimatedStyle,
} from "react-native-reanimated";

const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
    // animated variables
    const containerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            animatedIndex.value,
            [-1, 1],
            [0, 1],
            Extrapolate.CLAMP
        ),
        backgroundColor: interpolateColor(
            animatedIndex.value,
            [-1, 1],
            ['#ffffff', '#E0E3FF'])
    }));

    // styles
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
