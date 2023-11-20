import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SettingsPage } from "./pages/SettingsPage";
import { Home } from "./pages/Home";
import { Navigation } from "./pages/Navigation";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import store from "./states/store";
import { Provider } from "react-redux";
import SplashScreen from "./components/SplashScreen";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {

    //load fonts asynchronously
    async function loadFonts() {
      await Font.loadAsync({
        Accelerator: require("./assets/fonts/accelerator.ttf"),
        TTTravels: require("./assets/fonts/tt-travels-next-trial-black.ttf"),
        "Work Sans": require("./assets/fonts/WorkSans.ttf"),
        "Work Sans Bold": require("./assets/fonts/WorkSansBold.ttf"),
      });
      setIsFontLoaded(true);
    }
    
    loadFonts()
      .then((r) => "")
      .catch(function (error) {
        console.log(error);
      });

    const SplashScreenPeriod = async () => {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve("result");
        }, 1500)
      );
    };

    const loadApp = async () => {
      const data = await SplashScreenPeriod();

      if (data !== null) {
        setIsAppReady(true);
      }
    };

    loadApp();
  }, []);

  //wait for fonts to load
  if (!isFontLoaded) {
    return null;
  }

  //if app not ready keep splash screen
  if (!isAppReady) {
    return <SplashScreen />;
  } else {
    return (
        <Provider store={store}>
          <StatusBar style="dark" />
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Navigation"
                component={Navigation}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SettingsPage"
                component={SettingsPage}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
    );
  }
}
