export interface IComment {
  _id: string;
  username: string;
  text: string;
}

export interface ITrack {
  _id: string;
  name: string;
  artist: string;
  text: string;
  listens: number;
  picture: string;
  audio: string;
  comments: IComment[];
}

export interface TracksState {
  tracks: ITrack[];
  error: string;
}

export enum TracksActionTypes {
  FETCH_TRACKS = "FETCH_TRACKS",
  FETCH_TRACKS_ERROR = "FETCH_TRACKS_ERROR",
  DELETE_TRACK = "DELETE_TRACK",
}

export interface DeleteResponse {
  trackId: string;
  audio: string;
  picture: string;
}

interface FetchTracksAction {
  type: TracksActionTypes.FETCH_TRACKS;
  payload: ITrack[];
}
interface FetchTracksErrorAction {
  type: TracksActionTypes.FETCH_TRACKS_ERROR;
  payload: string;
}
interface DeleteTrackAction {
  type: TracksActionTypes.DELETE_TRACK;
  payload: string;
}

export type TracksAction = FetchTracksAction | FetchTracksErrorAction | DeleteTrackAction;

export enum FavoriteActionTypes {
  SET_FAVORITE_TRACK = "SET_FAVORITE_TRACK",
  REMOVE_FAVORITE_TRACK = "REMOVE_FAVORITE_TRACK",
  INIT_FAVORITE_TRACK = "INIT_FAVORITE_TRACK",
}

export interface FavoriteTracks {
  favoriteTracks: ITrack[];
}

interface SetFavoriteTracks {
  type: FavoriteActionTypes.SET_FAVORITE_TRACK;
  payload: ITrack;
}
interface RemoveFavoriteTracks {
  type: FavoriteActionTypes.REMOVE_FAVORITE_TRACK;
  payload: string;
}
interface InitFavoriteTracks {
  type: FavoriteActionTypes.INIT_FAVORITE_TRACK;
  payload: ITrack[];
}

export type FavoriteAction = SetFavoriteTracks | RemoveFavoriteTracks | InitFavoriteTracks;
