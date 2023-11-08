import { useEffect, useRef, useState } from "react";
import data from "../roomfinding/data.json";
import { View, Text, Pressable } from "react-native";
import { SearchBar } from "./SearchBar";
import { styles } from "../styles/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";

interface Props {
  onRoomSelection: (etage, id) => void,
  selectBuilding: (building) => void,
  onClear: () => void,
  isSheetOpen: boolean
}

export const SearchResults = ({onRoomSelection, selectBuilding, onClear, isSheetOpen} : Props) => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isClear, setIsClear] = useState(false);

  const lottieRef = useRef<LottieView>(null);
  const loadingRef = useRef<LottieView>(null);

  useEffect(() => {
    lottieRef.current?.reset()
    setTimeout(() => {
      lottieRef.current?.play()
    }, 100)
  }, [])

  useEffect(() => {
    loadingRef.current?.reset()
    setTimeout(() => {
      loadingRef.current?.play()
    }, 100)
  }, [])

  const handleSearch = (text) => {
    const search = String(text)
    setSearchText(search)
    setIsClear(false)
    setIsSearching(true)
  }

  useEffect(() => {
    if (searchText.trim() === "") {
      setIsSearching(false)
      setFilteredData([])
      return
    }

    const timeout = setTimeout(() => {
      let rooms = [];

      for(let i = 0; i < data.buildings.length; i++) {
        for(let j = 0; j < data.buildings[i].etage.length; j++) {
          for(let k = 0; k < data.buildings[i].etage[j].rooms.length; k++) {
            let room = data.buildings[i].etage[j].rooms[k];
            if(room[0].toString().toLowerCase().concat('', room[1].toString().toLowerCase()).includes(searchText.toLowerCase())) {
              rooms.push(...[[room, k]])
            }
          }
        }
      }

      setFilteredData(rooms)
      setIsSearching(false)
    }, 500);

    return () => clearTimeout(timeout)
  }, [searchText])

  const handleSelection = (item: any, index:number) => {
    selectBuilding(item[7])
    onRoomSelection (item[6], index)
  }

  //clear search when bottomsheet closes // inputClear doesnt work tho :/
  useEffect(() => {
    if (!isSheetOpen) {
      setIsClear(true)
      clearSearch()
    }
    else {
      setIsClear(false)
    }
  }, [isSheetOpen])

  const clearSearch = () => {
    setSearchText("")
    setFilteredData([])
    setIsSearching(false)
    console.log("isClear: " + isClear)
  }

  //popular rooms
  const mensa = data.buildings[0].etage[0].rooms[1]
  const library = data.buildings[1].etage[1].rooms[6]
  const campusOffice = data.buildings[0].etage[0].rooms[0]
  const lp1 = data.buildings[1].etage[0].rooms[0]
  const lp2 = data.buildings[1].etage[0].rooms[1]
  const lp3 = data.buildings[1].etage[0].rooms[2]

  return (
      <View style={{flex: 1, padding: 16}}>
        <SearchBar onSearch={handleSearch} shouldFocus={isSheetOpen} inputClear={isClear}/>
        <SafeAreaView style={styles.roomGrid}>
          {isSearching ? (
              <View style={{flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%", marginTop: 32}}>
                <LottieView
                    source={require('../assets/lotties/loadingAnimV2.json')}
                    ref={loadingRef}
                    loop
                    autoPlay
                    style={{flex: 1, height: 5}}
                />
                <Text style={[styles.defaultText, {marginTop: 16}]}>Looking for your room...</Text>
              </View>
          ) : searchText.length === 0 ? (
              <>
                <Text style={[styles.defaultHeader, {width: "100%", textAlign: "center"}]}>Popular Rooms</Text>
              </>
          ) : filteredData.length > 0 ? (
              <>
                <Text style={[styles.defaultHeader, {width: "100%", textAlign: "center"}]}>Search Results</Text>
                {filteredData.map((item: any, index: number) => (
                    <Pressable style={styles.room} key={index} onPress={() => handleSelection (item[0], item[1])}>
                      <View style={styles.roomTextView}>
                        <Text style={styles.roomTextPrim}>{item[0][0]}</Text>
                        <Text style={styles.roomTextSec}>{item[0][1]}</Text>
                      </View>
                      <View style={[styles.roomBottomBar, {backgroundColor: item[0][5]}]} />
                    </Pressable>
                ))}
              </>
          ) : (
              <>
                <View style={{flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%", marginTop: 32}}>
                  <LottieView
                      source={require('../assets/lotties/searchAnimation.json')}
                      ref={lottieRef}
                      loop
                      autoPlay
                      style={{flex: 1, height: 100, width: "100%"}}
                  />
                  <Text style={[styles.defaultText, { textAlign: "center", width: "100%", marginTop: 16 }]}>No rooms found.</Text>
                </View>
              </>
          )

          }
        </SafeAreaView>
      </View>
  );
};

