import { View, Text } from "react-native";
import { styles } from "../styles/styles";
import * as React from "react";
import data from "../roomfinding/data.json";
import { useFloor } from "../states/FloorContext";

interface Props {
  destination: { category: number; etage: number; room: number };
  showFloor?: boolean;
}

export default function RoomBar({ destination, showFloor = true }: Props) {
  const { currentFloor } = useFloor();

  const buildingname = data.buildings[destination.category].name;
  const room =
    data.buildings[destination.category].etage[destination.etage].rooms[
      destination.room
    ][1];

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
              { marginRight: 15, fontSize: getFontSize(room) },
            ]}
          >
            {buildingname}
          </Text>

          <View style={[styles.navTBC, styles.navTBCircleOrange]}></View>
          <Text
            style={[
              styles.defaultText,
              styles.roomBarText,
              { fontSize: getFontSize(room), maxWidth: 150 },
            ]}
          >
            {room}
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
