import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { Pause, PlayArrow, VolumeUp } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import axios from "axios";
import { ChangeEvent, useEffect } from "react";
import styles from "../styles/Player.module.scss";
import trackStyle from "../styles/tracks/TrackItem.module.scss";
import TrackProgressBar from "./TrackProgressBar";

// let audio: HTMLAudioElement;

function Player() {
  const { pause, volume, active, currentTime, duration, audio } = useTypedSelector((state) => state.player);
  const { pauseTrack, playTrack, setVolume, setCurrentTime, setDuration, setAudio } = useActions();

  useEffect(() => {
    // console.log(document.querySelector("audio"));
    // console.log("audio = ", audio, " active = ", active);
    if (!audio) {
      // audio = new Audio();
      setAudio(new Audio());
    } else {
      audioSettings();
      play();
    }
    return () => {
      audio?.pause();
    };
  }, [active]);

  function audioSettings() {
    if (active && audio) {
      audio.src = "http://localhost:3001/" + active.audio;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio!.duration));
      };
      audio.ontimeupdate = () => {
        if (audio!.currentTime >= audio!.duration) {
          axios.post("http://localhost:3001/tracks/listen/" + active!._id);
        }
        setCurrentTime(Math.ceil(audio!.currentTime));
        // console.log(audio.currentTime, audio.duration);
      };
    }
  }

  const play = () => {
    if (pause) {
      playTrack();
      audio!.pause();
    } else {
      pauseTrack();
      audio!.play();
    }
  };

  function changeVolume(e: ChangeEvent<HTMLInputElement>): void {
    setVolume(+e.target.value);
    audio!.volume = +e.target.value / 100;
  }
  function changeCurrentTime(e: ChangeEvent<HTMLInputElement>): void {
    audio!.play();
    setCurrentTime(+e.target.value);
    audio!.currentTime = +e.target.value;
  }

  console.log(active);
  if (!active) {
    return null;
  }

  return (
    <div className={styles.player}>
      <IconButton onClick={play}>
        {pause ? <Pause className={styles.color} /> : <PlayArrow className={styles.color} />}
      </IconButton>
      <Grid container direction="column" className={trackStyle.container}>
        <div className={styles.trackName}>{active?.name}</div>
        <div className={styles.artist}>{active?.artist}</div>
      </Grid>
      <TrackProgressBar currentTime={currentTime} duration={duration} onChange={changeCurrentTime} audio />
      <VolumeUp className={styles.volumeUp} />
      <TrackProgressBar currentTime={volume} duration={100} onChange={changeVolume} />
    </div>
  );
}

export default Player;
