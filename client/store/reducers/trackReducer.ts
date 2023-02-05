import { TracksAction, TracksActionTypes, TracksState } from "@/types/track";

const initialState: TracksState = {
  tracks: [],
  error: "",
};

export const trackReducer = (state = initialState, action: TracksAction): TracksState => {
  switch (action.type) {
    case TracksActionTypes.FETCH_TRACKS_ERROR:
      return { ...state, error: action.payload };
    case TracksActionTypes.FETCH_TRACKS:
      return { error: "", tracks: action.payload };
    default:
      return state;
  }
};
