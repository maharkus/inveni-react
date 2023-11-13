import {ScrollView, View, Text, Image, Linking, Alert, Button, Pressable, TouchableOpacity} from "react-native";
import {styles, customColors} from "../styles/styles";
import ButtonIcon from "../components/ButtonIcon";
import {TopBar} from "../components/TopBar";
import * as React from "react";
import Logo from "../assets/Logo.svg";
import LottieView from "lottie-react-native";
import { useCallback, useEffect, useRef } from "react";

const supportedURL = 'mailto:contact@julz.life';

type OpenURLButtonProps = {
    url: string;
    children: string;
};

const OpenURLButton = ({url, children}: OpenURLButtonProps) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);
  
    return (
        <Pressable  
            onPress={handlePress} 
            style={({ pressed }) =>[styles.buttonBasics, {backgroundColor: !pressed ? customColors.orange : customColors.orangePressed}]}>
            {({ pressed }) => (
                <Text style={styles.buttonText}>{children}</Text>
            )}
        </Pressable>
    );
  };

export const SettingsPage = ({ navigation}) => {
    const lottieRef = useRef<LottieView>(null);

    useEffect(() => {
        lottieRef.current?.reset()
        setTimeout(() => {
          lottieRef.current?.play()
        }, 100)
      }, [])
      
    return (
        <View style={{backgroundColor: "#ffffff"}}>
            <TopBar/>
            <ScrollView contentContainerStyle={[styles.contentContainer, {paddingTop: 20,paddingBottom: 275}]}>
                <View style={{flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%"}}>
                    <LottieView
                        source={require('../assets/lotties/settingsHeader.json')}
                        ref={lottieRef}
                        loop
                        autoPlay
                        style={{flex: 1, height: 360}}
                    />
                </View>
                <View style={[styles.settingsBox, {backgroundColor: customColors.purple, marginBottom: 40, marginTop: -60, paddingTop: 20}]}>
                    <View style={{display: "flex", flexDirection: "row", gap: 10, justifyContent: "center"}}>
                        <Text style={[styles.defaultHeader, {marginTop: 20.5, fontSize: 20}]}>
                            About
                        </Text>
                        <Logo width={100}></Logo>
                    </View>
                    <Text style={[styles.defaultText, {marginTop: 10, textAlign: "center"}]}>inveni helps you with navigation on campus. Choose a room, and the app takes care of the rest.</Text>
                    <Text style={[styles.defaultText, {marginTop: 10, textAlign: "center"}]}>The app was developed as a project by Julz and Markus, two students in Computer Visualization and Design at Hamm-Lippstadt University.</Text>
                    <Text style={[styles.defaultText, {marginTop: 10, textAlign: "center", marginBottom: 30}]}>Do you have any questions or suggestions about the app? Write to us!</Text>
                    <OpenURLButton url={supportedURL}>Send us an e-mail!</OpenURLButton>
                </View>

            </ScrollView>
            <View style={{flex: 1, alignItems: "center", position: "absolute", zIndex: 3, bottom: 150, left: 0, right: 0}}>
                <ButtonIcon size={25} buttonPadding={25} color={customColors.uwu} imageSource={require("../assets/icons/close.png")} action={() => navigation.goBack()} customStyles={styles.closeButton} />
            </View>

        </View>
    );
};
