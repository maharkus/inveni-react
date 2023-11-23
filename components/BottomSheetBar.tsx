import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { styles } from "../styles/styles";
import CustomBackdrop from "./CustomBackdrop";
import CustomHandle from "./CustomHandle";
import { RoomSelection } from "./RoomSelection";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Text, View } from "react-native";
import {useDispatch, useSelector} from "react-redux";
import { AllRooms } from "./AllRooms";
import * as React from "react";
import { SearchResults } from "./SearchResults";
import data from "../roomfinding/data.json";
import {setDestination, setGoBack, setIsScreenFinish} from "../states/slice";
import { FinishScreen } from "./FinishScreen";
import {RootState} from "../states/store";

interface Props {
  status: number;
  setStatus: (index) => void;
  category: number;
  room: number;
  selectRoom: (etage, room) => void;
  selectBuilding: (building) => void;
  onClearResults: () => void;
  isScreenFinish: boolean;
  navigation: any;
  destination: any;
}

export const BottomSheetBar = ({
  status,
  category,
  room,
  selectRoom,
  selectBuilding,
  onClearResults,
  setStatus,
  isScreenFinish,
  navigation,
  destination,
}: Props) => {
  const sheetRef = useRef<BottomSheet>(null);
  const [etage, setEtage] = useState(0);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const dispatch = useDispatch();
  const goBack = useSelector(
      (state: RootState) => state.counter.goBack
  );

  //check if search screen is active
  useEffect(() => {
    if (category == -1 && status == 1) {
      setIsSearchActive(true);
    } else {
      setIsSearchActive(false);
    }
  }, [status]);

  useEffect(() => {
    sheetRef.current?.snapToIndex(status);
  }, [status]);

  useEffect(() => {
    isScreenFinish && setStatus(1);
  }, [isScreenFinish]);

  //handle close
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
    setStatus(-1);
  }, [setStatus]);

  //swipe down
  const handleSheetChange = useCallback((index) => {
    if( goBack) {
      setStatus(1);
      dispatch(setGoBack(false))
    }
    else if (index == -1) {
        room === -1 && onClearResults();
        console.log("close sheet")
        isScreenFinish && finishNavigation();
      }
      else {
        setStatus(index);
      }
    },
    [setStatus, room, onClearResults, goBack, isScreenFinish]
  );

  //navigation finish
  const finishNavigation = () => {
    onClearResults();
    dispatch(setIsScreenFinish(false));
    dispatch(setDestination({ category: -1, etage: -1, room: -1 }));
    sheetRef.current?.close();
    setStatus(-1);
  };

  const onRoom = (etage, room) => {
    selectRoom(etage, room);
    setEtage(etage);
    handleClosePress();
  };

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
        {!isScreenFinish ? (
          <>
            {category >= 0 && category <= 4 ? (
              <View style={{ height: 80, width: "100%" }}>
                <View
                  style={{
                    alignItems: "center",
                    position: "absolute",
                    width: "100%",
                  }}
                >
                  <Text
                    style={[
                      styles.defaultHeader,
                      { textAlign: "center", width: "100%" },
                    ]}
                  >
                    All Rooms in {data.buildings[category].name}
                  </Text>
                </View>
              </View>
            ) : (
              category == 5 && (
                <View style={{ height: 80, width: "100%" }}>
                  <View
                    style={{
                      alignItems: "center",
                      position: "absolute",
                      width: "100%",
                    }}
                  >
                    <Text
                      style={[
                        styles.defaultHeader,
                        { textAlign: "center", width: "100%" },
                      ]}
                    >
                      All Rooms
                    </Text>
                  </View>
                </View>
              )
            )}
            <BottomSheetScrollView style={{ flex: 1 }} horizontal={false}>
              {category === -1 ? (
                <>
                  <SearchResults
                    selectBuilding={(building) => selectBuilding(building)}
                    onRoomSelection={(etage, room) => onRoom(etage, room)}
                    isSheetOpen={status === 1}
                    onClear={onClearResults}
                    shouldFocus={isSearchActive}
                  />
                </>
              ) : category === 5 ? (
                <>
                  <AllRooms
                    selectBuilding={(building) => selectBuilding(building)}
                    onRoomSelection={(etage, room) => onRoom(etage, room)}
                  />
                </>
              ) : (
                <>
                  <RoomSelection
                    category={category}
                    onRoomSelection={(etage, room) => onRoom(etage, room)}
                  ></RoomSelection>
                </>
              )}
            </BottomSheetScrollView>
          </>
        ) : (
          <FinishScreen
            category={category}
            destination={destination}
            navigation={navigation}
            onFinish={finishNavigation}
            onClose={handleClosePress}
          />
        )}
      </BottomSheet>
    </>
  );
};
