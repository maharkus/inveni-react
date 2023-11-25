import { Image, View } from "react-native";
import { customColors, styles } from "../styles/styles";
import * as React from "react";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import ButtonTextAndIcon from "../components/ButtonTextAndIcon";
import { NavPath } from "../components/NavigationPath";
import { ButtonTextOnly } from "../components/ButtonTextOnly";
import RoomBar from "../components/RoomBar";
import { useDispatch, useSelector } from "react-redux";
import {setCurrentFloor, setGoBack, setIsScreenFinish, setSheetState} from "../states/slice";
import { RootState } from "../states/store";

export const Navigation = ({ navigation }) => {
  const dispatch = useDispatch();
  const destination = useSelector(
    (state: RootState) => state.counter.destination
  );
  const currentFloor = useSelector(
    (state: RootState) => state.counter.currentFloor
  );

  //map dimensions
  const contentWidth = 1500;
  const contentHeight = 1650;

  //next button functionality
  const handleNextStep = () => {
    if (currentFloor < destination.etage) {
      dispatch(setCurrentFloor(currentFloor + 1));
    } else if (currentFloor === destination.etage) {
      dispatch(setCurrentFloor(0));
      dispatch(setSheetState(1));
      dispatch(setIsScreenFinish(true));
      navigation.navigate("Home", {
        name: "Home",
      });
    }
  };

  //back button functionality
  const handlePrevStep = () => {
    if (currentFloor > 0) {
      dispatch(setCurrentFloor(currentFloor - 1));
    }
  };

  const buttonWidth = "45%";

  return (
    <>
      <View style={{ flex: 1, alignItems: "center", top: 30 }}>
        <RoomBar />
      </View>

      <View style={styles.campusWrap}>
        <ReactNativeZoomableView
          maxZoom={3}
          minZoom={0.3}
          zoomStep={0.1}
          initialZoom={0.4}
          visualTouchFeedbackEnabled={false}
          contentWidth={contentWidth}
          contentHeight={contentHeight}
          panBoundaryPadding={100}
        >
          {destination.category == 0 && (
            <Image
              source={require("../assets/buildings/L1.jpg")}
              resizeMethod={"resize"}
              progressiveRenderingEnabled={true}
              style={{ width: contentWidth, height: contentHeight, flex: 1 }}
            />
          )}
          {destination.category == 1 && (
            <>
              {currentFloor == 0 && (
                <Image
                  source={require("../assets/buildings/L2E00.jpg")}
                  resizeMethod={"resize"}
                  progressiveRenderingEnabled={true}
                  style={{ width: contentWidth, height: contentHeight }}
                />
              )}
              {currentFloor == 1 && (
                <Image
                  source={require("../assets/buildings/L2E01.jpg")}
                  resizeMethod={"resize"}
                  progressiveRenderingEnabled={true}
                  style={{ width: contentWidth, height: contentHeight }}
                />
              )}
            </>
          )}
          {destination.category == 2 && (
            <>
              {currentFloor == 0 && (
                <Image
                  source={require("../assets/buildings/L3E00.jpg")}
                  resizeMethod={"resize"}
                  progressiveRenderingEnabled={true}
                  style={{ width: contentWidth, height: contentHeight }}
                />
              )}
              {currentFloor == 1 && (
                <Image
                  source={require("../assets/buildings/L3E01.jpg")}
                  resizeMethod={"resize"}
                  progressiveRenderingEnabled={true}
                  style={{ width: contentWidth, height: contentHeight }}
                />
              )}
              {currentFloor == 2 && (
                <Image
                  source={require("../assets/buildings/L3E02.jpg")}
                  resizeMethod={"resize"}
                  progressiveRenderingEnabled={true}
                  style={{ width: contentWidth, height: contentHeight }}
                />
              )}
            </>
          )}
          {destination.category == 3 && (
            <>
              {currentFloor == 0 && (
                <Image
                  source={require("../assets/buildings/L4E00.jpg")}
                  resizeMethod={"resize"}
                  progressiveRenderingEnabled={true}
                  style={{ width: contentWidth, height: contentHeight }}
                />
              )}
              {currentFloor == 1 && (
                <Image
                  source={require("../assets/buildings/L4E01.jpg")}
                  resizeMethod={"resize"}
                  progressiveRenderingEnabled={true}
                  style={{ width: contentWidth, height: contentHeight }}
                />
              )}
              {currentFloor == 2 && (
                <Image
                  source={require("../assets/buildings/L4E02.jpg")}
                  resizeMethod={"resize"}
                  progressiveRenderingEnabled={true}
                  style={{ width: contentWidth, height: contentHeight }}
                />
              )}
            </>
          )}
          {destination.category == 4 && (
            <>
              <Image
                source={require("../assets/buildings/IQL.jpg")}
                resizeMethod={"resize"}
                progressiveRenderingEnabled={true}
                style={{ width: contentWidth, height: contentHeight }}
              />
            </>
          )}
          <NavPath destination={destination} currentFloor={currentFloor} />
        </ReactNativeZoomableView>

        <View style={[styles.bottomNav, styles.bottomNavBackNext]}>
          <>
            {currentFloor == 0 && (
              <>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <ButtonTextAndIcon
                    isLeft={true}
                    color={customColors.grey}
                    isActive={true}
                    imageSource={require("../assets/icons/chevronLeft.png")}
                    w={12}
                    h={24}
                    action={() => handlePrevStep()}
                    customStyle={{ width: buttonWidth, maxWidth: buttonWidth }}
                  >
                    Back
                  </ButtonTextAndIcon>
                  <ButtonTextAndIcon
                    color={
                      currentFloor < destination.etage
                        ? customColors.orange
                        : customColors.green
                    }
                    isActive={false}
                    imageSource={require("../assets/icons/chevronRight.png")}
                    w={12}
                    h={24}
                    action={() => handleNextStep()}
                    customStyle={{ width: buttonWidth, maxWidth: buttonWidth }}
                  >
                    {currentFloor < destination.etage ? "Next" : "Finish"}
                  </ButtonTextAndIcon>
                </View>
              </>
            )}
            {currentFloor > 0 && (
              <>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <ButtonTextAndIcon
                    isLeft={true}
                    color={customColors.orange}
                    isActive={false}
                    imageSource={require("../assets/icons/chevronLeft.png")}
                    w={12}
                    h={24}
                    action={() => handlePrevStep()}
                    customStyle={{ width: buttonWidth, maxWidth: buttonWidth }}
                  >
                    Back
                  </ButtonTextAndIcon>
                  <ButtonTextAndIcon
                    color={
                      currentFloor < destination.etage
                        ? customColors.orange
                        : customColors.green
                    }
                    isActive={false}
                    imageSource={require("../assets/icons/chevronRight.png")}
                    w={12}
                    h={24}
                    action={() => handleNextStep()}
                    customStyle={{ width: buttonWidth, maxWidth: buttonWidth }}
                  >
                    {currentFloor < destination.etage ? "Next" : "Finish"}
                  </ButtonTextAndIcon>
                </View>
              </>
            )}
          </>
          <ButtonTextOnly
            action={() => {
              dispatch(setCurrentFloor(0));
              dispatch(setIsScreenFinish(false));
              dispatch(setSheetState(-1));
              navigation.navigate("Home", {
                name: "Home",
              });
            }}
          >
            End Navigation
          </ButtonTextOnly>
        </View>
      </View>
    </>
  );
};
