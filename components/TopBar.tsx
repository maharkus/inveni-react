import {Image, View} from "react-native";

export const TopBar = () => {
    return (

        <View style={{padding: 20, paddingTop: 80}}>
            <Image source={require('../assets/Logo.png')} style={{width: 131, height: 47}}/>
        </View>
    );
};
