import { useCallback, useMemo, useRef, useState } from "react";
import { styles } from "../styles/styles";
import BottomSheet, {
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {Text, Button, View} from "react-native-ui-lib";
import Animated, {useAnimatedStyle} from "react-native-reanimated";
import CustomBackdrop from "../components/CustomBackdrop";


export const Home = ({ navigation }) => {
  const [categorySelected, setCategorySelected] = useState(false);
  const [categoryItems, setCategoryItems] = useState([""]);
  const [sheetStatus, setSheetStatus] = useState(0);
  // hooks
  const sheetRef = useRef<BottomSheet>(null);

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

  const backdropstyle = useAnimatedStyle(() => {
    return {
      backgroundColor: sheetStatus == -1? "#ffffff" : "#E0E3FF",
    }
  })

  return (
      <>
        <GestureHandlerRootView style={styles.container}>
          <Animated.View style={[{flex:1,
          width: "100%"},backdropstyle]}>
            <Button label="Snap To 90%"  onPress={() => handleSnapPress(1)}></Button>
            <Button marginT-10 label="Snap To 80%" onPress={() => handleSnapPress(0)} />
            <Button marginT-10 label="Close" onPress={() => handleClosePress(-1)} />
          <BottomSheet
              ref={sheetRef}
              snapPoints={snapPoints}
              onChange={handleSheetChange}
              style={styles.container}
              enablePanDownToClose={true}
              backdropComponent={CustomBackdrop}
          >
            <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
              {!categorySelected &&
                  <>
                    <Button
                        marginT-10
                        text70
                        white
                        background-orange30
                        label="Seminarräume"
                        onPress={() => {
                          setCategorySelected(true);
                          setCategoryItems(["Raum1", "Raum2", "Raum3", "Raum4", "Raum5", "Raum6"])
                          console.log(categoryItems);
                        }
                        }
                    />
                    <Button
                        marginT-10
                        text70
                        white
                        background-orange30
                        label="Navigation starten"
                        onPress={() =>
                            navigation.navigate("Navigation", { name: "Navigation" })
                        }
                    />
                  </>
              }
              {categorySelected &&
                  <Button
                      text70
                      white
                      background-orange30
                      label="Oh shit go bacc"
                      onPress={() =>
                          setCategorySelected(false)
                      }
                  />}
              {categorySelected && categoryItems.map((item: any, index: number) => (
                  <Text text50 key={index}>{item}</Text>
              ))}
            </BottomSheetScrollView>
          </BottomSheet>
          </Animated.View>
        </GestureHandlerRootView>
      </>
  );
};
