import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SettingsPage } from "./Pages/SettingsPage";
import { Home } from "./Pages/Home";
import { Test } from "./Pages/Test";
import { initTheme } from "./styles/theme";
import { Navigation } from "./Pages/Navigation";
import * as Font from 'expo-font';
import { useEffect } from "react";

export default function App() {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    initTheme(); 
    async function loadFonts() {
      await Font.loadAsync({
        "WorkSans": require("./assets/fonts/WorkSans.ttf"),
        "accelerator": require("./assets/fonts/accelerator.ttf"),
      });
    }
    loadFonts(); [];
  });

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={Test}
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
    </>
  );
}
