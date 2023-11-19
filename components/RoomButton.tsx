import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { customColors, styles } from '../styles/styles';
import { getFontSize } from '../utils/utils';

const RoomButton = ({ room, index, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.room,
        {
          transform: [{ scale: pressed ? 0.95 : 1 }],
          ...(pressed ? styles.roomPressed : {}),
          backgroundColor: pressed ? customColors.grey : 'white',
        }
      ]}
      onPress={() => onPress(room, index)}
    >
      <View style={styles.roomTextView}>
        <Text style={styles.roomTextPrim}>{room[0]}</Text>
        <Text style={[styles.roomTextSec, {fontSize: getFontSize(room[1])}]}>{room[1]}</Text>
      </View>
      <View style={[styles.roomBottomBar, { backgroundColor: room[5] }]} />
    </Pressable>
  );
};

export default RoomButton;