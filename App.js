import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Asset } from "expo-asset";

import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";

import Root from "./navigations/Root";
import { useColorScheme } from "react-native";
import { lightTheme, darkTheme } from "./styled";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const queryClient = new QueryClient();
  const [apploading, setApploading] = useState(true);

  const isDark = useColorScheme() === "dark";

  useEffect(() => {
    const result = async function () {
      await Promise.all([
        Font.loadAsync(Ionicons.font),
        Asset.loadAsync(require("./assets/1.jpg")),
      ]);
    };

    setApploading(false);
  }, []);

  if (apploading) {
    SplashScreen.hideAsync();
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <Root />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
