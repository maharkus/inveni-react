import { useEffect, useState } from "react";
import data from "../roomfinding/testData.json";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { SearchBar } from "./SearchBar";
import { styles } from "../styles/styles";
import { SafeAreaView } from "react-native-safe-area-context";

export const SearchResults = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
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
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Pressable style={styles.room} key={0} onPress={null}>
                <View style={styles.roomTextView}>
                    <Text style={styles.roomTextPrim}>{item.id}</Text>
                    <Text style={styles.roomTextSec}>{item.name}</Text>
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
