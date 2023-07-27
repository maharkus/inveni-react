import { Colors, ThemeManager, Typography } from "react-native-ui-lib";
import { useFonts } from "expo-font";

export const initTheme = () => {
  const [loaded] = useFonts({
    WorksSans: require("./assets/fonts/WorkSans-VariableFont.ttf"),
    TTTravels: require("./assets/fonts/._-TTTravels-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  Colors.loadColors({
    dark: "#2B2D34",
    light: "#FFFFFF",
    orange: "#F98452",
    yellow: "#F9CB48",
    purple: "#C28CFC",
    UwU: "#8FC9FF",
    grey: "#EDEDED",
    softPurple: "#E0E3FF",
  });

  Typography.loadTypographies({
    h: {
      fontFamily: "TTTravels",
      fontSize: 32,
    },
    p: {
      fontFamily: "WorksSans",
      fontSize: 18,
      fontWeight: "400",
      lineHeight: 1,
    },
    tag: {
      fontFamily: "WorksSans",
      fontSize: 10,
      fontWeight: "600",
      lineHeight: 1,
    },
  });

  ThemeManager.setComponentTheme("Text", (props) => {
    return {
      p: true,
      dark: true,
      h: props.h,
      orange: props.orange,
    };
  });
};
