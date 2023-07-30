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
  const [category, setCategory] = useState(0);
  const [categorySelected, setCategorySelected] = useState(false);
  const [categoryItems, setCategoryItems] = useState([""]);
  const [sheetStatus, setSheetStatus] = useState(-1);

  const sheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["80%", "90%"], []);

  // callbacks
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

  const handleBuilding = (id) => {
    handleSnapPress(1);
    setCategorySelected(true);
    setCategoryItems(data.buildings[id].rooms)
  }


  return (
      <>
        <GestureHandlerRootView style={styles.container}>
          <View style={[{flex:1,
            width: "100%", backgroundColor: "white"}]}>
            <View style={{padding: 20, paddingTop: 80}}>
              <Image source={require('../assets/Logo.png')} style={{width: 131, height: 47}}/>
            </View>
            <ReactNativeZoomableView
                maxZoom={1}
                minZoom={1}
                zoomStep={0}
                initialZoom={1}
                panBoundaryPadding={100}
                visualTouchFeedbackEnabled={false}
                style={{
                  position: "relative",
                  height: 600,
                  width: 800,
                }}
            >
              <Campus onBuilding={(id) => handleBuilding(id)}></Campus>
            </ReactNativeZoomableView>
            <View style={{padding: 20}}>
              <Button onPress={() => handleSnapPress(1)}>Suche</Button>
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
                      <Button
                          onPress={() =>
                              navigation.navigate("Navigation", { name: "Navigation" })
                          }
                      >Navigation starten</Button>
                    </>
                }
                {categorySelected &&
                    <>
                      <ButtonText color={customColors.orange} action={() => handleClosePress(-1)}>Back</ButtonText>
                      <IconButton size={50} icon="close" onPress={() => handleClosePress(-1)} style={[styles.buttonUwU, styles.buttonIcon]} />
                      <Button style={styles.buttonPrimary} textColor={customColors.dark} onPress={() => setCategorySelected(false)}>Oh shit go bacc</Button>
                      <RoomSelection category={category} items={categoryItems}></RoomSelection>
                    </>
                }
              </BottomSheetScrollView>
            </BottomSheet>
          </View>
        </GestureHandlerRootView>
      </>
  );
};
