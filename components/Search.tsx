import BottomSheet, {BottomSheetScrollView, BottomSheetView} from "@gorhom/bottom-sheet";
import {customColors, styles} from "../styles/styles";
import {Button} from "react-native-paper";
import CustomBackdrop from "./CustomBackdrop";
import CustomHandle from "./CustomHandle";
import {RoomSelection} from "./RoomSelection";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import ButtonIcon from "./ButtonIcon";
import {Image, ScrollView, Text, View} from "react-native";
import Scrollview from "react-native-gesture-handler"
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../states/store";
import {toggleValue} from "../states/slice";
import {ButtonText} from "./ButtonText";
import RoomBar from "./RoomBar";
import * as React from "react";
import { SearchResults } from "./SearchResults";

interface Props {
    status: number,
    category: number,
    room: number,
    selectRoom: (etage, room) => void,
    selectBuilding: (building) => void,
    onClear: () => void,
    statusChange: (index) => void,
    isNavigationFinished: boolean
}

export const Search = ({status, category, room, selectRoom, selectBuilding, onClear, statusChange, isNavigationFinished} : Props) => {
    const sheetRef = useRef<BottomSheet>(null);
    const [etage, setEtage] = useState(0);
    const dispatch = useDispatch();

    const finishedTexts = ["Done.", "K, cool.", "Esketit!", "Let's go!", "Awesome!", "Neat!", "Got it.", "I came."]

    // Modal Interactivity
    useEffect(() => {
        sheetRef.current?.snapToIndex(status);
    }, [status]);

    const handleClosePress = useCallback(() => {
        sheetRef.current?.close();
        statusChange(-1);
    }, [statusChange]);

    // To keep swipe down working
    const handleSheetChange = useCallback((index) => {
        index == -1 && room == -1 && onClear();
        statusChange(index);
    }, [statusChange, room, onClear]);

    const onFinish = () => {
        onClear()
        dispatch(toggleValue());
        handleClosePress();
    }

    // Auto Expand upon Complete Navigation
    useEffect(() => {
        isNavigationFinished && sheetRef.current?.snapToIndex(1);
    }, [isNavigationFinished]);

    const onRoom = (etage, room) => {
        selectRoom(etage, room);
        setEtage(etage);
        handleClosePress();
    }

    // variables
    const snapPoints = useMemo(() => ["80%", "81%"], []);

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
                        <BottomSheetScrollView style={{flex: 1}}>
                            {category == -1 ?
                                <>
                                    <SearchResults />
                                </>
                                :
                                <>
                                    <RoomSelection category={category} onRoomSelection={(etage, room) => onRoom(etage, room)}></RoomSelection>
                                </>
                            }
                        </BottomSheetScrollView>
                        <View style={{flex: 1, alignItems: "center", position: "absolute", left: 0, right: 0, bottom: 15}}>
                            <ButtonIcon size={25} buttonPadding={25} color={customColors.grey} imageSource={require("../assets/icons/close.png")} action={handleClosePress} customStyles={styles.closeButton} />
                        </View>
                    </>
                    :
                    <BottomSheetView style={[styles.contentContainer, {flex: 1}]}>
                        <RoomBar destination={{category, etage, room}}></RoomBar>
                        <View style={styles.gifWrap}>
                        <Image source={require('../assets/gifs/awesome.gif')} style={{width: 200, height: 200 }} />
                        </View>
                        <Text style={[styles.defaultText, {width: 160, textAlign: "center", marginTop: 30}]}>You have reached your destination.</Text>
                        <Text style={[styles.defaultHeader, {marginTop: 30, marginBottom: 30}]}>Enjoy!</Text>
                        <ButtonText color={customColors.green} action={onFinish}>
                            {finishedTexts[Math.floor(Math.random()*finishedTexts.length)]}
                        </ButtonText>
                    </BottomSheetView>
                    }
            </BottomSheet>
        </>
    );
};
