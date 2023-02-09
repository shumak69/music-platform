import { FavoriteAction, FavoriteActionTypes, ITrack } from "@/types/track";

export const setFavorite = (payload: ITrack): FavoriteAction => {
  return { type: FavoriteActionTypes.SET_FAVORITE_TRACK, payload };
};
export const removeFavorite = (payload: string): FavoriteAction => {
  return { type: FavoriteActionTypes.REMOVE_FAVORITE_TRACK, payload };
};
export const initFavorite = (payload: ITrack[]): FavoriteAction => {
  return { type: FavoriteActionTypes.INIT_FAVORITE_TRACK, payload };
};
