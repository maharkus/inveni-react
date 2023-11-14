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
        let buildings = [];
        let floors = [];
        let rooms = [];

        for(let i = 0; i < data.buildings.length; i++) {
            for(let j = 0; j < data.buildings[i].etage.length; j++) {
                for(let k = 0; k < data.buildings[i].etage[j].rooms.length; k++) {
                    let room = data.buildings[i].etage[j].rooms[k];
                    if(room[0].toString().toLowerCase().concat('', room[1].toString().toLowerCase())) {
                        rooms.push(...[[room, k]])
                    }
                }
                floors.push(...[rooms])
                rooms = []
            }
            buildings.push(...[floors])
            floors = []
        }
        setallRooms(buildings);
    }, [])

    const handleSelection = (item: any, index:number) => {
        selectBuilding(item[7])
        onRoomSelection (item[6], index)
    }

    return (
        <SafeAreaView style={[{padding: 0, marginTop: -30}]}>
            {allRooms.map((item: any, indexBuilding: number) => (
                <View key={indexBuilding} style={{flex: 1, justifyContent: "center", alignItems: "center", width: "100%", marginTop: -40}}>
                    <Text style={[styles.defaultHeader, {fontSize:  15, width: "82.5%", marginBottom: 0, }]}>Rooms in {data.buildings[indexBuilding].name} </Text>
                    {item.map((item:any, indexFloor: number) =>(
                        <>
                        <Text style={[styles.defaultText, {fontSize:  15, fontFamily: "Work Sans Bold",  width: "82.5%", marginTop: 10, marginBottom: 10}]}>Floor: {data.buildings[indexBuilding].etage[indexFloor].name} </Text>
                        <View key={indexFloor} style={styles.roomGrid}>
                            {item.map((item:any, indexRoom: number) =>(
                                <Pressable style={styles.room} key={indexRoom} onPress={() => handleSelection (item[0], item[1])}>
                                    <View style={styles.roomTextView}>
                                        <Text style={styles.roomTextPrim}>{item[0][0]}</Text>
                                        <Text style={styles.roomTextSec}>{item[0][1]}</Text>
                                    </View>
                                    <View style={[styles.roomBottomBar, {backgroundColor: item[0][5]}]} />
                                </Pressable>
                            ))}
                        </View>
                        </>
                    ))}
                </View>
            ))}
        </SafeAreaView>
    );
}
