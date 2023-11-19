import { useState } from "react";
import { customColors, styles } from "../styles/styles";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Campus from "../components/Campus";
import { Pressable, View, Text, ScrollView } from "react-native";
import { BottomSheetBar } from "../components/BottomSheetBar";
import { TopBar } from "../components/TopBar";
import ButtonIconSVG from "../components/ButtonIconSVG";
import * as React from "react";
import { ButtonTextOnly } from "../components/ButtonTextOnly";
import ButtonTextAndIcon from "../components/ButtonTextAndIcon";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { RootState } from "../states/store";
import RoomBar from "../components/RoomBar";
import ICSettings from "../assets/bildmarke.svg";
import ICList from "../assets/icons/ic_list.svg";
import ICMagnifier from "../assets/icons/ic_magnifier.svg";

export const Home = ({ navigation }) => {
  const [category, setCategory] = useState(-1);
  const [room, setRoom] = useState(-1);
  const [etage, setEtage] = useState(-1);
  const [sheetStatus, setSheetStatus] = useState(-1);

  const categorySearch = -1;
  const categoryAllRooms = 5;
  const sheetClose = -1;
  const sheetOpen = 1;

  const isScreenFinish = useSelector(
    (state: RootState) => state.counter.isScreenFinish
  );

  //Init BottomSheetBar
  const initSearch = () => {
    clearResults();
    setSheetStatus(sheetOpen);
  };

  const initAllRooms = () => {
    setCategory(categoryAllRooms);
    setSheetStatus(sheetOpen);
  };
  
  const clearResults = () => {
    setCategory(categorySearch);
    setRoom(-1);
    setSheetStatus(sheetClose);
  };

  //Building Selection
  const handleBuilding = (building) => {
    setSheetStatus(sheetOpen);
    setCategory(building);
  };

  //Room Selection
  const handleRoomSelection = (etage: number, room: number) => {
    setEtage(etage);
    setRoom(room);
    setSheetStatus(sheetClose);
  };

  const destination = { category: category, etage: etage, room: room };

  return (
    <GestureHandlerRootView style={styles.homeContainer}>
      {room == -1 || isScreenFinish ? <TopBar /> : <View></View>}

      <LinearGradient
        style={styles.topBarGrad}
        colors={["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0)"]}
        locations={[0.3, 0.7]}
      />

      <View style={styles.roomBarView}>
        {destination.room != -1 && !isScreenFinish && (
          <RoomBar destination={destination} showFloor={false} />
        )}
      </View>

      <ScrollView
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          overflow: "hidden",
          position: "absolute",
          zIndex: -2,
        }}
      >
        <Campus
          destination={destination}
          onBuilding={(building) => handleBuilding(building)}
          navigation={navigation}
          isScreenFinish={isScreenFinish}
        ></Campus>
      </ScrollView>

      <View style={styles.bottomNav}>
        {destination.room != -1 && !isScreenFinish && (
          <ButtonTextAndIcon
            color={customColors.orange}
            isActive={false}
            imageSource={require("../assets/icons/chevronRight.png")}
            w={12}
            h={24}
            action={() =>
              navigation.navigate("Navigation", {
                name: "Navigation",
                destination: destination,
              })
            }
          >
            Start Navigation
          </ButtonTextAndIcon>
        )}
        {(room == -1 || isScreenFinish)? (
          <>
            <View style={styles.homeBottomNav}>
              <Pressable
                style={({ pressed }) => [styles.bhnSearchBar, {transform: [{ scale: pressed ? 0.95 : 1 }]}]}
                onPress={() => initSearch()}
              >
                <ICMagnifier width={25} height={25}></ICMagnifier>
                <Text style={styles.bhnSearchBarText}>Find Room</Text>
              </Pressable>
              <ButtonIconSVG color={customColors.uwu} action={() => initAllRooms()} customStyles={0} buttonPadding={15}>
                <ICList width={30} height={30}></ICList>
              </ButtonIconSVG>
              <ButtonIconSVG
                color={customColors.uwu}
                action={() => navigation.navigate("SettingsPage")}
                customStyles={0}
                buttonPadding={15}
              >
                <ICSettings width={30} height={30}></ICSettings>
              </ButtonIconSVG>
            </View>
          </>
        ) : (
          <ButtonTextOnly action={() => clearResults()}>Cancel</ButtonTextOnly>
        )}
      </View>
      
      <BottomSheetBar
        status={sheetStatus}
        setStatus={(index) => setSheetStatus(index)}
        selectRoom={(etage, room) => handleRoomSelection(etage, room)}
        selectBuilding={(building) => handleBuilding(building)}
        category={category}
        room={room}
        onClearResults={clearResults}
        isScreenFinish={isScreenFinish}
        navigation={navigation}
        destination={destination}
      />
    </GestureHandlerRootView>
  );
};
