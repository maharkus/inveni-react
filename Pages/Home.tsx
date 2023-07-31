import { useState } from "react";
import { styles } from "../styles/styles";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Campus from "../components/Campus";
import { Button } from 'react-native-paper';
import {Image, View} from "react-native";
import {Search} from "../components/Search";
import {TopBar} from "../components/TopBar";


export const Home = ({ navigation }) => {
  const [category, setCategory] = useState(-1);
  const [room, setRoom] = useState(-1);
  const [sheetStatus, setSheetStatus] = useState(-1);



  //Init Search
  const initSearch = () => {
    setSheetStatus(1)
    clearResults();
  }

  const clearResults = () => {
    setCategory(-1)
    setRoom(-1)
  }

  //Building Selection
  const handleBuilding = (building) => {
    setSheetStatus(1)
    setCategory(building)
  }

  //Room Selection
  const handleRoomSelection = (room: number) => {
    setRoom(room);
    setSheetStatus(-1)
  }

  return (
      <>
        <GestureHandlerRootView style={styles.container}>
            <TopBar/>
            <Campus destination={[category, room]} onBuilding={(building) => handleBuilding(building)} navigation={navigation}></Campus>
            <View style={{padding: 20}}>
              <Button onPress={() => initSearch()}>Suche</Button>
            </View>
            <Search status={sheetStatus}
                    statusChange={(index) => setSheetStatus(index)}
                    selectRoom={(room) => handleRoomSelection(room)}
                    selectBuilding={(building) => handleBuilding(building)}
                    category={category}
                    onClear={clearResults}/>
        </GestureHandlerRootView>
      </>
  );
};
