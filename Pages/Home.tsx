import {
  Pressable,
  useWindowDimensions,
  View,
} from "react-native";
import { useCallback, useMemo, useRef, useState } from "react";
import { styles } from "../styles";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {Text, Button} from 'react-native-ui-lib';

export const Home = ({ navigation }) => {
  const [darkmode, setDarkmode] = useState(false);
  const [device, setDevice] = useState(false);
  const { width } = useWindowDimensions();
  const [theme, setTheme] = useState("dim");
  const [isOpen, setIsOpen] = useState(false);

  const bottomSheetModalRef = useRef(null);


  // variables

  // hooks
  const sheetRef = useRef<BottomSheet>(null);


  // variables
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);
  return (
        <GestureHandlerRootView
            style={styles.container}>

          <Button label="Snap To 90%" onPress={() => handleSnapPress(2)} />
          <Button label="Snap To 50%" onPress={() => handleSnapPress(1)} />
          <Button label="Snap To 25%" onPress={() => handleSnapPress(0)} />
          <Button label="Close" onPress={() => handleClosePress()} />
          <BottomSheet
              ref={sheetRef}
              snapPoints={snapPoints}
              onChange={handleSheetChange}
              style={styles.container}
          >
            <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
              <Text>Text</Text>
                <Button text70 white background-orange30 label="Navigation" onPress={() =>navigation.navigate('Navigation', {name: 'Navigation'}) }/>
            </BottomSheetScrollView>
          </BottomSheet>
        </GestureHandlerRootView>
  );
};
