import { useEffect, useRef, useState } from "react";
import data from "../roomfinding/data.json";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { SearchBar } from "./SearchBar";
import { styles } from "../styles/styles";
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

  const lottieRef = useRef<LottieView>(null);

  useEffect(() => {
    lottieRef.current?.reset();
    setTimeout(() => {
      lottieRef.current?.play();
    }, 100)
    console.log('playing');
  }, []);

  useEffect(() => {
    if (searchText) {
      setIsLoading(true);
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 100); 

      return () => clearTimeout(timeout);
    }
  }, [searchText]);

  useEffect(() => {
    let filter = [];
    let filtered = [];

    for(let i = 0; i < data.buildings.length; i++) {
      for(let j = 0; j < data.buildings[i].etage.length; j++) {
        filtered = data.buildings[i].etage[j].rooms.filter((item:any) =>
            item[0].toLowerCase().concat(' ', item[1].toLowerCase()).includes(searchText.toLowerCase())
        );
        filter.push(...filtered);
      }
    }

    setFilteredData(filter);
  }, [searchText]);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const handleSelection = (item: any, index:number) => {
    selectBuilding(item[7])
    onRoomSelection (item[6], index)
  }

  return (
      <View style={{flex: 1, padding: 16}}>
        <SearchBar onSearch={handleSearch} shouldFocus={isSheetOpen} />
        <SafeAreaView style={styles.roomGrid}>
          {isLoading ? 
            <ActivityIndicator size="large" color="#0000ff" /> : 
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

