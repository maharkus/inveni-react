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
import RoomBar from "../components/RoomBar";

export const Navigation = ({ route, navigation }) => {
    const images = [
        require('../assets/buildings/L1.jpg')
    ]
    const [currentFloor, setCurrentFloor] = useState(0);
    const destination = route.params.destination;


    const handleNextStep = () => {
        if (currentFloor < data.buildings[destination.category].etage.length) {
            setCurrentFloor(currentFloor + 1);
        }
    }
    const handlePrevStep = () => {
        if (currentFloor > 0) {
            setCurrentFloor(currentFloor - 1);
        }
    }
    //room: string = data.buildings[route.params.destination[0].rooms[route.params.destination[1]]];
    return (
        <>
            <RoomBar destination={{
                category: this,
                room: this
            }} />
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
                    <NavPath building={destination.category} points={getPathstoRooms(destination)} currentFloor={currentFloor}/>

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
                    <View style={{left: 0, right: 0, width: "100%", justifyContent:"center", bottom: 0, display: "flex", flexDirection: "row"}}>
                        
                    </View>
                    <ButtonTextOnly action={() => navigation.navigate("Home")}>Back to Search</ButtonTextOnly>
                </View>
            </View>
        </>
    );
};
