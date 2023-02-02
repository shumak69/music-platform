import { ITrack } from "@/types/track";
import { Pause, PlayArrow, VolumeUp } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import styles from "../styles/Player.module.scss";
import trackStyle from "../styles/tracks/TrackItem.module.scss";
import TrackProgressBar from "./TrackProgressBar";
function Player() {
  const track: ITrack = {
    _id: "1",
    name: "Трек 1",
    artist: "Artist 1",
    text: "Some text",
    listens: 5,
    audio: "http://localhost:3001/audio/245f49db-4963-4cb6-8522-f72a9e49fd5e.mp3",
    picture: "http://localhost:3001/image/1d95c1f5-d468-4411-920a-5cf4266c53fa.jpg",
    comments: [],
  };
  const active = false;
  return (
    <div className={styles.player}>
      <IconButton onClick={(e) => e.stopPropagation()}>{active ? <Pause /> : <PlayArrow />}</IconButton>
      <Grid container direction="column" className={trackStyle.container}>
        <div>{track.name}</div>
        <div className={trackStyle.artist}>{track.artist}</div>
      </Grid>
      <TrackProgressBar currentTime={0} duration={23} onChange={() => {}} />
      <VolumeUp className={styles.volumeUp} />
      <TrackProgressBar currentTime={0} duration={23} onChange={() => {}} />
    </div>
  );
}

export default Player;
