import React from 'react';
import {Text, FlatList, View, Pressable} from "react-native";
import data from "../roomfinding/data.json";
import {styles} from "../styles/styles";
import { StyleSheet } from "react-native";


export const RoomGrid = () => {
    const rooms = data.buildings[0].rooms; 

    return (
        <FlatList
            numColumns={2}
            data={rooms}
            ItemSeparatorComponent={() => <View style={{height: 10}} />}
            keyExtractor={(id) => id.toString()}
            renderItem={({ item }) => (
                <View style={[styles.roomBox, extraStyle.roomBoxMargin]}>
                    <View style={styles.roomBoxContent}>
                        <Text>{item}</Text>
                    </View>
                    <View style={[styles.roomBoxBottom, extraStyle.roomBoxColour]} />
                </View>
            )}
        />
    )
}

const extraStyle = StyleSheet.create ({
    roomBoxColour: {
        backgroundColor: "#ff0000",
    },
    roomBoxMargin: {
        marginRight: 0,  
    },
});