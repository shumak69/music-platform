import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { Pause, PlayArrow, VolumeUp } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import axios from "axios";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import styles from "../styles/Player.module.scss";
import trackStyle from "../styles/tracks/TrackItem.module.scss";
import TrackProgressBar from "./TrackProgressBar";
import RepeatIcon from "@mui/icons-material/Repeat";
import { ITrack } from "@/types/track";
import { useRouter } from "next/router";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
function Player() {
  const router = useRouter();
  const { pause, volume, active, currentTime, duration, audio, repeat } = useTypedSelector(
    (state) => state.player
  );
  const { tracks } = useTypedSelector((state) => state.track);
  const { favoriteTracks } = useTypedSelector((state) => state.favorite);

  const { pauseTrack, playTrack, setVolume, setCurrentTime, setDuration, setAudio, setActiveTrack, setRepeat } =
    useActions();
  const isMounted = useRef(false);

  useEffect(() => {
    function pauseTrackKey(e: KeyboardEvent) {
      console.log(e.code);
      if (e.code === "Space" && active) {
        e.preventDefault();
        play();
      }
    }

    window.addEventListener("keydown", pauseTrackKey);
    return () => {
      window.removeEventListener("keydown", pauseTrackKey);
    };
  }, [active, pause]);

  useEffect(() => {
    if (!audio) {
      setAudio(new Audio());
    } else if (isMounted.current && !pause) {
      console.log("playing");
      console.log(2);
      // audioSettings();
      // play();
    }
    isMounted.current = true;
  }, [active]);

  useEffect(() => {
    if (active && audio) {
      audio.onended = () => {
        axios.post("https://music-platform-server-aw4a1q1qh-shumak69.vercel.app/tracks/listen/" + active._id);
        if (repeat) {
          audio.currentTime = 0;
          setCurrentTime(0);
          audio.play();
        } else {
          let trackList: ITrack[];
          if (router.pathname === "/tracks/favorites") {
            trackList = favoriteTracks;
          } else {
            trackList = tracks;
          }
          const currentTrackIndex = trackList.findIndex((value) => value._id === active._id);
          if (currentTrackIndex !== trackList.length - 1) {
            setActiveTrack(trackList[currentTrackIndex + 1]);
            audioSettings(trackList[currentTrackIndex + 1]);
            pauseTrack();
            audio.play();
          } else {
            playTrack();
            audio.pause();
          }
        }
      };
    }
  }, [active, repeat]);

  function audioSettings(active: ITrack) {
    if (active && audio) {
      audio.src = "https://music-platform-server-aw4a1q1qh-shumak69.vercel.app/" + active.audio;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio!.duration));
      };
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio!.currentTime));
        // console.log(audio.currentTime, audio.duration);
      };
    }
  }

  const play = async () => {
    if (pause) {
      playTrack();
      audio?.pause();
    } else {
      pauseTrack();
      await audio?.play();
    }
  };

  const prevTrack = () => {
    let trackList: ITrack[];
    if (router.pathname === "/tracks/favorites") {
      trackList = favoriteTracks;
    } else {
      trackList = tracks;
    }
    const currentTrackIndex = trackList.findIndex((value) => value._id === active?._id);
    if (currentTrackIndex !== 0) {
      setActiveTrack(trackList[currentTrackIndex - 1]);
      audioSettings(trackList[currentTrackIndex - 1]);
      pauseTrack();
      audio?.play();
    }
  };

  const nextTrack = () => {
    let trackList: ITrack[];
    if (router.pathname === "/tracks/favorites") {
      trackList = favoriteTracks;
    } else {
      trackList = tracks;
    }
    const currentTrackIndex = trackList.findIndex((value) => value._id === active?._id);
    if (currentTrackIndex !== trackList.length - 1) {
      setActiveTrack(trackList[currentTrackIndex + 1]);
      audioSettings(trackList[currentTrackIndex + 1]);
      pauseTrack();
      audio?.play();
    }
  };

  function changeVolume(e: ChangeEvent<HTMLInputElement>): void {
    console.log(e.target);
    setVolume(+e.target.value);
    audio!.volume = +e.target.value / 100;
  }
  function changeCurrentTime(e: ChangeEvent<HTMLInputElement>): void {
    // audio!.play();
    setCurrentTime(+e.target.value);
    audio!.currentTime = +e.target.value;
  }

  if (!active) {
    return null;
  }
  return (
    <div className={styles.player}>
      <IconButton onClick={prevTrack} className={styles.iconButton}>
        <SkipPreviousIcon className={styles.controllerIcon} />
      </IconButton>
      <IconButton onClick={play} className={styles.iconButton}>
        {pause ? <Pause className={styles.controllerIcon} /> : <PlayArrow className={styles.controllerIcon} />}
      </IconButton>
      <IconButton onClick={nextTrack} className={styles.iconButton}>
        <SkipNextIcon className={styles.controllerIcon} />
      </IconButton>
      <Grid container direction="column" className={styles.container}>
        <div className={styles.trackName}>{active?.name}</div>
        <div className={styles.artist}>{active?.artist}</div>
      </Grid>
      <TrackProgressBar currentTime={currentTime} duration={duration} onChange={changeCurrentTime} audio />
      {window.innerWidth > 576 && (
        <>
          <VolumeUp className={styles.volumeUp} />
          <TrackProgressBar currentTime={volume} duration={100} onChange={changeVolume} />
        </>
      )}
      <RepeatIcon className={styles.repeat} onClick={() => setRepeat()} sx={{ color: repeat ? "violet" : "" }} />
    </div>
  );
}

export default Player;
