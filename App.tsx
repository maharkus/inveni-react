import "react-native-gesture-handler";
import { StyleSheet, useWindowDimensions } from "react-native";
import { useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./Pages/Home";
import { Test } from "./Pages/Test";
import { SettingsPage } from "./Pages/SettingsPage";

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

  return (
      <>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{title: 'Welcome'}}
              />
              <Stack.Screen name="SettingsPage" component={SettingsPage} />
              <Stack.Screen name="Profile" component={Test} />
            </Stack.Navigator>
          </NavigationContainer>
      </>
  );
}
