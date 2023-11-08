import { useEffect, useState } from "react";
import data from "../roomfinding/data.json";
import { View, Text, Pressable } from "react-native";
import { styles } from "../styles/styles";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  onRoomSelection: (etage: any, id: any) => void,
  selectBuilding: (building: any) => void
}

export const AllRooms = ({onRoomSelection, selectBuilding} : Props) => {
    const [allRooms, setallRooms] = useState([]);
    
    useEffect(() => {
        let rooms = [];
        let filtered = [];

        for(let i = 0; i < data.buildings.length; i++) {
            for(let j = 0; j < data.buildings[i].etage.length; j++) {
            filtered = data.buildings[i].etage[j].rooms.filter((item:any) =>
                item[0].toLowerCase().concat('', item[1].toLowerCase())
            );
            rooms.push(...filtered);
            }
        }

        setallRooms(rooms);
    }, [])

    const handleSelection = (item: any, index:number) => {
        selectBuilding(item[7])
        onRoomSelection (item[6], index)
    }

    return (
        <SafeAreaView style={[styles.roomGrid, {padding: 0, marginTop: -50}]}>
            {allRooms.map((item: any, index: number) => (
                <Pressable style={styles.room} key={index} onPress={() => handleSelection (item, index)}>
                    <View style={styles.roomTextView}>
                        <Text style={styles.roomTextPrim}>{item[0]}</Text>
                        <Text style={styles.roomTextSec}>{item[1]}</Text>
                    </View>
                    <View style={[styles.roomBottomBar, {backgroundColor: item[5]}]} />
                </Pressable>
            ))}
        </SafeAreaView>
    );
}
