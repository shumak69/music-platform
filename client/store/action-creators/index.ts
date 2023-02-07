import * as PlayerActionCreators from "../action-creators/player";
import * as TrackActionCreators from "../action-creators/track";

const ActonCreator = {
  ...PlayerActionCreators,
  ...TrackActionCreators,
};

export default ActonCreator;
