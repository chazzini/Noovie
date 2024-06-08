const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjdiNjI5MDYwMDEzNjg5YTc0OTdlYWRhOGU4YTVlOSIsInN1YiI6IjYzMjg3ZmRlNTM4NjZlMDA4ZjA1OGZjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SVZTdys9EpSDSl5TzQaMNHVcUX1gWtfprsQRWdpj-9Q";
const BASE_URL = `https://api.themoviedb.org/3`;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer  ${API_TOKEN}`,
  },
};

export const tvApi = {
  trending: async () =>
    await fetch(`${BASE_URL}/trending/tv/week`, options).then((response) =>
      response.json()
    ),
  topRated: async () =>
    await fetch(`${BASE_URL}/tv/top_rated`, options).then((response) =>
      response.json()
    ),
  airingToday: async () =>
    await fetch(
      `${BASE_URL}/tv/airing_today?language=en-US&page=1`,
      options
    ).then((response) => response.json()),
  search: async ({ queryKey }) => {
    const [_, query] = queryKey;
    return await fetch(`${BASE_URL}/search/tv?query=${query}`, options).then(
      (response) => response.json()
    );
  },
  detail: async ({ queryKey }) => {
    const [_, id] = queryKey;
    return await fetch(
      `${BASE_URL}/tv/${id}?append_to_response=videos,image`,
      options
    ).then((response) => response.json());
  },
};

export const moviesApi = {
  nowplaying: async () =>
    await fetch(`${BASE_URL}/movie/now_playing`, options).then((response) =>
      response.json()
    ),
  trending: async () =>
    await fetch(`${BASE_URL}/trending/all/week`, options).then((response) =>
      response.json()
    ),
  upcomming: async (pageParam) => {
    return await fetch(
      `${BASE_URL}/movie/upcoming?page=${pageParam}`,
      options
    ).then((response) => response.json());
  },
  search: async ({ queryKey }) => {
    const [_, query] = queryKey;
    return await fetch(
      `${BASE_URL}/search/movie?query=${query}&include_adult=true`,
      options
    ).then((response) => response.json());
  },
  detail: async ({ queryKey }) => {
    const [_, id] = queryKey;
    return await fetch(
      `${BASE_URL}/movie/${id}?append_to_response=videos,image`,
      options
    ).then((response) => response.json());
  },
};
