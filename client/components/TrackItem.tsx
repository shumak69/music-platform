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
      audio!.src = "https://music-platform-server-aw4a1q1qh-shumak69.vercel.app/" + track.audio;
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
    const password = prompt("?????? ???????? ?????????? ?????????????? ?????????? ???????????? ????????????");
    if (password === "password132") {
      deleteTrack(track._id);
    } else {
      alert("???????????? ????????????????");
    }
  }

  function onFavoriteTrack(e: MouseEvent) {
    e.stopPropagation();
    if (isFavorite) {
      removeFavorite(track._id);
    } else {
      setFavorite(track);
    }
  }

  return (
    <Card className={styles.track} onClick={() => router.push("/tracks/" + track._id)}>
      <IconButton onClick={play} className={styles.play}>
        {pause && track._id === active?._id ? <Pause /> : <PlayArrow />}
      </IconButton>
      <img
        src={"https://music-platform-server-aw4a1q1qh-shumak69.vercel.app/" + track.picture}
        alt={track.name}
        width={70}
        height={70}
        className={styles.img}
      />
      <Grid
        container
        direction="column"
        className={styles.container}
        xs={5}
        item
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.overflow}>{track.name}</div>
        <div className={styles.artist}>{track.artist}</div>
      </Grid>
      <div className={styles.listeners} onClick={(e) => e.stopPropagation()}>
        {track.listens} <Image width={20} height={20} src={listens} alt="listens" />
      </div>
      <div className={styles.iconWrapper}>
        <IconButton className={styles.favorite} onClick={onFavoriteTrack}>
          {isFavorite ? <FavoriteIcon sx={{ fontSize: 30 }} /> : <FavoriteBorderIcon sx={{ fontSize: 30 }} />}
        </IconButton>
        <IconButton className={styles.delete} onClick={OnDeleteTrack}>
          <Delete />
        </IconButton>
      </div>
    </Card>
  );
}

export default TrackItem;
