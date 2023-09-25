import BottomSheet, {BottomSheetScrollView} from "@gorhom/bottom-sheet";
import {customColors, styles} from "../styles/styles";
import CustomBackdrop from "./CustomBackdrop";
import CustomHandle from "./CustomHandle";
import {Button} from "react-native-paper";
import {RoomSelection} from "./RoomSelection";
import {useCallback, useEffect, useMemo, useRef,} from "react";
import data from "../roomfinding/data.json";
import ButtonIcon from "./ButtonIcon";
import { Text, ScrollView, View } from "react-native";
import { RoomGrid } from "./RoomGrid";

interface Props {
    status: number,
    category: number,
    room: number,
    selectRoom: (room) => void,
    selectBuilding: (building) => void,
    onClear: () => void,
    statusChange: (index) => void
}

export const Search = ({status, category, room, selectRoom, selectBuilding, onClear, statusChange} : Props) => {
    const sheetRef = useRef<BottomSheet>(null);

    // Modal Interactivity
    useEffect(() => {
        sheetRef.current?.snapToIndex(status);
    }, [status]);

    // Modal Interactivity
    const handleSheetChange = useCallback((index) => {
        index == -1 && room == -1 && onClear();
        statusChange(index);
    }, [statusChange, room, onClear]);

    const handleSnapPress = useCallback((index) => {
        sheetRef.current?.snapToIndex(index);
    }, []);

    const handleClosePress = useCallback(() => {
        sheetRef.current?.close();
    }, []);

    const onRoom = (room) => {
        selectRoom(room);
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
                onChange={handleSheetChange}
                enablePanDownToClose={true}
                backdropComponent={CustomBackdrop}
                handleComponent={CustomHandle}
            >
                <View style={{flex: 1}}>  
                    <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} >
                        {category == -1 ?
                            <>
                                <Text style={styles.defaultHeader}>Kategorien</Text>
                                <Button
                                    onPress={ () => {
                                            selectBuilding(0)
                                        }
                                    }
                                >Seminarräume</Button>
                                
                                <Text style={styles.defaultHeader}>Alle Raeume</Text>
                                {/*<RoomGrid/>*/}
                            </>
                        :
                            <>
                                <RoomSelection category={category} items={data.buildings[category].etage[0].rooms} onRoomSelection={(room) => onRoom(room)}></RoomSelection>
                            </>
                        }
                    </ScrollView>
                    <View style={{flex: 1, alignItems: "center"}}>
                        <ButtonIcon size={25} buttonPadding={25} color={customColors.grey} imageSource={require("../assets/icons/close.png")} action={handleClosePress} customStyles={styles.closeButton} />
                    </View>
                </View>
            </BottomSheet>
        </>
    );
};
