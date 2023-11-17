import { useEffect, useRef, useState } from "react";
import data from "../roomfinding/data.json";
import { View, Text, Pressable } from "react-native";
import { SearchBar } from "./SearchBar";
import { styles } from "../styles/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { getFontSize } from '../utils/utils';

interface Props {
  onRoomSelection: (etage, id) => void,
  selectBuilding: (building) => void,
  onClear: () => void,
  isSheetOpen: boolean,
  shouldFocus: boolean
}

export const SearchResults = ({shouldFocus, onRoomSelection, selectBuilding, isSheetOpen} : Props) => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isClear, setIsClear] = useState(false);
  
  //Lottie files initilizing
  const lottieRef = useRef<LottieView>(null);
  const loadingRef = useRef<LottieView>(null);

  useEffect(() => {
    lottieRef.current?.reset()
    setTimeout(() => {
      lottieRef.current?.play()
    }, 150)
  }, [])

  useEffect(() => {
    loadingRef.current?.reset()
    setTimeout(() => {
      loadingRef.current?.play()
    }, 150)
  }, [])

  //search functionality
  const handleSearch = (text) => {
    const search = String(text)
    setSearchText(search)
    setIsClear(false)
    search != "" && setIsSearching(true)
  }

  
  useEffect(() => {
    //deactivate search when input is empty
    if (searchText == "") {
      setIsSearching(false)
      setFilteredData([])
      return
    }
    
    //search for room in database
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

  //select searched room for navigation
  const handleSelection = (item: any, index:number) => {
    selectBuilding(item[7])
    onRoomSelection (item[6], index)
  }

  //clear search on sheet closing
  useEffect(() => {
    if (!isSheetOpen) {
      setIsClear(true)
      clearSearch()
      setIsSearching(false)
    }
    else {
      setIsClear(false)
    }
  }, [isSheetOpen])

  //reset search
  const clearSearch = () => {
    setSearchText("")
    setFilteredData([])
    setIsSearching(false)
  }

  //popular rooms
  const mensa = data.buildings[0].etage[0].rooms[1]
  const library = data.buildings[1].etage[1].rooms[6]
  const campusOffice = data.buildings[0].etage[0].rooms[0]
  const lp1 = data.buildings[1].etage[0].rooms[0]
  const lp2 = data.buildings[1].etage[0].rooms[1]
  const lp3 = data.buildings[1].etage[0].rooms[2]

  const popularRoom = (room, index, id) => (
    <Pressable style={styles.room} key={id} onPress={() => handleSelection(room, index)}>
      <View style={styles.roomTextView}>
        <Text style={styles.roomTextPrim}>{room[0]}</Text>
        <Text style={styles.roomTextSec}>{room[1]}</Text>
      </View>
      <View style={[styles.roomBottomBar, { backgroundColor: room[5] }]} />
    </Pressable>
  );

  return (
      <View style={styles.center}>
        <View style={{padding: "2.5%", width: "100%"}}>
          <SearchBar onSearch={handleSearch} shouldFocus={shouldFocus} inputClear={isClear}/>
        </View>
        <SafeAreaView style={styles.center}>
          {isSearching ? (
              <View style={[styles.center, {height: "100%", marginTop: 32}]}>
                <LottieView
                    source={require('../assets/lotties/loadingAnimV2.json')}
                    ref={loadingRef}
                    loop
                    autoPlay
                    style={{flex: 1, height: 20}}
                />
                <Text style={[styles.defaultText, {marginTop: 16}]}>Looking for your room...</Text>
              </View>
          ) : searchText.length === 0 ? (
              <>
                <Text style={[styles.defaultHeader, {width: "100%", textAlign: "center", marginTop: 10}]}>Popular Rooms</Text>
                <View style={styles.roomGrid}>
                  {popularRoom(mensa, 1, 1)}
                  {popularRoom(library, 6, 2)}
                  {popularRoom(campusOffice, 0, 3)}
                  {popularRoom(lp1, 0, 4)}
                  {popularRoom(lp2, 1, 5)}
                  {popularRoom(lp3, 2, 6)}
                </View>
              </>
          ) : filteredData.length > 0 ? (
              <>
                <Text style={[styles.defaultHeader, {width: "100%", textAlign: "center", marginTop: 10}]}>Search Results</Text>
                <View style={styles.roomGrid}>
                {filteredData.map((item: any, index: number) => (
                    <Pressable style={styles.room} key={index} onPress={() => handleSelection (item[0], item[1])}>
                      <View style={styles.roomTextView}>
                        <Text style={styles.roomTextPrim}>{item[0][0]}</Text>
                        <Text style={[styles.roomTextSec, {fontSize: getFontSize(item[0][1])}]}>{item[0][1]}</Text>
                      </View>
                      <View style={[styles.roomBottomBar, {backgroundColor: item[0][5]}]} />
                    </Pressable>
                ))}
                </View>
              </>
          ) : (
              <>
                <View style={[styles.center, {height: 150, marginTop: 32}]}>
                  <LottieView
                      source={require('../assets/lotties/searchAnimation.json')}
                      ref={lottieRef}
                      loop
                      autoPlay
                      style={{flex: 1, height: 100, width: "100%"}}
                  />
                  <Text style={[styles.defaultText, { textAlign: "center", width: "100%", marginTop: 16 }]}>No rooms found. Try again!</Text>
                </View>
              </>
          )}
        </SafeAreaView>
      </View>
  );
};

