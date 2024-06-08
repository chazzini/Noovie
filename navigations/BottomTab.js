import react from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TvScreen from "../Screens/TvScreen";
import MovieScreen from "../Screens/MovieScreen";
import SearchScreen from "../Screens/SearchScreen";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const isDark = useColorScheme() == "dark";
  return (
    <Tab.Navigator
      initialRouteName="Movie"
      sceneContainerStyle={{
        backgroundColor: isDark ? "black" : "white",
      }}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? "black" : "white",
        },
        tabBarLabelStyle: {
          borderBottomWidth: 2,
        },
        tabBarActiveTintColor: "#f39c12",

        tabBarInactiveTintColor: "#95a5a6",
        headerStyle: {
          backgroundColor: isDark ? "black" : "white",
        },
        headerTitleStyle: {
          color: isDark ? "white" : "#2c3e50",
        },
        headerTitleAlign: "center",
      }}
    >
      <Tab.Screen
        name="Movie"
        component={MovieScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="film-outline" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Tv"
        component={TvScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="tv-outline" color={color} size={size} />;
          },
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="search-outline" color={color} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
