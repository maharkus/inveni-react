import { useEffect, useState } from "react";
import data from "../roomfinding/data.json";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { SearchBar } from "./SearchBar";
import { styles } from "../styles/styles";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  onRoomSelection: (etage, id) => void
}
export const SearchResults = ({onRoomSelection} : Props) => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filtered = data.buildings[0].etage[0].rooms.filter((item:any) =>
      item[0].toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filtered);
      return () => setFilteredData([]);
  }, [searchText]);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  return (
    <View style={{flex: 1, padding: 16}}>
      <SearchBar onSearch={handleSearch} />
      <SafeAreaView style={styles.roomGrid}>
          {filteredData.map((item: any, index: number) => (
              <Pressable style={styles.room} key={index} onPress={() => onRoomSelection (item[6], index)}>
                  <View style={styles.roomTextView}>
                      <Text style={styles.roomTextPrim}>{item[0]} {filteredData.length}</Text>
                      <Text style={styles.roomTextSec}>{item[1]}</Text>
                  </View>
                  <View style={[styles.roomBottomBar, {backgroundColor: item[5]}]} />
              </Pressable>
          ))}
      </SafeAreaView>
    </View>
  );
};

