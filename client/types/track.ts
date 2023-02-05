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
}

interface FetchTracksAction {
  type: TracksActionTypes.FETCH_TRACKS;
  payload: ITrack[];
}
interface FetchTracksErrorAction {
  type: TracksActionTypes.FETCH_TRACKS_ERROR;
  payload: string;
}

export type TracksAction = FetchTracksAction | FetchTracksErrorAction;
