import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SettingsPage } from "./Pages/SettingsPage";
import { Home } from "./Pages/Home";
import { Navigation } from "./Pages/Navigation";
import * as Font from 'expo-font';
import { useEffect } from "react";
import {View} from "react-native";

export default function App() {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    //initTheme();
    async function loadFonts() {
      await Font.loadAsync({
        "Work Sans": require("./assets/fonts/WorkSans.ttf"),
        "accelerator": require("./assets/fonts/accelerator.ttf"),
      });
    }
    loadFonts(); [];
  });

  return (
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
  );
}
