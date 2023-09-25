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
import ButtonIcon from "../components/ButtonIcon";
import {ButtonTextOnly} from "../components/ButtonTextOnly";

export const Navigation = ({ route, navigation }) => {
    const [Floor, setFloor] = useState(0);
    const images = [
        require('../assets/buildings/L1.png')
    ]
    const [currentFloor, setCurrentFloor] = useState(0);

    const handleNextStep = () => {
        if (currentFloor < data.buildings[route.params.destination.category].etage.length) {
            setCurrentFloor(currentFloor + 1);
        }
    }
    //room: string = data.buildings[route.params.destination[0].rooms[route.params.destination[1]]];
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
                    {route.params.destination.category == 0 &&
                        <L1 width={1500} height={1650} style={{position: "absolute"}}/>
                    }
                    {route.params.destination.category == 1 &&
                        <>
                        {currentFloor == 0 &&
                            <L2E00 width={1500} height={1650} style={{position: "absolute"}}/>
                        }
                            {currentFloor == 1 &&
                                <L2E10 width={1500} height={1650} style={{position: "absolute"}}/>
                            }
                        </>
                    }
                    <NavPath  building={destination.category} points={getPathstoRooms(destination)} currentFloor={currentFloor}/>
                </ReactNativeZoomableView>
                <View style={styles.bottomNav}>
                    <View style={{left: 0, right: 0, width: "100%", justifyContent:"center", bottom: 0, display: "flex", flexDirection: "row"}}>
                        <ButtonTextAndIcon isLeft={true} color={customColors.orange}
                                           imageSource={require("../assets/icons/chevronLeft.png")} w={12} h={24}
                                           action={() => console.log("back")}>
                            Back
                        </ButtonTextAndIcon>
                        <ButtonTextAndIcon color={customColors.orange}
                                           imageSource={require("../assets/icons/chevronRight.png")} w={12} h={24}
                                           action={() => handleNextStep()}>
                            Next
                        </ButtonTextAndIcon>
                    </View>
                        <ButtonTextOnly action={() => navigation.navigate("Home")}>Back to Search</ButtonTextOnly>
                </View>
            </View>
        </>
    );
};
