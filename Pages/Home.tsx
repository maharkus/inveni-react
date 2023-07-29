import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { customColors, styles } from "../styles/styles";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import CustomBackdrop from "../components/CustomBackdrop";
import CustomHandle from "../components/CustomHandle";
import {Dijkstra} from "../Roomfinding/Dijkstra";
import {ReactNativeZoomableView} from "@openspacelabs/react-native-zoomable-view";
import SVGMap from "../components/SVGMap";
import { Button, Text } from 'react-native-paper';
import { View } from "react-native";


export const Home = ({ navigation }) => {
  const [categorySelected, setCategorySelected] = useState(false);
  const [categoryItems, setCategoryItems] = useState([""]);
  const [sheetStatus, setSheetStatus] = useState(0);

  const sheetRef = useRef<BottomSheet>(null);
  const backdropRef = useRef<Animated.View>(null);

  // variables
  const snapPoints = useMemo(() => ["80%", "90%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    setSheetStatus(index);
    console.log(index)
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback((index) => {
    sheetRef.current?.close();
    setSheetStatus(index);
  }, []);

  // Define the shared animated value using useSharedValue
  const animatedValue = useSharedValue(0);

  // Define the animated style based on the shared animated value
  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = `rgba(255, 255, 255, ${animatedValue.value})`; // Interpolate alpha value to get a color change

    return {
      backgroundColor,
    };
  });

  // Smoother Animation of background to White
  useEffect(() => {
    animatedValue.value = withTiming(sheetStatus == -1 ? 1 : 0, {
      duration: 400, // Animation duration in milliseconds
    });
  }, [sheetStatus]);

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

  return (
      <>
        <GestureHandlerRootView style={styles.container}>
          <Animated.View ref={backdropRef} style={[{flex:1,
            width: "100%"},animatedStyle]}>
            <ReactNativeZoomableView
              maxZoom={1.3}
              minZoom={1}
              zoomStep={0}
              initialZoom={1}
              panBoundaryPadding={120}
              visualTouchFeedbackEnabled={false}
              style={{
                height: "50%",
                position: "relative",
              }}
          >
              <SVGMap></SVGMap>
          </ReactNativeZoomableView>
            <View style={{padding: 20}}>
            <Button onPress={() => handleSnapPress(1)}>Snap To 90%</Button>
            <Button onPress={() => handleSnapPress(0)}>Snap To 80%</Button>
            <Button onPress={() => handleClosePress(-1)}>Close</Button>
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
                            console.log(categoryItems);
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
                    <Button style={styles.buttonPrimary} onPress={() => setCategorySelected(false)}>
                      <Text style={styles.buttonPrimaryText}>Oh shit go bacc</Text>
                    </Button>}
                {categorySelected &&
                    <View style={styles.roomGrid}>
                      {categoryItems.map((item: any, index: number) => (
                          <View key={index} style={styles.room}>
                            <Text>{item}</Text>
                          </View>
                          ))}
                    </View>
                }
              </BottomSheetScrollView>
            </BottomSheet>
          </Animated.View>
        </GestureHandlerRootView>
      </>
  );
};
