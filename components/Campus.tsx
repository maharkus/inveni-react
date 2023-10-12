import * as React from 'react';
import {View, Image} from "react-native";
import {customColors, styles} from "../styles/styles";
import {ButtonBuilding} from "./ButtonBuilding";
import {ReactNativeZoomableView} from "@openspacelabs/react-native-zoomable-view";

interface Props {
    onBuilding: (number) => void;
    destination: {category: number, etage:number, room: number},
    navigation: any
}

export default function Campus ({onBuilding, destination} : Props) {
    const images = [
        require('../assets/maps/map0.png'),
        require('../assets/maps/map1.png'),
        require('../assets/maps/map2.png'),
        require('../assets/maps/map3.png'),
        require('../assets/maps/map4.png')
    ]
    return (
        <View style={styles.campusWrap}>
            <ReactNativeZoomableView
                maxZoom={1.7}
                minZoom={1}
                zoomStep={0.1}
                initialZoom={1}
                panBoundaryPadding={100}
                visualTouchFeedbackEnabled={false}
                contentHeight={900}
                contentWidth={800}
            >
                <View style={{zIndex: -1, position: "relative", justifyContent: "center", display:'flex', alignItems: "center", padding: 30, flex: 1}}>
                    {destination.room == -1 ?
                        <>

                            <View style={{zIndex:4, position: 'absolute', alignSelf: 'center', width: 1200, height: 900, flex: 1}}>
                                <ButtonBuilding id={0} onBuilding={(id) => onBuilding(id)} color={customColors.uwu} selected={destination.room == -1} coords={[820, 190]}>L1</ButtonBuilding>
                                <ButtonBuilding id={1} onBuilding={(id) => onBuilding(id)} color={customColors.uwu} selected={destination.room == -1} coords={[580, 370]}>L2</ButtonBuilding>
                                <ButtonBuilding id={2} onBuilding={(id) => onBuilding(id)} color={customColors.uwu} selected={destination.room == -1} coords={[670, 670]}>L3</ButtonBuilding>
                                <ButtonBuilding id={3} onBuilding={(id) => onBuilding(id)} color={customColors.uwu} selected={destination.room == -1} coords={[960, 400]}>L4</ButtonBuilding>
                                <ButtonBuilding id={4} onBuilding={(id) => onBuilding(id)} color={customColors.uwu} selected={destination.room == -1} coords={[280, 500]}>IQL</ButtonBuilding>
                            </View>
                            <Image source={require('../assets/maps/map.png')}
                                   resizeMethod={"resize"}
                                   progressiveRenderingEnabled={true}
                                   style={{width: 1200, height: 900}}/>
                        </>
                        :
                        <>
                            <Image source={images[destination.category]}
                                   resizeMethod={"resize"}
                                   progressiveRenderingEnabled={true}
                                   style={{width: 1200, height: 900}}/>
                        </>
                    }
                </View>
            </ReactNativeZoomableView>
        </View>
    );
}
