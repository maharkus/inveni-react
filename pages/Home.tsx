import { useEffect, useState } from "react";
import { customColors, styles } from "../styles/styles";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Campus from "../components/Campus";
import { Pressable, View, Text, Image } from "react-native";
import { Search } from "../components/Search";
import { TopBar } from "../components/TopBar";
import ButtonIcon from "../components/ButtonIcon";
import * as React from "react";
import { ButtonTextOnly } from "../components/ButtonTextOnly";
import ButtonTextAndIcon from "../components/ButtonTextAndIcon";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../states/store";
import RoomBar from "../components/RoomBar";

export const Home = ({ route, navigation }) => {
  const [category, setCategory] = useState(-1);
  const [room, setRoom] = useState(-1);
  const [etage, setEtage] = useState(-1);
  const [sheetStatus, setSheetStatus] = useState(-1);
  const value = useSelector((state: RootState) => state.counter.value);

  //Init Search
  const initSearch = () => {
    clearResults();
    setSheetStatus(1);
  };

  const clearResults = () => {
    setCategory(-1);
    setRoom(-1);
    setSheetStatus(-1);
  };

  //Building Selection
  const handleBuilding = (building) => {
    setSheetStatus(1);
    setCategory(building);
  };

  //Room Selection
  const handleRoomSelection = (etage: number, room: number) => {
    setEtage(etage);
    setRoom(room);
    setSheetStatus(-1);
  };

  const destination = { category: category, etage: etage, room: room };

  return (
    <>
      <GestureHandlerRootView style={styles.homeContainer}>
        {room == -1 ? <TopBar navigation={navigation} /> : <View></View>}

        <LinearGradient
          style={styles.topBarGrad}
          colors={["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0)"]}
          locations={[0.3, 0.7]}
        />
        <View style={styles.roomBarView}>
          {destination.room != -1 && <RoomBar destination={destination} />}
        </View>

        <Campus
          destination={destination}
          onBuilding={(building) => handleBuilding(building)}
          navigation={navigation}
        ></Campus>

        <View style={styles.bottomNav}>
          {destination.room != -1 && (
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
          {room == -1 ? (
            <>
              <ButtonIcon
                size={30}
                buttonPadding={25}
                color={customColors.orange}
                imageSource={require("../assets/icons/magnifier.png")}
                action={() => initSearch()}
                customStyles={0}
              ></ButtonIcon>
              <View style={styles.homeBottomNav}>
                <Pressable style={styles.bhnSearchBar}>
                  <Image
                    style={{ height: 30, width: 30 }}
                    source={require("../assets/icons/settings.png")}
                  ></Image>
                  <Text style={styles.bhnSearchBarText}>Search</Text>
                </Pressable>
                <ButtonIcon
                  size={30}
                  color={customColors.uwu}
                  imageSource={require("../assets/icons/settings.png")}
                  buttonPadding={15}
                  action={() => navigation.navigate("SettingsPage")}
                  customStyles={0}
                />
                <ButtonIcon
                  size={30}
                  color={customColors.uwu}
                  imageSource={require("../assets/icons/settings.png")}
                  buttonPadding={15}
                  action={() => navigation.navigate("SettingsPage")}
                  customStyles={0}
                />
              </View>
            </>
          ) : (
            <ButtonTextOnly action={() => clearResults()}>
              Cancel
            </ButtonTextOnly>
          )}
        </View>
        <Search
          status={sheetStatus}
          statusChange={(index) => setSheetStatus(index)}
          selectRoom={(etage, room) => handleRoomSelection(etage, room)}
          selectBuilding={(building) => handleBuilding(building)}
          category={category}
          room={room}
          onClear={clearResults}
          isNavigationFinished={value}
        />
      </GestureHandlerRootView>
    </>
  );
};
