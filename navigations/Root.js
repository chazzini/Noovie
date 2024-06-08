import react from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTab from "./BottomTab";
import Stack from "./Stack";
import { NavigationContainer } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import DetailsScreen from "../Screens/DetailsScreen";

const Nav = createStackNavigator();

const Root = () => {
  return (
    <NavigationContainer>
      <Nav.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Nav.Screen
          options={{ headerShown: false }}
          name="Tab"
          component={BottomTab}
        />
        <Nav.Screen name="Stack" component={Stack} />
      </Nav.Navigator>
    </NavigationContainer>
  );
};

export default Root;
