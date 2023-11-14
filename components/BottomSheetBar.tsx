import BottomSheet, {BottomSheetScrollView, BottomSheetView} from "@gorhom/bottom-sheet";
import {customColors, styles} from "../styles/styles";
import CustomBackdrop from "./CustomBackdrop";
import CustomHandle from "./CustomHandle";
import {RoomSelection} from "./RoomSelection";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Image, Text, View} from "react-native";
import {useDispatch} from "react-redux";
import {toggleValue} from "../states/slice";
import {ButtonText} from "./ButtonText";
import RoomBar from "./RoomBar";
import {AllRooms} from "./AllRooms";
import * as React from "react";
import { SearchResults } from "./SearchResults";
import data from "../roomfinding/data.json";

interface Props {
    status: number,
    category: number,
    room: number,
    selectRoom: (etage, room) => void,
    selectBuilding: (building) => void,
    onClear: () => void,
    statusChange: (index) => void,
    isNavigationFinished: boolean,
}

export const BottomSheetBar = ({status, category, room, selectRoom, selectBuilding, onClear, statusChange, isNavigationFinished } : Props) => {
    const sheetRef = useRef<BottomSheet>(null);
    const [etage, setEtage] = useState(0);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if( category == -1 && status == 1) {
            setIsSearchActive(true)
        } else {
            setIsSearchActive(false)
        }
    }, [status])


    const finishedTexts = ["Wonderful!", "Okay!", "Great Success!", "Awesome!", "Neat!", "Yeehaw!", "Yeah!", "Wooho!"]
    const gifs = [
        require('../assets/gifs/awesome.gif'),
        require('../assets/gifs/propeller.gif'),
        require('../assets/gifs/borat.gif'),
        require('../assets/gifs/dance.gif'),
        require('../assets/gifs/top.gif'),
        require('../assets/gifs/yehaw.gif'),
        require('../assets/gifs/yeeey.gif'),
        require('../assets/gifs/skeletal.gif'),
    ]

    const arrayLength = Math.min(finishedTexts.length, gifs.length);
    const gifIndex = Math.floor(Math.random() * arrayLength);

    useEffect(() => {
        sheetRef.current?.snapToIndex(status);
        isNavigationFinished && sheetRef.current?.snapToIndex(1);

        console.log(status);
    }, [status, isNavigationFinished]);

    const handleClosePress = useCallback(() => {
        sheetRef.current?.close();
        statusChange(-1);
    }, [statusChange]);

    // To keep swipe down working
    const handleSheetChange = useCallback((index) => {
        index === -1 && room === -1 && onClear()
        statusChange(index)
    }, [statusChange, room, onClear])

    const onFinish = () => {
        onClear()
        dispatch(toggleValue())
        handleClosePress()
    }

    const onRoom = (etage, room) => {
        selectRoom(etage, room);
        setEtage(etage);
        handleClosePress();
    }

    useEffect(() => {
        console.log("-----------")
        console.log("Search Activity: ", isSearchActive)
        console.log("Category: ", category)
        console.log("Status: ", status)
    },[status, isSearchActive])

    // variables
    const snapPoints = useMemo(() => ["80%", "80.9999%"], []);

    return (
        <>
            <BottomSheet
                ref={sheetRef}
                snapPoints={snapPoints}
                index={-1}
                style={[styles.modalContainer]}
                enablePanDownToClose={true}
                backdropComponent={CustomBackdrop}
                handleComponent={CustomHandle}
                onChange={handleSheetChange}
                keyboardBehavior={"extend"}
            >
                {!isNavigationFinished ?
                    <>
                        {category >= 0 && category <= 4 ?
                            <View style={{height: 80}}>
                                <View style={{alignItems: 'center', position: 'absolute', width: "100%"}}>
                                    <Text style={[styles.defaultHeader, {textAlign: "center", width: "100%"}]}>All Rooms in {data.buildings[category].name}</Text>
                                </View>
                            </View>
                            : category == 5 &&
                            <View style={{height: 80}}>
                                <View style={{alignItems: 'center', position: 'absolute', width: "100%"}}>
                                    <Text style={[styles.defaultHeader, {textAlign: "center", width: "100%"}]}>All Rooms</Text>
                                </View>
                            </View>
                        }
                        <BottomSheetScrollView style={{flex: 1}} horizontal={false}>
                            {category === -1 ?
                                <>
                                    <SearchResults
                                        selectBuilding={(building) => selectBuilding(building)}
                                        onRoomSelection={(etage, room) => onRoom(etage, room)}
                                        isSheetOpen={status === 1}
                                        onClear={onClear}
                                        shouldFocus={isSearchActive}
                                    />
                                </>
                                : category === 5 ?
                                    <>
                                        <AllRooms
                                            selectBuilding={(building) => selectBuilding(building)}
                                            onRoomSelection={(etage, room) => onRoom(etage, room)}
                                        />
                                    </>
                                    :
                                    <>
                                        <RoomSelection category={category} onRoomSelection={(etage, room) => onRoom(etage, room)}></RoomSelection>
                                    </>
                            }
                        </BottomSheetScrollView>
                    </>
                    :
                    <BottomSheetView style={[styles.contentContainer, {flex: 1}]}>
                        <RoomBar destination={{category, etage, room}}></RoomBar>
                        <View style={styles.gifWrap}>
                            <Image source={gifs[gifIndex]} style={{width: 200, height: 200 }} />
                        </View>
                        <Text style={[styles.defaultHeader, {marginTop: 30}]}>You made it!</Text>
                        <Text style={[styles.defaultText, {width: 300, textAlign: "center", marginBottom: 30}]}>Congratulations, you have reached your destination.</Text>
                        <ButtonText color={customColors.green} action={onFinish}>
                            {finishedTexts[gifIndex] || "Continue"}
                        </ButtonText>
                    </BottomSheetView>
                }
            </BottomSheet>
        </>
    );
};
