import { Colors, ThemeManager, Typography } from "react-native-ui-lib";

export const initTheme = () => {


  Colors.loadColors({
    dark: "#2B2D34",
    light: "#FFFFFF",
    orange: "#F98452",
    yellow: "#F9CB48",
    purple: "#C28CFC",
    uwu: "#8FC9FF",
    grey: "#EDEDED",
    softPurple: "#E0E3FF",
  });

  Typography.loadTypographies({
    h: {
      fontSize: 24,
      fontFamily: "accelerator",
    },
    p: {
      fontSize: 18,
      fontWeight: "400",
      fontFamily: "WorkSans",
    },
    tag: {
      fontSize: 10,
      fontWeight: "600",
    },
  });

  //Text Theme
  ThemeManager.setComponentTheme("Text", (props) => {
    return {
      //font attributes
      //default:
      p: true,

      //Overrides (like tailwind)
      h: props.h,
      tag: props.tag,

      //color attributes
      //default:
      dark: true,

      //Overrides (like tailwind)
      light: props.light,
      orange: props.orange,
      yellow: props.yellow,
      purple: props.purple,
      uwu: props.uwu,
      grey: props.grey,
      softPurple: props.softPurple,
    };
  });

  //Button Theme
  ThemeManager.setComponentTheme("Button", (props, context) => {
    return {
      color: Colors.dark,
      borderRadius: 9999,
      backgroundColor: Colors.orange,
      fontSize: 24,
      fontFamily: "accelerator",
      margin: 20,
    };
  });
}
