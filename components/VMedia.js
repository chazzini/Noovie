import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import { Title } from "./Slide";
import Rating from "./Rating";
import { Touchable, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Movie = styled.View`
  height: 200px;
  align-items: center;
`;

const Vmedia = ({ poster_path, original_title, vote_average, fullData }) => {
  const navigation = useNavigation();

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
    <Movie>
      <TouchableOpacity onPress={goToDetails}>
        <Poster path={poster_path} />
        <Title>
          {original_title?.slice(0, 12)}
          {original_title?.length > 13 ? "..." : null}
        </Title>
        <Rating vote={vote_average} />
      </TouchableOpacity>
    </Movie>
  );
};

export default Vmedia;
