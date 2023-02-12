import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { Pause, PlayArrow, VolumeUp } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import axios from "axios";
import { ChangeEvent, useEffect, useRef } from "react";
import styles from "../styles/Player.module.scss";
import trackStyle from "../styles/tracks/TrackItem.module.scss";
import TrackProgressBar from "./TrackProgressBar";
import RepeatIcon from "@mui/icons-material/Repeat";
// let audio: HTMLAudioElement;

function Player() {
  const { pause, volume, active, currentTime, duration, audio } = useTypedSelector((state) => state.player);
  const { tracks } = useTypedSelector((state) => state.track);
  const { pauseTrack, playTrack, setVolume, setCurrentTime, setDuration, setAudio, setActiveTrack } = useActions();
  const isMounted = useRef(false);
  useEffect(() => {
    // console.log(document.querySelector("audio"));
    // console.log("audio = ", audio, " active = ", active);
    if (!audio) {
      setAudio(new Audio());
    } else if (isMounted.current && !pause) {
      console.log(pause);
      audioSettings();
      play();
    }
    isMounted.current = true;
    return () => {
      // audio?.pause();
    };
  }, [active]);

  function audioSettings() {
    if (active && audio) {
      audio.src = "http://localhost:3001/" + active.audio;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio!.duration));
      };
      audio.onended = () => {
        console.log("End");
        const currentTrackIndex = tracks.findIndex((value) => value._id === active._id);
        if (currentTrackIndex !== tracks.length - 1) {
          console.log("done!");
          setActiveTrack(tracks[currentTrackIndex + 1]);
          playTrack();
        }
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
      <RepeatIcon className={styles.repeat} />
    </div>
  );
}

export default Player;
