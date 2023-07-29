import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { customColors, styles } from "../styles/styles";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomBackdrop from "../components/CustomBackdrop";
import CustomHandle from "../components/CustomHandle";
import {Dijkstra} from "../Roomfinding/Dijkstra";
import {ReactNativeZoomableView} from "@openspacelabs/react-native-zoomable-view";
import Campus from "../components/Campus";
import { Button, IconButton } from 'react-native-paper';
import {Image, View} from "react-native";
import { ButtonText } from "../components/ButtonText";
import {RoomSelection} from "../components/RoomSelection";


export const Home = ({ navigation }) => {
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

// Example usage:
  const dijkstra = new Dijkstra();

  dijkstra.addEdge(0, 1, 4);
  dijkstra.addEdge(0, 7, 8);
  dijkstra.addEdge(1, 2, 8);
  dijkstra.addEdge(1, 7, 11);
  dijkstra.addEdge(2, 3, 7);
  dijkstra.addEdge(2, 8, 2);
  dijkstra.addEdge(2, 5, 4);
  dijkstra.addEdge(3, 4, 9);
  dijkstra.addEdge(3, 5, 14);
  dijkstra.addEdge(4, 5, 10);
  dijkstra.addEdge(5, 6, 2);
  dijkstra.addEdge(6, 7, 1);
  dijkstra.addEdge(6, 8, 6);
  dijkstra.addEdge(7, 8, 7);

  const startNode = 0;
  const shortestDistances = dijkstra.dijkstra(startNode);

  const handleBuilding = (id) => {
    handleSnapPress(1);
    setCategorySelected(true);
    setCategoryItems(["Raum" + id, "Raum" + id, "Raum" + id, "Raum" + id, "Raum" + id] )
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
                            setCategoryItems(["Raum1", "Raum2", "Raum3", "Raum4", "Raum5", "Raum6"])
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
                      <RoomSelection items={categoryItems}></RoomSelection>
                    </>
                }
              </BottomSheetScrollView>
            </BottomSheet>
          </View>
        </GestureHandlerRootView>
      </>
  );
};
