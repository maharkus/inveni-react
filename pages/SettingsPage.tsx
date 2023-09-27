import {ScrollView, View, Text} from "react-native";
import {styles, customColors} from "../styles/styles";
import ButtonIcon from "../components/ButtonIcon";
import {ButtonText} from "../components/ButtonText";
import {TopBar} from "../components/TopBar";

export const SettingsPage = ({ navigation, route }) => {
  return (
    <>
      <TopBar navigation={navigation}/>

      <ScrollView contentContainerStyle={[styles.contentContainer, {paddingBottom: 200}]}>

        <View style={[styles.settingsBox, {backgroundColor: customColors.yellow, marginTop: 200}]}>
          <Text style={[styles.defaultHeader, {textAlign: "center"}]}>Einstellungen</Text>
          <ButtonText color={customColors.orange} action={() => navigation.navigate("Home")}>Anwenden</ButtonText>
        </View>

        <View style={[styles.settingsBox, {backgroundColor: customColors.purple, marginTop: 40}]}>
          <Text style={[styles.defaultHeader, {textAlign: "center"}]}>Ueber inveni</Text>
          <Text style={{marginTop: 10}}>inveni hilft Dir bei der Navigation auf dem Campus. Wähle einen Raum und die App übernimmt den Rest.</Text>
          <Text style={{marginTop: 10}}>Die App wurde als Projektarbeit von Julz und Markus entwickelt, zwei Studenten in Computervisualistik und Design an der Hochschule Hamm-Lippstadt.</Text>
          <Text style={{marginTop: 10, marginBottom: 20}}>Du hast Fragen oder Anregungen zur App? Schreib uns!</Text>
          <ButtonText color={customColors.orange} action={() => navigation.navigate("Home")}>Kontaktiere uns</ButtonText>
        </View>

      </ScrollView>

      <View style={{flex: 1, alignItems: "center"}}>
        <ButtonIcon size={25} buttonPadding={25} color={customColors.grey} imageSource={require("../assets/icons/close.png")} action={() => navigation.goBack()} customStyles={styles.closeButton} />
      </View> 
      
    </>
  );
};
