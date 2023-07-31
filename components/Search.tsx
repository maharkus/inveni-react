import BottomSheet, {BottomSheetScrollView} from "@gorhom/bottom-sheet";
import {customColors, styles} from "../styles/styles";
import CustomBackdrop from "./CustomBackdrop";
import CustomHandle from "./CustomHandle";
import {Button} from "react-native-paper";
import {ButtonText} from "./ButtonText";
import {RoomSelection} from "./RoomSelection";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import data from "../Roomfinding/data.json";
import ButtonIcon from "./ButtonIcon";

interface Props {
    status: number,
    category: number,
    selectRoom: (room) => void,
    selectBuilding: (building) => void,
    onClear: () => void,
    statusChange: (index) => void
}

export const Search = ({status, category, selectRoom, selectBuilding, onClear, statusChange} : Props) => {
    const sheetRef = useRef<BottomSheet>(null);

    // Modal Interactivity
    useEffect(() => {
        sheetRef.current?.snapToIndex(status);
    }, [status]);

    // Modal Interactivity
    const handleSheetChange = useCallback((index) => {
        statusChange(index);
    }, [statusChange]);

    const handleSnapPress = useCallback((index) => {
        sheetRef.current?.snapToIndex(index);
    }, []);

    const handleClosePress = useCallback(() => {
        sheetRef.current?.close();
    }, []);

    const onRoom = (room) => {
        handleClosePress();
        selectRoom(room);
    }

    // variables
    const snapPoints = useMemo(() => ["80%", "90%"], []);

    return (
        <>

            <BottomSheet
                ref={sheetRef}
                snapPoints={snapPoints}
                index={-1}
                style={[styles.modalContainer]}
                onChange={handleSheetChange}
                enablePanDownToClose={true}
                backdropComponent={CustomBackdrop}
                handleComponent={CustomHandle}
            >
                <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
                    {category == -1 ?
                        <>
                            <Button
                                onPress={() => {
                                    selectBuilding(0)
                                }
                                }
                            >Seminarräume</Button>
                        </>
                    :
                        <>
                            <ButtonText color={customColors.orange} action={handleClosePress}>Back</ButtonText>
                            <ButtonIcon size={25} buttonPadding={25} color={customColors.uwu} imageSource={require("../assets/icons/close.png")} action={handleClosePress} />
                            <Button style={styles.buttonPrimary} textColor={customColors.dark} onPress={() => onClear}>Oh shit go bacc</Button>
                            <RoomSelection category={category} items={data.buildings[category].rooms} onRoomSelection={(room) => onRoom(room)}></RoomSelection>
                        </>
                    }
                </BottomSheetScrollView>
            </BottomSheet>
        </>
    );
};
