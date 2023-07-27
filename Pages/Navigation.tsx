import { View, TextField, Text, Button } from "react-native-ui-lib";
import { styles } from "../styles/styles";

export const Navigation = ({ navigation, route }) => {
  return (
    <>
      <View style={styles.contentContainer}>
        <View paddingH-25 paddingT-120>
          <Text text50>Navigation Page {route.params.name}</Text>
          <TextField text50 placeholder="username" grey10 />
          <TextField text50 placeholder="password" secureTextEntry grey10 />
          <View marginT-100 center>
            <Button text70 white background-orange30 label="Login" />
            <Button link text70 orange30 label="Sign Up" marginT-20 />
          </View>
        </View>
      </View>
    </>
  );
};
