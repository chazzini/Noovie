import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import { Overview, Title } from "./Slide";
import Rating from "./Rating";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Movie = styled.View`
  padding: 0 30px;
  flex-direction: row;
  justify-content: space-between;
  align-items: space-between;
  flex: 1;
`;

const HColumn = styled.View`
  padding: 0 10px;
  flex: 1;
`;

const ReleaseDate = styled(Overview)``;

const HMedia = ({
  poster_path,
  original_title,
  release_date,
  overview,
  vote_average,
  fullData,
}) => {
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
    <TouchableOpacity onPress={goToDetails}>
      <Movie>
        <Poster path={poster_path} />
        <HColumn>
          <Title>{original_title}</Title>
          <ReleaseDate>
            {new Date(release_date).toLocaleDateString("en")}
          </ReleaseDate>
          <Overview>{overview?.slice(0, 80)}...</Overview>
          <Rating vote={vote_average} />
        </HColumn>
      </Movie>
    </TouchableOpacity>
  );
};

export default HMedia;
