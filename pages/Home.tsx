import {useState} from "react";
import {customColors, styles} from "../styles/styles";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Campus from "../components/Campus";
import {View} from "react-native";
import {Search} from "../components/Search";
import {TopBar} from "../components/TopBar";
import ButtonIcon from "../components/ButtonIcon";
import * as React from "react";
import {ButtonTextOnly} from "../components/ButtonTextOnly";
import ButtonTextAndIcon from "../components/ButtonTextAndIcon";
import {LinearGradient} from "expo-linear-gradient";


export const Home = ({navigation}) => {
    const [category, setCategory] = useState(-1);
    const [room, setRoom] = useState(-1);
    const [etage, setEtage] = useState(-1);
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
    const handleRoomSelection = (etage:number, room: number) => {
        setEtage(etage);
        setRoom(room);
        setSheetStatus(-1)
    }

    const destination = {category: category, etage: etage, room: room}

    return (
        <>
            <GestureHandlerRootView style={styles.homeContainer}>
                <TopBar navigation={navigation}/>
                <LinearGradient style={styles.topBarGrad}
                                colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)']}
                                locations={[0.3, .7]}
                />
                <Campus destination={destination} onBuilding={(building) => handleBuilding(building)}
                        navigation={navigation}></Campus>

                <View style={styles.bottomNav}>

                    {destination.room != -1 &&
                        <ButtonTextAndIcon color={customColors.orange} state={false}
                                           imageSource={require("../assets/icons/chevronRight.png")} w={12} h={24}
                                           action={() => navigation.navigate("Navigation", {
                                               name: "Navigation",
                                               destination: destination
                                           })}>
                            Start Navigation
                        </ButtonTextAndIcon>
                    }
                    {room == -1 ?
                        <ButtonIcon size={30} buttonPadding={25} color={customColors.orange}
                                    imageSource={require("../assets/icons/magnifier.png")} action={() => initSearch()}
                                    customStyles={0}></ButtonIcon>
                        :
                        <ButtonTextOnly action={() => clearResults()}>Back to Search</ButtonTextOnly>
                    }
                </View>
                <Search status={sheetStatus}
                        statusChange={(index) => setSheetStatus(index)}
                        selectRoom={(etage, room) => handleRoomSelection(etage, room)}
                        selectBuilding={(building) => handleBuilding(building)}
                        category={category}
                        room={room}
                        onClear={clearResults}/>
            </GestureHandlerRootView>
        </>
    );
};
