import { View, Text } from "react-native";
import { styles } from "../styles/styles";
import * as React from "react";

interface Props {
    destination: {category: number, room: number},
}

export default function RoomBar ({ destination} : Props) {
    return (
        <View style={styles.navigationTopBar}>
            <View style={styles.navigationTopBarContent}>
                <View style={[styles.navTBC, styles.navTBCirclePurple]}></View>
                {/*<View style={{marginRight: 10}}>
                    {
                        destination.category == 0 &&
                        <Text>L1</Text>
                    }
                    {
                        destination.category == 1 &&
                        <Text>L2</Text>
                    }
                    {
                        destination.category == 2 &&
                        <Text>L3</Text>
                    }
                    {
                        destination.category == 3 &&
                        <Text>L4</Text>
                    }
                    {
                        destination.category == 4 &&
                        <Text>IQL</Text>
                    }
                </View>*/}
                <Text style={{marginRight: 10}}>Gebäude</Text>

                <View style={[styles.navTBC,styles.navTBCircleOrange]}></View> 
                <Text>Raumname</Text>
            </View>
        </View>
    )
};
