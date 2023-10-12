import { useEffect, useState } from "react";
import data from "../roomfinding/data.json";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { SearchBar } from "./SearchBar";
import { styles } from "../styles/styles";
import { SafeAreaView } from "react-native-safe-area-context";

export const SearchResults = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filtered = data.buildings[0].etage[0].rooms.filter((item:any) =>
      item[0].toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchText]);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  return (
    <View style={bonusStyles.container}>
      <SearchBar onSearch={handleSearch} />
      <SafeAreaView style={styles.roomGrid}>
        <FlatList
            data={filteredData}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => (
              <Pressable style={styles.room} key={0} onPress={null}>
                <View style={styles.roomTextView}>
                    <Text style={styles.roomTextPrim}>{item[0]}</Text>
                    <Text style={styles.roomTextSec}>{item[1]}</Text>
                </View>
                <View style={[styles.roomBottomBar, {backgroundColor: "red"}]} />
              </Pressable>
            )}
            />
      </SafeAreaView>
    </View>
  );
};

const bonusStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    fontSize: 16,
    paddingVertical: 8,
  },
});
