import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SettingsPage } from "./Pages/SettingsPage";
import { Home } from "./Pages/Home";
import { Test } from "./Pages/Test";
import { initTheme } from "./styles/theme";
import { Navigation } from "./Pages/Navigation";

export default function App() {
  const Stack = createNativeStackNavigator();


  initTheme();

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
