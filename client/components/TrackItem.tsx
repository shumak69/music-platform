import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { ITrack } from "@/types/track";
import { Delete, Pause, PlayArrow } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import Image from "next/image";
import { useRouter } from "next/router";
import { MouseEvent, useEffect, useRef, useState } from "react";
import listens from "../static/image/w26h261390848413visible26.png";
import styles from "../styles/tracks/TrackItem.module.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { parseFromLS } from "@/utils";
interface TrackItemProps {
  track: ITrack;
  active?: boolean;
}

function TrackItem({ track }: TrackItemProps) {
  const router = useRouter();
  const {
    playTrack,
    pauseTrack,
    setActiveTrack,
    deleteTrack,
    setFavorite,
    removeFavorite,
    initFavorite,
    setDuration,
    setCurrentTime,
  } = useActions();
  const { duration, pause, active, audio, volume } = useTypedSelector((state) => state.player);
  const { favoriteTracks } = useTypedSelector((state) => state.favorite);
  const [isFavorite, setIsFavorite] = useState<ITrack | undefined>(undefined);
  const isMounted = useRef(true);
  async function play(e: MouseEvent) {
    e.stopPropagation();
    if (track._id !== active?._id) {
      setActiveTrack(track);
      audio!.src = "http://localhost:3001/" + track.audio;
      console.log(audio);
      // audio?.pause();
      console.log(1);
      // playTrack();
      audio!.volume = volume / 100;
      audio!.onloadedmetadata = () => {
        setDuration(Math.ceil(audio!.duration));
      };
      audio!.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio!.currentTime));
        // console.log(audio.currentTime, audio.duration);
      };
      pauseTrack();
      await audio?.play();
    } else {
      if (pause) {
        playTrack();
        audio?.pause();
      } else {
        pauseTrack();
        await audio?.play();
      }
    }
  }

  useEffect(() => {
    if (isMounted.current) {
      initFavorite(parseFromLS<ITrack[]>("favorites").flat());
      isMounted.current = false;
    } else {
      setIsFavorite(favoriteTracks.find((item) => item._id === track._id));
      localStorage.setItem("favorites", JSON.stringify(favoriteTracks));
    }
  }, [favoriteTracks]);

  function OnDeleteTrack(e: MouseEvent) {
    e.stopPropagation();
    const password = prompt("Для того чтобы удалить нужно ввести пароль");
    if (password === "password132") {
      deleteTrack(track._id);
    } else {
      alert("Пароль неверный");
    }
  }

  function onFavoriteTrack(e: MouseEvent) {
    e.stopPropagation();
    if (isFavorite) {
      removeFavorite(track._id);
    } else {
      setFavorite(track);
    }

    // console.log(track);
  }

  return (
    <Card className={styles.track} onClick={() => router.push("/tracks/" + track._id)}>
      <IconButton onClick={play}>{pause && track._id === active?._id ? <Pause /> : <PlayArrow />}</IconButton>
      <img src={"http://localhost:3001/" + track.picture} alt={track.name} width={70} height={70} />
      <Grid container direction="column" className={styles.container}>
        <div>{track?.name}</div>
        <div className={styles.artist}>{track.artist}</div>
      </Grid>
      <div>
        {track.listens} <Image width={20} height={20} src={listens} alt="listens" />
      </div>
      {isFavorite ? (
        <FavoriteIcon sx={{ fontSize: 30 }} className={styles.favorite} onClick={onFavoriteTrack} />
      ) : (
        <FavoriteBorderIcon className={styles.favorite} sx={{ fontSize: 30 }} onClick={onFavoriteTrack} />
      )}
      {/* <FavoriteBorderIcon className={styles.favorite} sx={{ fontSize: 30 }} onClick={onFavoriteTrack} />
      <FavoriteIcon sx={{ fontSize: 30 }} /> */}
      <IconButton className={styles.delete} onClick={OnDeleteTrack}>
        <Delete />
      </IconButton>
    </Card>
  );
}

export default TrackItem;
