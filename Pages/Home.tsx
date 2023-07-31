import { useCallback, useMemo, useRef, useState } from "react";
import { customColors, styles } from "../styles/styles";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomBackdrop from "../components/CustomBackdrop";
import CustomHandle from "../components/CustomHandle";
import {ReactNativeZoomableView} from "@openspacelabs/react-native-zoomable-view";
import Campus from "../components/Campus";
import { Button, IconButton } from 'react-native-paper';
import {Image, View} from "react-native";
import { ButtonText } from "../components/ButtonText";
import {RoomSelection} from "../components/RoomSelection";
import data from "../Roomfinding/data.json";


export const Home = ({ navigation }) => {
  const [category, setCategory] = useState(-1);
  const [categorySelected, setCategorySelected] = useState(false);
  const [categoryItems, setCategoryItems] = useState([""]);
  const [room, setRoom] = useState(-1);
  const [sheetStatus, setSheetStatus] = useState(-1);
  const sheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["80%", "90%"], []);

  // Modal Interactivity
  const handleSheetChange = useCallback((index) => {
    setSheetStatus(index);
    if(index == -1) {

    }
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback((index) => {
    sheetRef.current?.close();
    setSheetStatus(index);
  }, []);

  //Init Search
  const initSearch = () => {
    handleSnapPress(1);
    clearResults();
  }

  //Building Selection
  const handleBuilding = (building) => {
    handleSnapPress(1);
    setCategorySelected(true);
    setCategory(building)
    setCategoryItems(data.buildings[building].rooms)
  }

  //Room Selection
  const handleRoomSelection = (room: number) => {
    setRoom(room);
    console.log("here")
    handleClosePress(-1);
  }

  const clearResults = () => {
    setCategorySelected(false)
    setCategory(-1)
    setCategoryItems([""])
    setRoom(-1)
  }

  return (
      <>
        <GestureHandlerRootView style={styles.container}>
          <View style={[{flex:1,
            width: "100%", backgroundColor: "white"}]}>
            <View style={{padding: 20, paddingTop: 80}}>
              <Image source={require('../assets/Logo.png')} style={{width: 131, height: 47}}/>
            </View>
              <Campus destination={[category, room]} onBuilding={(building) => handleBuilding(building)} navigation={navigation}></Campus>
            <View style={{padding: 20}}>
              <Button onPress={() => initSearch()}>Suche</Button>
            </View>
            <BottomSheet
                ref={sheetRef}
                snapPoints={snapPoints}
                index={-1}
                onChange={handleSheetChange}
                style={[styles.modalContainer]}
                enablePanDownToClose={true}
                backdropComponent={CustomBackdrop}
                handleComponent={CustomHandle}
            >
              <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
                {!categorySelected &&
                    <>
                      <Button
                          onPress={() => {
                            setCategorySelected(true);
                            setCategory(0)
                            setCategoryItems(["L1 1", "L1 2", "L1 3", "L1 4", "L1 5", "L1 6"])
                          }
                          }
                      >Seminarräume</Button>
                    </>
                }
                {categorySelected &&
                    <>
                      <ButtonText color={customColors.orange} action={() => handleClosePress(-1)}>Back</ButtonText>
                      <IconButton size={50} icon="close" onPress={() => handleClosePress(-1)} style={[styles.buttonUwU, styles.buttonIcon]} />
                      <Button style={styles.buttonPrimary} textColor={customColors.dark} onPress={() => setCategorySelected(false)}>Oh shit go bacc</Button>
                      <RoomSelection category={category} items={categoryItems} onRoomSelection={(room) => handleRoomSelection(room)}></RoomSelection>
                    </>
                }
              </BottomSheetScrollView>
            </BottomSheet>
          </View>
        </GestureHandlerRootView>
      </>
  );
};
