import { ITrack } from "@/types/track";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TrackItem from "./TrackItem";
import styles from "../styles/tracks/TrackList.module.scss";
interface TrackListProps {
  tracks: ITrack[];
}

function TrackList({ tracks }: TrackListProps) {
  return (
    <Grid container direction="column">
      <Box p={2} className={styles.box}>
        {tracks.map((track) => (
          <TrackItem key={track._id} track={track} />
        ))}
      </Box>
    </Grid>
  );
}

export default TrackList;
