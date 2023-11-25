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
import {setDestination, setGoBack, setIsScreenFinish, setSheetState} from "../states/slice";
import { FinishScreen } from "./FinishScreen";
import {RootState} from "../states/store";

interface Props {
  onClearResults: () => void;
  isScreenFinish: boolean;
  navigation: any;
}

export const BottomSheetBar = ({
  onClearResults,
  isScreenFinish,
  navigation,
}: Props) => {
  const sheetRef = useRef<BottomSheet>(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const dispatch = useDispatch();
  const destination = useSelector(
      (state: RootState) => state.counter.destination
  );
  const goBack = useSelector(
      (state: RootState) => state.counter.goBack
  );
  const sheetStatus = useSelector(
      (state: RootState) => state.counter.sheetState
  )

  //check if search screen is active
  useEffect(() => {
    if (destination.category == -1 && sheetStatus == 1) {
      setIsSearchActive(true);
    } else {
      setIsSearchActive(false);
    }
  }, [sheetStatus]);

  useEffect(() => {
    sheetStatus!= -1 ? sheetRef.current?.snapToIndex(sheetStatus) :
        sheetRef.current?.close();
  }, [sheetStatus]);

  useEffect(() => {
    isScreenFinish &&
    dispatch(setSheetState(1));
  }, [isScreenFinish]);

  //swipe down
  const handleSheetChange = useCallback((index) => {
    if(goBack) {
      dispatch(setGoBack(false))
    }
    else if (index == -1) {
        destination.room === -1 && onClearResults();
        isScreenFinish && finishNavigation();
      }
      else {
      dispatch(setSheetState(index));
      }
    },
    [goBack, dispatch, destination.room, onClearResults, isScreenFinish]
  );

  //navigation finish
  const finishNavigation = () => {
    onClearResults();
    dispatch(setIsScreenFinish(false));
    dispatch(setDestination({ category: -1, etage: -1, room: -1 }));
    sheetRef.current?.close();
    dispatch(setSheetState(-1));
  };

  const onBuilding = (building) => {
    dispatch(setDestination({...destination, category: building}))
  }

  const onRoom = (etage, room) => {
    dispatch(setDestination({...destination, etage: etage, room: room}))
    sheetRef.current?.close();
    dispatch(setSheetState(-1));
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
            {destination.category >= 0 && destination.category <= 4 ? (
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
                    All Rooms in {data.buildings[destination.category].name}
                  </Text>
                </View>
              </View>
            ) : (
                destination.category == 5 && (
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
              {destination.category === -1 ? (
                <>
                  <SearchResults
                    selectBuilding={(building) => onBuilding(building)}
                    onRoomSelection={(etage, room) => onRoom(etage, room)}
                    isSheetOpen={sheetStatus === 1}
                    onClear={onClearResults}
                    shouldFocus={isSearchActive}
                  />
                </>
              ) : destination.category === 5 ? (
                <>
                  <AllRooms
                    selectBuilding={(building) => onBuilding(building)}
                    onRoomSelection={(etage, room) => onRoom(etage, room)}
                  />
                </>
              ) : (
                <>
                  <RoomSelection
                    category={destination.category}
                    onRoomSelection={(etage, room) => onRoom(etage, room)}
                  ></RoomSelection>
                </>
              )}
            </BottomSheetScrollView>
          </>
        ) : (
          <FinishScreen
            category={destination.category}
            destination={destination}
            navigation={navigation}
            onFinish={finishNavigation}
          />
        )}
      </BottomSheet>
    </>
  );
};
