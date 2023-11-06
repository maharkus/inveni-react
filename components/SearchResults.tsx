import { useEffect, useRef, useState } from "react";
import data from "../roomfinding/data.json";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { SearchBar } from "./SearchBar";
import { customColors, styles } from "../styles/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";

interface Props {
  onRoomSelection: (etage, id) => void,
  selectBuilding: (building) => void,
  isSheetOpen: boolean
}

export const SearchResults = ({onRoomSelection, selectBuilding, isSheetOpen} : Props) => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isSearching, setIsSearching] = useState(false);

  const lottieRef = useRef<LottieView>(null);

  useEffect(() => {
    lottieRef.current?.reset();
    setTimeout(() => {
      lottieRef.current?.play();
    }, 100)
    console.log('searchplay');
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    setIsSearching(true);
  };

  useEffect(() => {
    if (searchText.trim() === "") {
      setIsSearching(false);
      setFilteredData([]);
      return;
    }

    // Simulate a small delay to mimic an async operation like an API call
    const timeoutId = setTimeout(() => {
      // Perform the filtering here...
      let filter = [];
      let filtered = [];

      for(let i = 0; i < data.buildings.length; i++) {
        for(let j = 0; j < data.buildings[i].etage.length; j++) {
          filtered = data.buildings[i].etage[j].rooms.filter((item:any) =>
              item[0].toLowerCase().concat('', item[1].toLowerCase()).includes(searchText.toLowerCase())
          );
          filter.push(...filtered);
      }
    }

    setFilteredData(filter);
      // After filtering is done, set searching state to false
      setIsSearching(false);
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [searchText]);


  const handleSelection = (item: any, index:number) => {
    selectBuilding(item[7])
    onRoomSelection (item[6], index)
  }

  return (
      <View style={{flex: 1, padding: 16}}>
        <SearchBar onSearch={handleSearch} shouldFocus={isSheetOpen} />
        <SafeAreaView style={styles.roomGrid}>
          {isSearching ? 
          <View style={{flex: 1, justifyContent: "center", marginTop: 32}}>
            <ActivityIndicator size="large" color={customColors.dark} /> 
          </View>
          : 
          searchText.length === 0 ?
            <View style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#fff",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 16,
            }}>
              <LottieView
                source={require('../assets/lotties/searchAnimation.json')}
                ref={lottieRef}
                loop
                style={{height: 125, width: "100%"}}
              />
              <Text style={{textAlign: "center", fontFamily: "Work Sans", marginTop: 32}}>Where do you wanna go?</Text>
            </View> 
          :
              filteredData.map((item: any, index: number) => (
                  <Pressable style={styles.room} key={index} onPress={() => handleSelection (item, index)}>
                    <View style={styles.roomTextView}>
                      <Text style={styles.roomTextPrim}>{item[0]}</Text>
                      <Text style={styles.roomTextSec}>{item[1]}</Text>
                    </View>
                    <View style={[styles.roomBottomBar, {backgroundColor: item[5]}]} />
                  </Pressable>
              ))
          }
        </SafeAreaView>
      </View>
  );
};

