import { View, Text } from "react-native";
import { styles } from "../styles/styles";
import * as React from "react";
import data from "../roomfinding/data.json";
import { useSelector } from "react-redux";
import { RootState } from "../states/store";

interface Props {
  showFloor?: boolean;
}

export default function RoomBar({ showFloor = true }: Props) {
  //set current floor
  const currentFloor = useSelector(
    (state: RootState) => state.counter.currentFloor
  );

  const destination = useSelector(
    (state: RootState) => state.counter.destination
  );

  // Check if destination and its properties are defined
  const building = destination && data.buildings[destination.category];
  const etage = building && building.etage[destination.etage];
  const room = etage && etage.rooms[destination.room];

  // Safely access building name, etage, and room
  const buildingname = building ? building.name : "Default Building Name";
  const roomname = room ? room[1] : "Default Room Name";

  //dynamic font size
  const getFontSize = (name) => {
    if (name.length > 25) return 11;
    if (name.length >= 25 && name.length > 15) return 12;
    if (name.length >= 15 && name.length > 0) return 13;
    return 15;
  };

  return (
    <View style={styles.navigationTopBarWrapper}>
      <View style={styles.navigationTopBar}>
        <View style={styles.navigationTopBarContent}>
          <View style={[styles.navTBC, styles.navTBCirclePurple]}></View>
          <Text
            style={[
              styles.defaultText,
              styles.roomBarText,
              { marginRight: 15, fontSize: getFontSize(roomname) },
            ]}
          >
            {buildingname}
          </Text>

          <View style={[styles.navTBC, styles.navTBCircleOrange]}></View>
          <Text
            style={[
              styles.defaultText,
              styles.roomBarText,
              { fontSize: getFontSize(roomname), maxWidth: 150 },
            ]}
          >
            {roomname}
          </Text>
        </View>
      </View>
      {showFloor && (
        <View style={styles.floorWrapper}>
          <Text style={styles.floorText}>E0{currentFloor}</Text>
        </View>
      )}
    </View>
  );
}
