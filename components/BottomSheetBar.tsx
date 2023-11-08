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
import ButtonIconSVG from "../components/ButtonIconSVG";
import ICClose from "../assets/icons/ic_close.svg";

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
    const dispatch = useDispatch();

    const finishedTexts = ["Wonderful!", "Okay", "Great Success!", "Awesome!", "Neat!", "Yeehaw!", "Cool.", "yeeey!", "Woooho!"]
    const gifs = [
        require('../assets/gifs/awesome.gif'),
        require('../assets/gifs/propeller.gif'),
        require('../assets/gifs/borat.gif'),
        require('../assets/gifs/dance.gif'),
        require('../assets/gifs/top.gif'),
        require('../assets/gifs/yehaw.gif'),
        require('../assets/gifs/k_cool.gif'),
        require('../assets/gifs/yeeey.gif'),
        require('../assets/gifs/skeletal.gif'),
    ]
    const gifIndex = Math.floor(Math.random()*gifs.length);

    useEffect(() => {
        sheetRef.current?.snapToIndex(status);

        isNavigationFinished && sheetRef.current?.snapToIndex(1);
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
            >
                {!isNavigationFinished ?
                    <>
                        <BottomSheetScrollView style={{flex: 1}} horizontal={false}>
                            {category >= 0 && category <= 4 &&
                                <>
                                    <View style={{alignItems: 'center'}}>
                                        <Text style={styles.defaultHeader}>All Rooms in {data.buildings[category].name}</Text>
                                    </View>
                                </>
                            }
                            {category === -1 ?
                                <>
                                    <SearchResults
                                        selectBuilding={(building) => selectBuilding(building)}
                                        onRoomSelection={(etage, room) => onRoom(etage, room)}
                                        isSheetOpen={status === 1}
                                        onClear={onClear} 
                                    />
                                </>
                            : category === 5 ?
                                <>
                                    <View style={{alignItems: 'center', padding: 0, margin: 0}}>
                                        <Text style={styles.defaultHeader}>All Rooms</Text>
                                    </View>
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
                        <View style={{alignItems: "center", position: "absolute", left: 0, right: 0, bottom: 15}}>
                            <ButtonIconSVG color={customColors.grey} action={handleClosePress} customStyles={styles.closeButton} buttonPadding={25}>
                                <ICClose width={25} height={25}></ICClose>
                            </ButtonIconSVG>
                        </View>
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
                            {finishedTexts[gifIndex]}
                        </ButtonText>
                    </BottomSheetView>
                }
            </BottomSheet>
        </>
    );
};
