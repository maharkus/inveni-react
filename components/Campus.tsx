import * as React from 'react';
import {View, Image, Animated, PanResponder} from "react-native";
import {customColors, styles} from "../styles/styles";
import {ButtonBuilding} from "./ButtonBuilding";
import {ReactNativeZoomableView} from "@openspacelabs/react-native-zoomable-view";
import { useEffect, useRef, useState } from 'react';

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

    const pos = useRef(new Animated.ValueXY()).current;

    const buildingCoords = {
        0: { x: 250, y: -250 },
        1: { x: 30, y: -100 },
        2: { x: 100, y: 120 },
        3: { x: 330, y: 0 },
        4: { x: -300, y: 80 },
    };

    useEffect(() => {
        if (destination.room !== -1 && destination.category in buildingCoords) {
            const { x, y } = buildingCoords[destination.category];
            pos.setOffset({ x: -x, y: -y });
        } else {
            pos.setOffset({ x: 0, y: 0 });
        }
        pos.setValue({ x: 0, y: 0 });
    }, [destination]);

    const selectMap = () => {
        if (destination.room === -1) {
            return (
                <>
                    <View style={{zIndex:4, position: 'absolute', alignSelf: 'center', width: 1200, height: 900, flex: 1}}>
                        <ButtonBuilding id={0} onBuilding={(id) => onBuilding(id)} color={customColors.uwu} selected={destination.room == -1} coords={[820, 190]}>L1</ButtonBuilding>
                        <ButtonBuilding id={1} onBuilding={(id) => onBuilding(id)} color={customColors.uwu} selected={destination.room == -1} coords={[580, 370]}>L2</ButtonBuilding>
                        <ButtonBuilding id={2} onBuilding={(id) => onBuilding(id)} color={customColors.uwu} selected={destination.room == -1} coords={[670, 670]}>L3</ButtonBuilding>
                        <ButtonBuilding id={3} onBuilding={(id) => onBuilding(id)} color={customColors.uwu} selected={destination.room == -1} coords={[960, 400]}>L4</ButtonBuilding>
                        <ButtonBuilding id={4} onBuilding={(id) => onBuilding(id)} color={customColors.uwu} selected={destination.room == -1} coords={[280, 500]}>IQL</ButtonBuilding>
                    </View>
                    <Image
                        source={require('../assets/maps/map.png')}
                        resizeMethod={"resize"}
                        progressiveRenderingEnabled={true}
                        style={{ width: 1200, height: 900 }}
                    />
                </>
            );
        } else {
            return (
                <Animated.View style={pos.getLayout()}>
                    <Image
                        source={images[destination.category]}
                        resizeMethod={"resize"}
                        progressiveRenderingEnabled={true}
                        style={{ width: 1200, height: 900 }}
                    />
                </Animated.View>
            );
        }
    };

    return (
        <View style={styles.campusWrap}>
            <ReactNativeZoomableView
                key={`zoomable-view-${destination.room === -1 ? 'default' : destination.category}`}
                maxZoom={1.7}
                minZoom={1}
                zoomStep={0.1}
                initialZoom={1}
                panBoundaryPadding={100}
                visualTouchFeedbackEnabled={false}
                contentHeight={900}
                contentWidth={800}
            >
                {selectMap()}
            </ReactNativeZoomableView>
        </View>
    );
}
