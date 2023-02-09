import * as PlayerActionCreators from "../action-creators/player";
import * as TrackActionCreators from "../action-creators/track";
import * as FavoriteActionCreators from "../action-creators/favorite";

const ActonCreator = {
  ...PlayerActionCreators,
  ...TrackActionCreators,
  ...FavoriteActionCreators,
};

export default ActonCreator;
