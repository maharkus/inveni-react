import {BottomSheetView} from "@gorhom/bottom-sheet";
import {customColors, styles} from "../styles/styles";
import RoomBar from "./RoomBar";
import {Image, Text, View} from "react-native";
import {ButtonText} from "./ButtonText";
import {ButtonTextOnly} from "./ButtonTextOnly";
import * as React from "react";

interface Props {
    category: number,
    destination: any;
    onFinish: () => void,
    onClose: () => void,
    navigation: any,
}
export const FinishScreen = ({category, destination, onFinish, onClose, navigation} : Props) => {

    //gifs for finish screen
    const finishedTexts = [
        "Wonderful!",
        "Okay!",
        "Great Success!",
        "Awesome!",
        "Neat!",
        "Yeehaw!",
        "Yeah!",
        "Wooho!",
    ];
    const gifs = [
        require("../assets/gifs/awesome.gif"),
        require("../assets/gifs/propeller.gif"),
        require("../assets/gifs/borat.gif"),
        require("../assets/gifs/top.gif"),
        require("../assets/gifs/yehaw.gif"),
        require("../assets/gifs/yeeey.gif"),
        require("../assets/gifs/skeletal.gif"),
    ];


    const arrayLength = Math.min(finishedTexts.length, gifs.length);
    const gifIndex = Math.floor(Math.random() * arrayLength);

    return (

        <BottomSheetView style={[styles.contentContainer, { flex: 1 }]}>
            {category != -1 && (
                <RoomBar showFloor={false} destination={destination}></RoomBar>
            )}
            <View style={styles.gifWrap}>
                <Image
                    source={gifs[gifIndex]}
                    style={{ width: 200, height: 200 }}
                />
            </View>
            <Text style={[styles.defaultHeader, { marginTop: 30 }]}>
                You made it!
            </Text>
            <Text
                style={[
                    styles.defaultText,
                    { width: 300, textAlign: "center", marginBottom: 30 },
                ]}
            >
                Congratulations, you have reached your destination.
            </Text>
            <ButtonText color={customColors.green} action={onFinish}>
                {finishedTexts[gifIndex]}
            </ButtonText>
            <View style={{ marginTop: 30 }}>
                <ButtonTextOnly
                    action={() => {
                        onClose();
                        navigation.navigate("Navigation", {
                            name: "Navigation",
                            destination: destination,
                        });
                    }}
                >
                    Back to Navigation
                </ButtonTextOnly>
            </View>
        </BottomSheetView>
    );
};
