import { useEffect, useState } from "react";
import data from "../roomfinding/testData.json";
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SearchBar } from './SearchBar';

export const SearchResults = () => {
    const [searchText, setSearchText] = useState('');
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
      <View style={styles.container}>
        <SearchBar onSearch={handleSearch} />
          {/*<FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text style={styles.item}>{item.name}</Text>
          )}
        />*/}
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    item: {
      fontSize: 16,
      paddingVertical: 8,
    },
});
