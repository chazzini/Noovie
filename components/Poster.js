import React from "react";
import { useColorScheme } from "react-native";
import styled from "styled-components/native";

export const PosterImage = styled.Image`
  height: 150px;
  width: 100px;
  border-radius: 10px;
`;

const Poster = ({ path }) => {
  return (
    <PosterImage
      source={{
        uri: `https://image.tmdb.org/t/p/w500${path}`,
      }}
    />
  );
};

export default Poster;
