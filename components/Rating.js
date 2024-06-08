import React from "react";
import styled from "styled-components/native";

const Vote = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  margin-top: 5px;
`;

const Rating = ({ vote }) => {
  return <Vote>⭐ {Math.round(vote)}/10</Vote>;
};

export default Rating;
