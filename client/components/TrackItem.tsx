import { ITrack } from "@/types/track";
import { Delete, Pause, PlayArrow } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import { useRouter } from "next/router";
import styles from "../styles/tracks/TrackItem.module.scss";

interface TrackItemProps {
  track: ITrack;
  active?: boolean;
}

function TrackItem({ active = true, track }: TrackItemProps) {
  const router = useRouter();
  return (
    <Card className={styles.track} onClick={() => router.push("/tracks/" + track._id)}>
      <IconButton onClick={(e) => e.stopPropagation()}>{active ? <Pause /> : <PlayArrow />}</IconButton>
      <img src={track.picture} alt={track.name} width={70} height={70} />
      <Grid container direction="column" className={styles.container}>
        <div>{track.name}</div>
        <div className={styles.artist}>{track.artist}</div>
      </Grid>
      {active && <div>02:42 / 03:22</div>}
      <IconButton className={styles.delete} onClick={(e) => e.stopPropagation()}>
        <Delete />
      </IconButton>
    </Card>
  );
}

export default TrackItem;
