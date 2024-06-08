import react from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DetailsScreen from "../Screens/DetailsScreen";
import { useColorScheme } from "react-native";

const Nav = createStackNavigator();

const Stack = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <Nav.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? "black" : "white",
        },
        headerTitleAlign: "center",

        headerTitleStyle: {
          color: isDark ? "white" : "black",
        },
      }}
    >
      <Nav.Screen name="detial" component={DetailsScreen} />
    </Nav.Navigator>
  );
};

export default Stack;
