import {Image, Text, View} from "react-native";
import {customColors, styles} from "../styles/styles";
import {getPathstoRooms} from "../roomfinding/Roomfinder";
import data from "../roomfinding/data.json";
import * as React from "react";
import {ReactNativeZoomableView} from "@openspacelabs/react-native-zoomable-view";
import ButtonTextAndIcon from "../components/ButtonTextAndIcon";
import L1 from "../assets/buildings/L1.svg";
import L2E00 from "../assets/buildings/L2E00.svg";
import L2E10 from "../assets/buildings/L2E10.svg";
import {NavPath} from "../components/NavigationPath";
import {useState} from "react";

export const Navigation = ({ route, navigation }) => {
    const [Floor, setFloor] = useState(0);
    const images = [
        require('../assets/buildings/L1.png')
    ]
    const destination = route.params.destination;


    const onNextStep = () => {
        setFloor(Floor + 1);
    }

    return (
        <>
            <View style={styles.campusWrap}>
                <ReactNativeZoomableView
                    maxZoom={2}
                    minZoom={.4}
                    zoomStep={0.1}
                    initialZoom={1}
                    visualTouchFeedbackEnabled={false}
                    contentWidth={1500}
                    contentHeight={1650}
                    style={{backgroundColor: "#ffffff", width: "100%", height: "100%"}}
                >
                    {
                        destination.category == 0 &&
                        <L1 width={1500} height={1650} style={{position: "absolute"}}/>
                    }
                    {
                        destination.category == 1 &&
                        <L2E00 width={1500} height={1650} style={{position: "absolute"}}/>
                    }
                    <NavPath floor={Floor} building={destination.category} points={getPathstoRooms(destination)}/>
                </ReactNativeZoomableView>
                <View style={{position: "absolute", bottom: 0, display: "flex", flexDirection: "row"}}>
                    <ButtonTextAndIcon isLeft={true} color={customColors.orange} imageSource={require("../assets/icons/chevronLeft.png")} w={12} h={24} action={() =>  navigation.navigate("Home")}>
                        Zurück
                    </ButtonTextAndIcon>
                    <ButtonTextAndIcon color={customColors.orange} imageSource={require("../assets/icons/chevronRight.png")} w={12} h={24} action={() => onNextStep()}>
                        Weiter
                    </ButtonTextAndIcon>
                </View>
            </View>
        </>
    );
};
