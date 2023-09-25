import { useState } from "react";
import { customColors, styles } from "../styles/styles";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Campus from "../components/Campus";
import {View} from "react-native";
import {Search} from "../components/Search";
import {TopBar} from "../components/TopBar";
import ButtonIcon from "../components/ButtonIcon";
import {NavPath} from "../components/NavigationPath";
import * as React from "react";
import {ButtonTextOnly} from "../components/ButtonTextOnly";


export const Home = ({ navigation }) => {
    const [category, setCategory] = useState(-1);
    const [room, setRoom] = useState(-1);
    const [sheetStatus, setSheetStatus] = useState(-1);



    //Init Search
    const initSearch = () => {
        setSheetStatus(1)
        clearResults();
    }

    const clearResults = () => {
        setCategory(-1)
        setRoom(-1)
    }

    //Building Selection
    const handleBuilding = (building) => {
        setSheetStatus(1)
        setCategory(building)
    }

    //Room Selection
    const handleRoomSelection = (room: number) => {
        setRoom(room);
        setSheetStatus(-1)
    }

    const destination = {category: category, room: room}

    return (
        <>
            <GestureHandlerRootView style={styles.homeContainer}>
                <TopBar navigation={navigation}/>
                <Campus destination={destination} onBuilding={(building) => handleBuilding(building)} navigation={navigation}></Campus>

                <View style={styles.bottomNav}>
                    {room == -1 ?
                        <ButtonIcon size={30} buttonPadding={25} color={customColors.orange} imageSource={require("../assets/icons/magnifier.png")} action={() => initSearch()}></ButtonIcon>
                        :
                        <ButtonTextOnly action={() => clearResults()}>Back to Search</ButtonTextOnly>
                    }
                </View>
                <Search status={sheetStatus}
                        statusChange={(index) => setSheetStatus(index)}
                        selectRoom={(room) => handleRoomSelection(room)}
                        selectBuilding={(building) => handleBuilding(building)}
                        category={category}
                        room={room}
                        onClear={clearResults}/>
            </GestureHandlerRootView>
        </>
    );
};
