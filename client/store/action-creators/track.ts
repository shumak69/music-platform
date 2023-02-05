import { TracksAction, TracksActionTypes } from "@/types/track";
import axios from "axios";
import { Dispatch } from "react";

export const fetchTracks = () => {
  return async (dispatch: Dispatch<TracksAction>) => {
    try {
      const response = await axios.get("http://localhost:3001/tracks");
      dispatch({ type: TracksActionTypes.FETCH_TRACKS, payload: response.data });
    } catch (error) {
      dispatch({ type: TracksActionTypes.FETCH_TRACKS_ERROR, payload: "Произошла ошибка при загрузке треков" });
    }
  };
};

export const searchTracks = (query: string) => {
  return async (dispatch: Dispatch<TracksAction>) => {
    try {
      const response = await axios.get("http://localhost:3001/tracks/search?query=" + query);
      dispatch({ type: TracksActionTypes.FETCH_TRACKS, payload: response.data });
    } catch (error) {
      dispatch({ type: TracksActionTypes.FETCH_TRACKS_ERROR, payload: "Произошла ошибка при загрузке треков" });
    }
  };
};
