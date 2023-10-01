import {Image, Text, View} from "react-native";
import {customColors, styles} from "../styles/styles";
import {getPathstoRooms} from "../roomfinding/Roomfinder";
import data from "../roomfinding/data.json";
import * as React from "react";
import {ReactNativeZoomableView} from "@openspacelabs/react-native-zoomable-view";
import ButtonTextAndIcon from "../components/ButtonTextAndIcon";
import {NavPath} from "../components/NavigationPath";
import {useState} from "react";
import {ButtonTextOnly} from "../components/ButtonTextOnly";
import RoomBar from "../components/RoomBar";

export const Navigation = ({ route, navigation }) => {
    const images = [
        require('../assets/buildings/L1.jpg')
    ]
    const [currentFloor, setCurrentFloor] = useState(0);
    const destination: {category: number, etage:number, room: number} = route.params.destination;


    const handleNextStep = () => {
        if (currentFloor < destination.etage) {
            setCurrentFloor(currentFloor + 1);
        }
        else {
            navigation.navigate("Home")
        }
    }
    const handlePrevStep = () => {
        if (currentFloor > 0) {
            setCurrentFloor(currentFloor - 1);
        }
    }

    return (
        <>
            <RoomBar destination={
                destination
            } />
            <View style={styles.campusWrap}>
                <ReactNativeZoomableView
                    maxZoom={3}
                    minZoom={.3}
                    zoomStep={0.1}
                    initialZoom={.402}
                    visualTouchFeedbackEnabled={false}
                    contentWidth={1500}
                    contentHeight={1650}
                >
                    {destination.category == 0 &&
                        <Image source={require('../assets/buildings/L1.jpg')}
                               resizeMethod={"resize"}
                               progressiveRenderingEnabled={true}
                               style={{width: 1500, height: 1650, flex: 1}}/>
                    }
                    {destination.category == 1 &&
                        <>
                            {currentFloor == 0 &&
                                <Image source={require('../assets/buildings/L2E00.jpg')}
                                   resizeMethod={"resize"}
                                   progressiveRenderingEnabled={true}
                                   style={{width: 1500, height: 1650}}/>
                            }
                            {currentFloor == 1 &&
                                <Image source={require('../assets/buildings/L2E10.jpg')}
                                    resizeMethod={"resize"}
                                    progressiveRenderingEnabled={true}
                                    style={{width: 1500, height: 1650}}/>
                            }
                        </>
                    }
                    <NavPath destination={destination} currentFloor={currentFloor}/>

                </ReactNativeZoomableView>
                <View style={styles.bottomNav}>
                    <>
                        {currentFloor == 0 &&
                            <>
                                <View style={{flex: 1, flexDirection: "row"}}>
                                    <ButtonTextAndIcon isLeft={true} color={customColors.grey} state={true}
                                                    imageSource={require("../assets/icons/chevronLeft.png")} w={12} h={24}
                                                    action={() => handlePrevStep()}>
                                        Back
                                    </ButtonTextAndIcon>
                                    <ButtonTextAndIcon color={customColors.orange} state={false}
                                                    imageSource={require("../assets/icons/chevronRight.png")} w={12} h={24}
                                                    action={() => handleNextStep()}>
                                        Next
                                    </ButtonTextAndIcon>
                                </View>
                            </>
                        }
                        {currentFloor > 0 &&
                            <>
                                <View style={{flex: 1, flexDirection: "row"}}>
                                    <ButtonTextAndIcon isLeft={true} color={customColors.orange} state={false}
                                                    imageSource={require("../assets/icons/chevronLeft.png")} w={12} h={24}
                                                    action={() => handlePrevStep()}>
                                        Back
                                    </ButtonTextAndIcon>
                                    <ButtonTextAndIcon color={customColors.orange} state={false}
                                                    imageSource={require("../assets/icons/chevronRight.png")} w={12} h={24}
                                                    action={() => handleNextStep()}>
                                        Next
                                    </ButtonTextAndIcon>
                                </View>
                            </>
                        }
                    </>
                    <ButtonTextOnly action={() => navigation.navigate("Home")}>Back to Search</ButtonTextOnly>
                </View>
            </View>
        </>
    );
};
