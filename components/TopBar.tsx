import {Image, View} from "react-native";
import ButtonIcon from "./ButtonIcon";
import {customColors, styles} from "../styles/styles";

export function TopBar({navigation}) {
    return (
        <View style={styles.topBarContainer}>
            <Image source={require('../assets/Logo.png')} style={{width: 130, height: 47}}/>
            <ButtonIcon
                size={30}
                color={customColors.yellow}
                imageSource={require("../assets/icons/settings.png")}
                buttonPadding={15}
                action={() => navigation.navigate('SettingsPage')} />
        </View>
    );
}
