import {Image, View, Text} from "react-native";
import ButtonIcon from "./ButtonIcon";
import {customColors, styles} from "../styles/styles";

export function TopBar({navigation}) {
    return (
        <View style={styles.topBarContainerV3}>
            <View>
                <Image source={require('../assets/Logo.png')} style={{width: 130, height: 47}}/>
                <Text style={{fontSize: 10.9, marginTop: 5, fontFamily:"Work Sans"}}>HSHL Campus Lippstadt</Text>
            </View>
            <ButtonIcon
                size={30}
                color={customColors.yellow}
                imageSource={require("../assets/icons/settings.png")}
                buttonPadding={15}
                action={() => navigation.navigate('SettingsPage')}
                customStyles={0} />
        </View>
    );
}
