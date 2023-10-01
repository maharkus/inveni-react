import {ScrollView, View, Text, Image} from "react-native";
import {styles, customColors} from "../styles/styles";
import ButtonIcon from "../components/ButtonIcon";
import {ButtonText} from "../components/ButtonText";
import {TopBar} from "../components/TopBar";
import * as React from "react";

export const SettingsPage = ({ navigation}) => {
    return (

        <View style={{backgroundColor: "#ffffff"}}>
            <TopBar navigation={navigation} fullLogo={true}/>
            <ScrollView contentContainerStyle={[styles.contentContainer, {paddingTop: 50, paddingBottom: 200}]}>

                <Image source={require('../assets/settingsHeader.png')}
                       resizeMethod={"resize"}
                       progressiveRenderingEnabled={true}
                       style={{width: 230, height: 250}}/>

                <View style={[styles.settingsBox, {backgroundColor: customColors.purple, marginBottom: 40, marginTop: -80}]}>
                    <Text style={[styles.defaultHeader, {textAlign: "center"}]}>Ueber inveni</Text>
                    <Text style={{marginTop: 10}}>inveni hilft Dir bei der Navigation auf dem Campus. Wähle einen Raum und die App übernimmt den Rest.</Text>
                    <Text style={{marginTop: 10}}>Die App wurde als Projektarbeit von Julz und Markus entwickelt, zwei Studenten in Computervisualistik und Design an der Hochschule Hamm-Lippstadt.</Text>
                    <Text style={{marginTop: 10, marginBottom: 20}}>Du hast Fragen oder Anregungen zur App? Schreib uns!</Text>
                    <ButtonText color={customColors.orange} action={() => navigation.navigate("Home")}>Kontaktiere uns</ButtonText>
                </View>

                <View style={[styles.settingsBox, {backgroundColor: customColors.yellow}]}>
                    <Text style={[styles.defaultHeader, {textAlign: "center"}]}>Einstellungen</Text>
                    <ButtonText color={customColors.orange} action={() => navigation.navigate("Home")}>Anwenden</ButtonText>
                </View>


            </ScrollView>
            <View style={{flex: 1, alignItems: "center", position: "absolute", zIndex: 3, bottom: 150, left: 0, right: 0}}>
                <ButtonIcon size={25} buttonPadding={25} color={customColors.grey} imageSource={require("../assets/icons/close.png")} action={() => navigation.goBack()} customStyles={styles.closeButton} />
            </View>

        </View>
    );
};
