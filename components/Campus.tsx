import * as React from 'react';
import {View, Image} from "react-native";
import {customColors, styles} from "../styles/styles";
import {ButtonBuilding} from "./ButtonBuilding";
import {ButtonText} from "./ButtonText";
import {Button} from "react-native-paper";
import {useEffect} from "react";
import {ReactNativeZoomableView} from "@openspacelabs/react-native-zoomable-view";
import ButtonTextAndIcon from './ButtonTextAndIcon';

interface Props {
    onBuilding: (number) => void;
    destination: number[],
    navigation: any
}

export default function Campus({onBuilding, destination, navigation} : Props) {
    const images = [
        require('../assets/maps/map0.png'),
        require('../assets/maps/map1.png'),
        require('../assets/maps/map2.png'),
        require('../assets/maps/map3.png'),
        require('../assets/maps/map4.png')
    ]
    return (
        <View
            style={styles.campusWrap
            }>
            <ReactNativeZoomableView
                maxZoom={1.7}
                minZoom={1.7}
                zoomStep={0}
                initialZoom={1.7}
                panBoundaryPadding={100}
                visualTouchFeedbackEnabled={false}
                contentHeight={400}
            >
                <View style={{position: "relative", justifyContent: "center", display:'flex', alignItems: "center", padding: 30, flex: 1}}>

                    <View style={{zIndex:4, position: 'absolute', alignSelf: 'center', width: 600, height: 450, flex: 1}}>
                        <ButtonBuilding id={0} onBuilding={(id) => onBuilding(id)} color={customColors.uwu} selected={destination[1] == -1} coords={[420, 65]}>L1</ButtonBuilding>
                        <ButtonBuilding id={1} onBuilding={(id) => onBuilding(id)} color={customColors.uwu} selected={destination[1] == -1} coords={[290, 170]}>L2</ButtonBuilding>
                        <ButtonBuilding id={2} onBuilding={(id) => onBuilding(id)} color={customColors.uwu} selected={destination[1] == -1} coords={[340, 310]}>L3</ButtonBuilding>
                        <ButtonBuilding id={3} onBuilding={(id) => onBuilding(id)} color={customColors.uwu} selected={destination[1] == -1} coords={[485, 178]}>L4</ButtonBuilding>
                        <ButtonBuilding id={4} onBuilding={(id) => onBuilding(id)} color={customColors.uwu} selected={destination[1] == -1} coords={[140, 250]}>IQL</ButtonBuilding>
                    </View>
                    {destination[1] == -1 ?
                        <>
                            <Image source={require('../assets/maps/map.png')}
                                   style={{width: 600, height: 450}}/>
                        </>
                        :
                        <>
                            <Image source={images[destination[0]]}
                                   style={{width: 600, height: 450}}/>
                        </>
                    }
                </View>
            </ReactNativeZoomableView>
            {destination[1] != -1 &&
                <ButtonTextAndIcon color={customColors.orange} imageSource={require("../assets/icons/chevronRight.png")} w={12} h={24} action={() => navigation.navigate("Navigation", { name: "Navigation", destination: destination })}>
                    Navigation starten
                </ButtonTextAndIcon>
            }
        </View>
    );
}
