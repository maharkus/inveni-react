import { Colors, ThemeManager, Typography } from "react-native-ui-lib";

export const initTheme = () => {
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
      fontSize: 32,
    },
    p: {
      fontSize: 18,
      fontWeight: "400",
      lineHeight: 1,
    },
    tag: {
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
