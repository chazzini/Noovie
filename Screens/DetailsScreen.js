import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Dimensions, Linking, StyleSheet, Text, Share } from "react-native";
import Poster from "../components/Poster";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery } from "@tanstack/react-query";
import { moviesApi, tvApi } from "../api";
import Loader from "../components/Loader";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrower from "expo-web-browser";
import { TouchableOpacity } from "react-native-gesture-handler";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBackgroundColor};
  flex: 1;
`;
const Wrapper = styled.View`
  width: 100%;
  height: ${(props) => SCREEN_HEIGHT / 4 + "px"};
  position: relative;
  background-color: #eee;
  flex-direction: row;
  align-items: flex-end;
`;
const ImageBackground = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Overview = styled.Text`
  color: #fff;
  opacity: 0.8;
  padding: 20px 20px;
`;
const Column = styled.View`
  padding: 0 20px;
  flex-direction: row;
  align-items: flex-end;
`;

const Title = styled.Text`
  color: #fff;
  font-weight: 600;
  font-size: 30px;
  width: 80%;
  padding: 0 20px;
`;

const Video = styled.TouchableOpacity`
  padding: 0 20px;
  flex-direction: row;
  padding-top: 10px;
`;

const VideoButton = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: normal;
  line-height: 26px;
`;
const DetailsScreen = ({ navigation: { navigate, setOptions }, route }) => {
  const { movie } = route.params || {};

  const isMovie = !!movie.original_title;

  const { isLoading, data } = useQuery({
    queryKey: [isMovie ? "movie" : "tv", movie.id],
    queryFn: isMovie ? moviesApi.detail : tvApi.detail,
  });

  const ShareButton = () => {
    return (
      <TouchableOpacity
        onPress={async () => {
          await Share.share({
            message: movie.overview,
            title: movie.original_name ?? movie.original_title,
          });
        }}
      >
        <Ionicons
          name="share-social"
          size={18}
          style={{ color: "#fff", margin: 10 }}
        />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setOptions({
      title: movie.original_title ? "Movie" : "TV Show",
      headerRight: () => <ShareButton />,
    });
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <Container>
      <Wrapper>
        <ImageBackground
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
          }}
          resizeMode="cover"
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={movie.poster_path} style={{ marginLeft: 20 }} />
          <Title>{movie.original_title ?? movie.original_name}</Title>
        </Column>
      </Wrapper>
      <Overview>{movie.overview}</Overview>
      <Text
        style={{ marginLeft: 20, color: "#fff" }}
        onPress={() => Linking.openURL(data.homepage)}
      >
        <Ionicons name="globe" size={26}></Ionicons> Homepage online
      </Text>
      {data.videos
        ? data.videos.results.map((video) => {
            console.log(video);
            return (
              <Video
                onPress={async (video) => {
                  await WebBrower.openBrowserAsync(
                    `https://m.youtube.com/watch?v=${video.key}`
                  );
                }}
                key={video.id}
              >
                <Ionicons
                  name="logo-youtube"
                  size={26}
                  style={{ marginRight: 20, color: "#fff" }}
                />
                <VideoButton>{video.name}</VideoButton>
              </Video>
            );
          })
        : null}
    </Container>
  );
};

export default DetailsScreen;
