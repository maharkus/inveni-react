import * as React from 'react';
import {View, Image} from "react-native";
import { customColors } from "../styles/styles";
import {ButtonBuilding} from "./ButtonBuilding";

interface Props {
    onBuilding: (number) => void;
}

export default function Campus({onBuilding} : Props) {
    return (
        <View style={{position: "relative", justifyContent: "center", display:'flex', alignItems: "center", padding: 30, flex: 1}}>

                <View style={{zIndex:4, position: 'absolute', alignSelf: 'center', width: 600, height: 450, flex: 1}}>
                    <ButtonBuilding id={0} onBuilding={(id) => onBuilding(id)} color={customColors.green} coords={[420, 65]}>L1</ButtonBuilding>
                    <ButtonBuilding id={1} onBuilding={(id) => onBuilding(id)} color={customColors.yellow} coords={[290, 170]}>L2</ButtonBuilding>
                    <ButtonBuilding id={2} onBuilding={(id) => onBuilding(id)} color={customColors.uwu} coords={[340, 310]}>L3</ButtonBuilding>
                    <ButtonBuilding id={3} onBuilding={(id) => onBuilding(id)} color={customColors.purple} coords={[485, 178]}>L4</ButtonBuilding>
                    <ButtonBuilding id={4} onBuilding={(id) => onBuilding(id)} color={customColors.softPurple} coords={[140, 250]}>IQL</ButtonBuilding>
                </View>
            <Image source={require('../assets/Map.png')}
                   style={{width: 600, height: 450}}/>
        </View>

    );
}
