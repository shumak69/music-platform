import { FavoriteAction, FavoriteActionTypes, FavoriteTracks } from "@/types/track";
import { parseFromLS } from "@/utils";

// let item;

// if (typeof window !== "undefined") {
//   // Perform localStorage action
//   item = localStorage.getItem("favorites");
// }

const initialState: FavoriteTracks = {
  favoriteTracks: [],
};

export const favoriteReducer = (state = initialState, action: FavoriteAction): FavoriteTracks => {
  switch (action.type) {
    case FavoriteActionTypes.SET_FAVORITE_TRACK:
      return { favoriteTracks: [...state.favoriteTracks, action.payload] };
    case FavoriteActionTypes.REMOVE_FAVORITE_TRACK:
      return { favoriteTracks: state.favoriteTracks.filter((item) => item._id !== action.payload) };
    case FavoriteActionTypes.INIT_FAVORITE_TRACK:
      return { favoriteTracks: action.payload };
    default:
      return state;
  }
};
