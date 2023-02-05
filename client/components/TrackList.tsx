import { ITrack } from "@/types/track";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TrackItem from "./TrackItem";

interface TrackListProps {
  tracks: ITrack[];
}

function TrackList({ tracks }: TrackListProps) {
  console.log(tracks);
  return (
    <Grid container direction="column">
      <Box p={2}>
        {tracks.map((track) => (
          <TrackItem key={track._id} track={track} />
        ))}
      </Box>
    </Grid>
  );
}

export default TrackList;
