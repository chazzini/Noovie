import React from "react";
import { FlatList, View } from "react-native";
import styled from "styled-components/native";
import Vmedia from "./VMedia";

const ListTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.bodyText};
  margin-left: 30px;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const ListContainer = styled.View``;

const VSeparator = () => <View style={{ width: 20 }} />;
const MovieKeyExtractor = (item) => item?.id.toString();

const HList = ({ data, title }) => {
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <FlatList
        horizontal
        contentContainerStyle={{ paddingHorizontal: 30 }}
        data={data}
        keyExtractor={MovieKeyExtractor}
        renderItem={({ item }) => {
          return (
            <Vmedia
              overview={item.overview}
              vote_average={item.vote_average}
              original_title={item.original_name ?? item.original_title}
              poster_path={item.poster_path}
              key={item.id}
              id={item.id}
              fullData={item}
            />
          );
        }}
        ItemSeparatorComponent={VSeparator}
      />
    </ListContainer>
  );
};

export default HList;
