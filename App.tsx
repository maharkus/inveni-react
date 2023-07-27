import "react-native-gesture-handler";
import { StyleSheet, useWindowDimensions } from "react-native";
import { useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SettingsPage } from "./Pages/SettingsPage";
import { Home } from "./Pages/Home";
import { Test } from "./Pages/Test";
import { initTheme } from "./styles/theme";
import { Navigation } from "./Pages/Navigation";

export default function App() {
  const [darkmode, setDarkmode] = useState(false);
  const [device, setDevice] = useState(false);
  const { width } = useWindowDimensions();
  const [theme, setTheme] = useState("dim");
  const [isOpen, setIsOpen] = useState(false);

  const bottomSheetModalRef = useRef(null);

  const snapPoints = ["25%", "48%", "75%"];
  const Stack = createNativeStackNavigator();

  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
  }

  useEffect(() => {
    initTheme();
  });

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: "Welcome" }}
          />
          <Stack.Screen name="Profile" component={Test} />
          <Stack.Screen name="Navigation" component={Navigation} />
          <Stack.Screen name="SettingsPage" component={SettingsPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
