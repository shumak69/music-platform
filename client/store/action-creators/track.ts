import { DeleteResponse, TracksAction, TracksActionTypes } from "@/types/track";
import axios from "axios";
import { Dispatch } from "react";

export const fetchTracks = () => {
  return async (dispatch: Dispatch<TracksAction>) => {
    try {
      const response = await axios.get("https://music-platform-server-aw4a1q1qh-shumak69.vercel.app/tracks/");
      dispatch({ type: TracksActionTypes.FETCH_TRACKS, payload: response.data });
    } catch (error) {
      dispatch({ type: TracksActionTypes.FETCH_TRACKS_ERROR, payload: "Произошла ошибка при загрузке треков" });
    }
  };
};

export const searchTracks = (query: string) => {
  return async (dispatch: Dispatch<TracksAction>) => {
    try {
      const response = await axios.get(
        "https://music-platform-server-aw4a1q1qh-shumak69.vercel.app/tracks/search?query=" + query
      );
      dispatch({ type: TracksActionTypes.FETCH_TRACKS, payload: response.data });
    } catch (error) {
      dispatch({ type: TracksActionTypes.FETCH_TRACKS_ERROR, payload: "Произошла ошибка при загрузке треков" });
    }
  };
};
export const deleteTrack = (id: string) => {
  return async (dispatch: Dispatch<TracksAction>) => {
    try {
      const response = await axios.delete<DeleteResponse>(
        "https://music-platform-server-aw4a1q1qh-shumak69.vercel.app/tracks/" + id
      );
      dispatch({ type: TracksActionTypes.DELETE_TRACK, payload: response.data.trackId });
    } catch (error) {
      dispatch({ type: TracksActionTypes.FETCH_TRACKS_ERROR, payload: "Произошла ошибка при удалении трека" });
    }
  };
};
