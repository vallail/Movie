const API_KEY = "09e2d754b6f5eec539527ad55d4d3d47";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const responseBody = await response.json();
  console.log(responseBody);
  return responseBody.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  const responseBody = await response.json();
  return responseBody.results;
};
