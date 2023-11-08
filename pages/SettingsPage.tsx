import {ScrollView, View, Text, Image} from "react-native";
import {styles, customColors} from "../styles/styles";
import ButtonIcon from "../components/ButtonIcon";
import {ButtonText} from "../components/ButtonText";
import {TopBar} from "../components/TopBar";
import * as React from "react";
import Logo from "../assets/Logo.svg";

export const SettingsPage = ({ navigation}) => {
    return (

        <View style={{backgroundColor: "#ffffff"}}>
            <TopBar/>
            <ScrollView contentContainerStyle={[styles.contentContainer, {paddingTop: 50,paddingBottom: 325}]}>

                <Image source={require('../assets/settingsHeader.png')}
                       resizeMethod={"resize"}
                       progressiveRenderingEnabled={true}
                       style={{width: 260, height: 290}}/>

                <View style={[styles.settingsBox, {backgroundColor: customColors.purple, marginBottom: 40, marginTop: -80, paddingTop: 20}]}>
                    <View style={{display: "flex", flexDirection: "row", gap: 10, justifyContent: "center"}}>
                        <Text style={[styles.defaultHeader, {marginTop: 21}]}>
                            About
                        </Text>
                        <Logo width={100}></Logo>
                    </View>
                    <Text style={[styles.defaultText, {marginTop: 10, textAlign: "center"}]}>inveni helps you with navigation on campus. Choose a room, and the app takes care of the rest.</Text>
                    <Text style={[styles.defaultText, {marginTop: 10, textAlign: "center"}]}>The app was developed as a project by Julz and Markus, two students in Computer Visualization and Design at Hamm-Lippstadt University.</Text>
                    <Text style={[styles.defaultText, {marginTop: 10, textAlign: "center", marginBottom: 30}]}>Do you have any questions or suggestions about the app? Write to us!</Text>
                    <ButtonText color={customColors.orange} action={() => navigation.navigate("Home")}>Contact Us</ButtonText>
                </View>

                <View style={[styles.settingsBox, {backgroundColor: customColors.yellow}]}>
                    <Text style={[styles.defaultHeader, {textAlign: "center"}]}>Settings</Text>
                    <ButtonText color={customColors.orange} action={() => navigation.navigate("Home")}>Apply</ButtonText>
                </View>

            </ScrollView>
            <View style={{flex: 1, alignItems: "center", position: "absolute", zIndex: 3, bottom: 150, left: 0, right: 0}}>
                <ButtonIcon size={25} buttonPadding={25} color={customColors.uwu} imageSource={require("../assets/icons/close.png")} action={() => navigation.goBack()} customStyles={styles.closeButton} />
            </View>

        </View>
    );
};
