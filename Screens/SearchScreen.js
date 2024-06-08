import { useQuery } from "@tanstack/react-query";
import react, { useRef, useState } from "react";
import styled from "styled-components/native";
import { moviesApi, tvApi } from "../api";
import HList from "../components/HList";

const Container = styled.ScrollView`
  flex: 1;
`;

const Search = styled.TextInput`
  background-color: #fff;
  padding: 10px 20px;
  margin: 10px auto;
  width: 89%;
  border-radius: 10px;
`;

const SearchScreen = () => {
  const [query, setQuery] = useState("");

  const onChangeText = (text) => setQuery(text);
  const {
    isloading: movieLoading,
    data: movieData,
    refetch: movieRefetch,
  } = useQuery({
    queryKey: ["movie", query],
    queryFn: moviesApi.search,
    enabled: false,
  });
  const {
    isloading: tvLoading,
    data: tvData,
    refetch: tvRefetch,
  } = useQuery({
    queryKey: ["tv", query],
    queryFn: tvApi.search,
    enabled: false,
  });

  const onSubmit = () => {
    if (query === "") return;
    movieRefetch();
    tvRefetch();
  };

  return (
    <Container>
      <Search
        placeholder="Search for Movies or Tv Shows"
        placeholderTextColor="grey"
        keyboardType="web-search"
        returnKeyType="search"
        onChangeText={onChangeText}
        value={query}
        onSubmitEditing={onSubmit}
      />

      {movieData ? (
        <HList title="Movie Search" data={movieData.results} />
      ) : null}
      {tvData ? <HList title="Tv Search" data={tvData.results} /> : null}
    </Container>
  );
};

export default SearchScreen;
