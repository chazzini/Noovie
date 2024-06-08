import react, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  RefreshControl,
} from "react-native";
import { tvApi } from "../api";
import Loader from "../components/Loader";
import Vmedia from "../components/VMedia";
import HList from "../components/HList";

const TvScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const { data: trendingData, isLoading: trendingLoading } = useQuery({
    queryKey: ["tv", "trending"],
    queryFn: tvApi.trending,
  });

  const { data: topRatedgData, isLoading: topRatedgLoading } = useQuery({
    queryKey: ["tv", "top_rated"],
    queryFn: tvApi.topRated,
  });

  const { data: airingTodayData, isLoading: airingTodayLoading } = useQuery({
    queryKey: ["tv", "airing_today"],
    queryFn: tvApi.airingToday,
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["tv"]);
    setRefreshing(false);
  };

  const loading = trendingLoading && topRatedgLoading && airingTodayLoading;
  return loading ? (
    <Loader />
  ) : (
    <ScrollView
      contentContainerStyle={{ paddingVertical: 20 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <HList title="Airing Today" data={airingTodayData?.results} />
      <HList title="Trending Shows" data={trendingData?.results} />
      <HList title="Top Rated Shows" data={topRatedgData?.results} />
    </ScrollView>
  );
};

export default TvScreen;
