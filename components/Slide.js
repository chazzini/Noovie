import React from "react";
import { BlurView } from "expo-blur";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import Poster from "./Poster";
import Rating from "./Rating";

import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

export const View = styled.View`
  flex: 1;
`;

export const BgImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const PosterImage = styled.Image`
  height: 90%;
  width: 30%;
  border-radius: 10px;
`;
export const Wrapper = styled.View`
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Column = styled.View`
  padding-left: 20px;
  width: 48%;
  align-items: top;
`;

export const Title = styled.Text`
  font-weight: bold;
  color: ${(props) => props.theme.bodyText};
  font-size: 16px;
`;

export const Overview = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  margin-top: 10px;
`;

const Slide = ({
  path,
  poster_path,
  overview,
  original_title,
  vote_average,
  fullData,
}) => {
  const navigation = useNavigation();
  const isDark = useColorScheme() === "dark";

  const goToDetails = () => {
    navigation.navigate("Stack", {
      screen: "detial",
      params: {
        title: original_title,
        movie: fullData,
      },
    });
  };

  return (
    <View>
      <TouchableOpacity onPress={goToDetails} style={{ flex: 1 }}>
        <BgImage
          source={path}
          style={StyleSheet.absoluteFill}
          onError={(error) => console.error(error)}
        />
        <BlurView
          intensity={35}
          tint={isDark ? "dark" : "default"}
          style={StyleSheet.absoluteFill}
          experimentalBlurMethod="dimezisBlurView"
        >
          <Wrapper>
            <Poster path={poster_path} />
            <Column>
              <Title isDark>{original_title}</Title>
              <Rating vote={vote_average} />
              <Overview>{overview.slice(0, 100)}...</Overview>
            </Column>
          </Wrapper>
        </BlurView>
      </TouchableOpacity>
    </View>
  );
};

export default Slide;
