import {View, Text} from "react-native";
import {styles} from "../styles/styles";
import Logo from "../assets/Logo.svg";

export function TopBar({fullLogo = false}) {
    return (
        <View style={styles.topBarContainer}>
            <View>
                {!fullLogo ?
                    <>
                        <Logo></Logo>
                        <Text style={{fontSize: 11, marginTop: 5, fontFamily: "Work Sans"}}>HSHL Campus Lippstadt</Text>
                    </>
                    :
                    <Logo></Logo>
                }
            </View>
        </View>
    );
}
