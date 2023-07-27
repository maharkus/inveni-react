import {Button, Pressable, StatusBar, StyleSheet, Switch, Text, useWindowDimensions, View} from "react-native";
import {useCallback, useMemo, useRef, useState} from "react";
import {styles} from "../styles";
import BottomSheet, {BottomSheetModal, BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {GestureHandlerRootView} from "react-native-gesture-handler";



export const Home = ({navigation}) => {
    const [darkmode, setDarkmode] = useState(false);
    const [device, setDevice] = useState(false);
    const { width } = useWindowDimensions();
    const [theme, setTheme] = useState("dim");
    const [isOpen, setIsOpen] = useState(false);

    const bottomSheetModalRef = useRef(null);

    function handlePresentModal() {
        bottomSheetModalRef.current?.present();
        setTimeout(() => {
            setIsOpen(true);
        }, 100);
    }
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    // variables
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    return (
        <>
<GestureHandlerRootView  style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <View
                    style={[
                        styles.container,
                        { backgroundColor: isOpen ? "gray" : "white" },
                    ]}
                >
                    <Button title="Present Modal" onPress={handlePresentModal} />
                    <StatusBar />
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        index={1}
                        snapPoints={snapPoints}
                        backgroundStyle={{ borderRadius: 50 }}
                        onDismiss={() => setIsOpen(false)}
                    >
                        <View style={styles.contentContainer}>
                            <Text style={[styles.title, { marginBottom: 20 }]}>
                                Dark mode
                            </Text>
                            <View style={styles.row}>
                                <Text style={styles.subtitle}>Dark mode</Text>
                                <Switch
                                    value={darkmode}
                                    onChange={() => setDarkmode(!darkmode)}
                                />
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.subtitle}>Use device settings</Text>
                                <Switch value={device} onChange={() => setDevice(!device)} />
                            </View>
                            <Text style={styles.description}>
                                Set Dark mode to use the Light or Dark selection located in your
                                device Display and Brightness settings.
                            </Text>
                            <View
                                style={{
                                    width: width,
                                    borderBottomWidth: StyleSheet.hairlineWidth,
                                    borderBottomColor: "gray",
                                    marginVertical: 30,
                                }}
                            />
                            <Text style={[styles.title, { width: "100%" }]}>Theme</Text>
                        </View>
                    </BottomSheetModal>
                </View>
            </BottomSheetModalProvider>
            <Button
                title="Go to Jane's profile"
                onPress={() =>
                    navigation.navigate('Profile', {name: 'Jane'})
                }
            />
</GestureHandlerRootView>
        </>
    );
};
