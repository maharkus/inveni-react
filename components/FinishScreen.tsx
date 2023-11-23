import { BottomSheetView } from "@gorhom/bottom-sheet";
import { customColors, styles } from "../styles/styles";
import RoomBar from "./RoomBar";
import { Image, Text, View, Dimensions } from "react-native";
import { ButtonText } from "./ButtonText";
import { ButtonTextOnly } from "./ButtonTextOnly";
import * as React from "react";

interface Props {
  category: number;
  destination: any;
  onFinish: () => void;
  onClose: () => void;
  navigation: any;
}
export const FinishScreen = ({
  destination,
  onFinish,
  onClose,
  navigation,
}: Props) => {
  //gifs for finish screen
  const finishedTexts = [
    "Wonderful!",
    "Okay!",
    "Great Success!",
    "Awesome!",
    "Neat!",
    "Yeehaw!",
    "Yeah!",
    "Wooho!",
  ];
  const gifs = [
    require("../assets/gifs/awesome.gif"),
    require("../assets/gifs/propeller.gif"),
    require("../assets/gifs/borat.gif"),
    require("../assets/gifs/top.gif"),
    require("../assets/gifs/yehaw.gif"),
    require("../assets/gifs/yeeey.gif"),
    require("../assets/gifs/skeletal.gif"),
  ];

  const arrayLength = Math.min(finishedTexts.length, gifs.length);
  const gifIndex = Math.floor(Math.random() * arrayLength);

  //Viewport width/height
  let deviceWidth = Dimensions.get("window").width;
  let deviceHeight = Dimensions.get("window").height;

  return (
    <BottomSheetView style={[styles.contentContainer, { flex: 1 }]}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-around",
          gap: 15,
        }}
      >
        <RoomBar showFloor={false}></RoomBar>
        <View style={[styles.gifWrap]}>
          <Image
            source={gifs[gifIndex]}
            style={{ width: deviceWidth / 2, height: deviceHeight / 5 }}
            resizeMode={"cover"}
          />
        </View>
        <View style={{ flex: 1, gap: 0, alignItems: "center" }}>
          <Text style={styles.defaultHeader}>You made it!</Text>
          <Text
            style={[styles.defaultText, { width: 300, textAlign: "center" }]}
          >
            Congratulations, you have reached your destination.
          </Text>
        </View>
        <View style={{ flex: 1, gap: 20, alignItems: "center" }}>
          <ButtonText color={customColors.green} action={onFinish}>
            {finishedTexts[gifIndex]}
          </ButtonText>
          <ButtonTextOnly
            action={() => {
              onClose();
              navigation.navigate("Navigation", {
                name: "Navigation",
                destination: destination,
              });
              console.log("Destination on Finish screen:", destination);
            }}
          >
            Back to Navigation
          </ButtonTextOnly>
        </View>
      </View>
    </BottomSheetView>
  );
};
