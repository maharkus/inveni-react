import {Image, View} from "react-native";
import {customColors, styles} from "../styles/styles";
import * as React from "react";
import {ReactNativeZoomableView} from "@openspacelabs/react-native-zoomable-view";
import ButtonTextAndIcon from "../components/ButtonTextAndIcon";
import {NavPath} from "../components/NavigationPath";
import {useState} from "react";
import {ButtonTextOnly} from "../components/ButtonTextOnly";
import RoomBar from "../components/RoomBar";
import {useDispatch} from "react-redux";
import {setIsScreenFinish} from "../states/slice";
import { useFloor } from '../states/FloorContext';

export const Navigation = ({ route, navigation }) => {
    const destination: {category: number, etage:number, room: number} = route.params.destination;
    const { currentFloor, setCurrentFloor } = useFloor();

    const dispatch = useDispatch();


    console.log(currentFloor)
    
    const handleNextStep = () => {
        setCurrentFloor(prevFloor => {
          if (prevFloor < destination.etage) {
            return prevFloor + 1;
        } else {
            dispatch(setIsScreenFinish(true));
            navigation.navigate("Home");
            return 0; // Ensure to return the current state if not updating
          }
        });
      };
      
      const handlePrevStep = () => {
        setCurrentFloor(prevFloor => {
          if (prevFloor > 0) {
            return prevFloor - 1;
          } else {
            return prevFloor; // Ensure to return the current state if not updating
          }
        });
      };

    return (
        <>
            <View style={{flex: 1, alignItems: "center", top: 30}}>
                <RoomBar destination={ destination } />
            </View>
            <View style={styles.campusWrap}>
                <ReactNativeZoomableView
                    maxZoom={3}
                    minZoom={.3}
                    zoomStep={0.1}
                    initialZoom={.402}
                    visualTouchFeedbackEnabled={false}
                    contentWidth={1500}
                    contentHeight={1650}
                    panBoundaryPadding={100}
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
                    {destination.category == 2 &&
                        <>
                            {currentFloor == 0 &&
                                <Image source={require('../assets/buildings/L3E00.jpg')}
                                       resizeMethod={"resize"}
                                       progressiveRenderingEnabled={true}
                                       style={{width: 1500, height: 1650}}/>
                            }
                            {currentFloor == 1 &&
                                <Image source={require('../assets/buildings/L3E01.jpg')}
                                       resizeMethod={"resize"}
                                       progressiveRenderingEnabled={true}
                                       style={{width: 1500, height: 1650}}/>
                            }
                            {currentFloor == 2 &&
                                <Image source={require('../assets/buildings/L3E02.jpg')}
                                       resizeMethod={"resize"}
                                       progressiveRenderingEnabled={true}
                                       style={{width: 1500, height: 1650}}/>
                            }
                        </>
                    }
                    {destination.category == 3 &&
                        <>
                            {currentFloor == 0 &&
                                <Image source={require('../assets/buildings/L4E00.jpg')}
                                       resizeMethod={"resize"}
                                       progressiveRenderingEnabled={true}
                                       style={{width: 1500, height: 1650}}/>
                            }
                            {currentFloor == 1 &&
                                <Image source={require('../assets/buildings/L4E01.jpg')}
                                       resizeMethod={"resize"}
                                       progressiveRenderingEnabled={true}
                                       style={{width: 1500, height: 1650}}/>
                            }
                            {currentFloor == 2 &&
                                <Image source={require('../assets/buildings/L4E02.jpg')}
                                       resizeMethod={"resize"}
                                       progressiveRenderingEnabled={true}
                                       style={{width: 1500, height: 1650}}/>
                            }
                        </>
                    }
                    {destination.category == 4 &&
                        <>
                                <Image source={require('../assets/buildings/IQL.jpg')}
                                       resizeMethod={"resize"}
                                       progressiveRenderingEnabled={true}
                                       style={{width: 1500, height: 1650}}/>
                            </>

                    }
                    <NavPath destination={destination} currentFloor={currentFloor}/>

                </ReactNativeZoomableView>
                    <View style={[styles.bottomNav, styles.bottomNavBackNext]}>
                        <>
                            {currentFloor == 0 &&
                                <>
                                    <View style={{flex: 1, flexDirection: "row"}}>
                                        <ButtonTextAndIcon isLeft={true} color={customColors.grey} isActive={true}
                                                        imageSource={require("../assets/icons/chevronLeft.png")} w={12} h={24}
                                                        action={() => handlePrevStep()}>
                                            Back
                                        </ButtonTextAndIcon>
                                        <ButtonTextAndIcon color={customColors.orange} isActive={false}
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
                                        <ButtonTextAndIcon isLeft={true} color={customColors.orange} isActive={false}
                                                        imageSource={require("../assets/icons/chevronLeft.png")} w={12} h={24}
                                                        action={() => handlePrevStep()}>
                                            Back
                                        </ButtonTextAndIcon>
                                        <ButtonTextAndIcon color={customColors.orange} isActive={false}
                                                        imageSource={require("../assets/icons/chevronRight.png")} w={12} h={24}
                                                        action={() => handleNextStep()}>
                                            Next
                                        </ButtonTextAndIcon>
                                    </View>
                                </>
                            }
                        </>
                        <ButtonTextOnly action={() => {
                            setCurrentFloor(0);
                            navigation.navigate("Home")
                        }}
                            >Back to Search
                        </ButtonTextOnly>
                    </View>
                </View>
        </>
    );
};
