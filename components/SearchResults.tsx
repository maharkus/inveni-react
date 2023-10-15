import { useEffect, useState } from "react";
import data from "../roomfinding/data.json";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { SearchBar } from "./SearchBar";
import { styles } from "../styles/styles";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  onRoomSelection: (etage, id) => void,
  selectBuilding: (building) => void
}
export const SearchResults = ({onRoomSelection, selectBuilding} : Props) => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    let filter = [];
    let filtered = [];

    for(let i = 0; i < data.buildings.length; i++) {
      for(let j = 0; j < data.buildings[i].etage.length; j++) {
        filtered = data.buildings[i].etage[j].rooms.filter((item:any) =>
            item[0].toLowerCase().concat(' ', item[1].toLowerCase()).includes(searchText.toLowerCase())
        );
        filter.push(...filtered);
        console.log(filter);
      }
    }

    setFilteredData(filter);

    return () => setFilteredData([]);
  }, [searchText]);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const handleSelection = (item: any, index:number) => {
    selectBuilding(item[7])
    console.log(item[0])
    onRoomSelection (item[6], index)
  }

  return (
      <View style={{flex: 1, padding: 16}}>
        <SearchBar onSearch={handleSearch} />
        <SafeAreaView style={styles.roomGrid}>
          {filteredData.map((item: any, index: number) => (
              <Pressable style={styles.room} key={index} onPress={() => handleSelection (item, index)}>
                <View style={styles.roomTextView}>
                  <Text style={styles.roomTextPrim}>{item[0]}</Text>
                  <Text style={styles.roomTextSec}>{item[1]}</Text>
                </View>
                <View style={[styles.roomBottomBar, {backgroundColor: item[5]}]} />
              </Pressable>
          ))}
        </SafeAreaView>
      </View>
  );
};

