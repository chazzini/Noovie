import react, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Dimensions, RefreshControl, View } from "react-native";
import Swiper from "react-native-swiper";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import Slide from "../components/Slide";
import Vmedia from "../components/VMedia";
import HMedia from "../components/HMedia";
import { moviesApi } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";

const Container = styled.FlatList`
  background-color: ${(props) => props.theme.mainBackgroundColor};
  padding-bottom: 200px;
`;

const ListTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.bodyText};
  margin-left: 30px;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const TrendingScroll = styled.FlatList`
  margin-bottom: 20px;
`;
const ComingSoon = styled.FlatList`
  margin-bottom: 20px;
`;

const MovieScreen = ({ navigation: { navigate } }) => {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const { isLoading: isLoadingNowPlaying, data: nowPlayingData } = useQuery({
    queryKey: ["movies", "nowplaying"],
    queryFn: moviesApi.nowplaying,
  });
  const {
    isLoading: isLoadingUpcomming,
    data: upcommingData,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["movies", "upcomming"],
    queryFn: ({ pageParam = 1 }) => moviesApi.upcomming(pageParam),
    getNextPageParam: (currentPage) => {
      if (currentPage.page + 1 > currentPage.total_pages) {
        return null;
      }
      return currentPage.page + 1;
    },
  });
  const { isLoading: isLoadingTrending, data: trendingData } = useQuery({
    queryKey: ["movies", "trending"],
    queryFn: moviesApi.trending,
  });

  const loadmore = () => {
    if (hasNextPage) fetchNextPage();
  };

  const { height: SCREEN_HEIGHT } = Dimensions.get("window");

  const HMediRender = ({ item }) => {
    return (
      <HMedia
        overview={item.overview}
        vote_average={item.vote_average}
        original_title={item.original_title}
        poster_path={item.poster_path}
        key={item.id}
        release_date={item.release_date}
        fullData={item}
      />
    );
  };

  const VmediaRender = ({ item }) => {
    return (
      <Vmedia
        overview={item.overview}
        vote_average={item.vote_average}
        original_title={item.original_title}
        poster_path={item.poster_path}
        key={item.id}
      />
    );
  };

  const HSeparator = () => <View style={{ height: 20 }} />;

  const MovieKeyExtractor = (item) => item?.id.toString();

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };

  const isloading =
    isLoadingNowPlaying || isLoadingTrending || isLoadingUpcomming;

  return isloading ? (
    <Loader />
  ) : (
    <Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      containerStyle={{
        flex: 1,
        overflow: "hidden",
      }}
      ListHeaderComponent={
        <>
          {nowPlayingData && (
            <Swiper
              horizontal
              containerStyle={{
                flex: 1,
                width: "100%",
                height: SCREEN_HEIGHT / 4,
                marginBottom: 20,
              }}
              autoplay
              autoplayTimeout={3.5}
              loop
              showsButtons={false}
              showsPagination={false}
            >
              {nowPlayingData?.results?.map((movie) => {
                const path = {
                  uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
                };
                return (
                  <Slide
                    overview={movie.overview}
                    vote_average={movie.vote_average}
                    original_title={movie.original_title}
                    poster_path={movie.poster_path}
                    path={path}
                    key={movie.id}
                    fullData={movie}
                  />
                );
              })}
            </Swiper>
          )}
          <HList title="Trending Movies" data={trendingData?.results} />

          <ListTitle>Comming Soon</ListTitle>
          <ComingSoon
            showsVerticalScrollIndicator
            indicatorStyle={{ backgroundColor: "#fff" }}
            onEndReached={loadmore}
            onEndReachedThreshold={0.6}
            data={upcommingData?.pages.map((page) => page.results).flat()}
            keyExtractor={MovieKeyExtractor}
            renderItem={HMediRender}
            ItemSeparatorComponent={HSeparator}
          />
        </>
      }
    />
  );
};

export default MovieScreen;
