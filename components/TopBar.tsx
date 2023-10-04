import {View, Text} from "react-native";
import ButtonIcon from "./ButtonIcon";
import {customColors, styles} from "../styles/styles";
import Icon from "../assets/Icon.svg";
import Logo from "../assets/Logo.svg";


export function TopBar({navigation, fullLogo = false, settingsBtn = true}) {
    return (
        <View style={styles.topBarContainer}>
            <View>
                {!fullLogo ?
                    <>
                        <Logo></Logo>
                    <Text style={{fontSize: 12, marginTop: 5}}>HSHL Campus Lippstadt</Text>
                    </>
                    :
                    <Logo></Logo>
                }
            </View>
            {!settingsBtn ?
                <View></View>
                :
                <ButtonIcon
                    size={30}
                    color={customColors.yellow}
                    imageSource={require("../assets/icons/settings.png")}
                    buttonPadding={15}
                    action={() => navigation.navigate('SettingsPage')}
                    customStyles={0} />
            }

        </View>
    );
}
