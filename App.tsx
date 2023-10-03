import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SettingsPage } from "./pages/SettingsPage";
import { Home } from "./pages/Home";
import { Navigation } from "./pages/Navigation";
import * as Font from 'expo-font';
import {useEffect, useState} from "react";
import store from "./states/store";
import {Provider} from "react-redux";

export default function App() {
    const Stack = createNativeStackNavigator();
    const [isFontLoaded, setIsFontLoaded] = useState(false);


    useEffect(() => {
        const loadFont = async () => {
            await Font.loadAsync({
                'Accelerator': require('./assets/fonts/accelerator.ttf'),
                'Work Sans': require('./assets/fonts/WorkSans.ttf'),
                'Work Sans Bold': require('./assets/fonts/WorkSansBold.ttf'),
            });

            setIsFontLoaded(true);
        };

        loadFont().then(r => "");
    }, []);

    if (!isFontLoaded) {
        // You can show a loading screen or fallback text here while the font is being loaded
        return null;
    }

    return (
        <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false}}
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
