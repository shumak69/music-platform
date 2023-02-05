import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { ITrack } from "@/types/track";
import { transformToDate } from "@/utils";
import { Delete, Pause, PlayArrow } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import { useRouter } from "next/router";
import { MouseEvent } from "react";
import styles from "../styles/tracks/TrackItem.module.scss";
import listens from "../static/image/w26h261390848413visible26.png";
import Image from "next/image";

interface TrackItemProps {
  track: ITrack;
  active?: boolean;
}

function TrackItem({ active = true, track }: TrackItemProps) {
  const router = useRouter();
  const { playTrack, pauseTrack, setActiveTrack } = useActions();
  const { duration } = useTypedSelector((state) => state.player);
  function play(e: MouseEvent) {
    e.stopPropagation();
    setActiveTrack(track);
    playTrack();
  }
  return (
    <Card className={styles.track} onClick={() => router.push("/tracks/" + track._id)}>
      <IconButton onClick={play}>{!active ? <Pause /> : <PlayArrow />}</IconButton>
      <img src={"http://localhost:3001/" + track.picture} alt={track.name} width={70} height={70} />
      <Grid container direction="column" className={styles.container}>
        <div>{track.name}</div>
        <div className={styles.artist}>{track.artist}</div>
      </Grid>
      {active && (
        <div>
          {track.listens} <Image width={20} height={20} src={listens} alt="listens" />
        </div>
      )}
      <IconButton className={styles.delete} onClick={(e) => e.stopPropagation()}>
        <Delete />
      </IconButton>
    </Card>
  );
}

export default TrackItem;
