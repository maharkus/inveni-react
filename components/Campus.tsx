import * as React from 'react';
import {View, Image} from "react-native";
import { customColors } from "../styles/styles";
import {ButtonBuilding} from "./ButtonBuilding";

interface Props {
    onBuilding: (number) => void;
}

export default function Campus({onBuilding} : Props) {
    return (
        <View style={{position: "relative"}}>
            <View style={{flex: 1, zIndex:4}}>
                <ButtonBuilding id={1} onBuilding={(id) => onBuilding(id)} color={customColors.green} coords={[540, 150]}>L1</ButtonBuilding>
                <ButtonBuilding id={2} onBuilding={(id) => onBuilding(id)} color={customColors.yellow} coords={[400, 260]}>L2</ButtonBuilding>
                <ButtonBuilding id={3} onBuilding={(id) => onBuilding(id)} color={customColors.uwu} coords={[435, 480]}>L3</ButtonBuilding>
                <ButtonBuilding id={4} onBuilding={(id) => onBuilding(id)} color={customColors.purple} coords={[630, 307]}>L4</ButtonBuilding>
                <ButtonBuilding id={5} onBuilding={(id) => onBuilding(id)} color={customColors.softPurple} coords={[140, 400]}>IQL</ButtonBuilding>
            </View>
            <Image source={require('../assets/Map.png')}
                   style={{width: 800, height: 600}}/>
        </View>

    );
}
