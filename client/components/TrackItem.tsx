import { ITrack } from "@/types/track";
import { Pause, PlayArrow } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import styles from "../styles/TrackItem.module.scss";

interface TrackItemProps {
  track: ITrack;
  active?: boolean;
}

function TrackItem({ active = false, track }: TrackItemProps) {
  return (
    <Card className={styles.track}>
      <IconButton>{active ? <Pause /> : <PlayArrow />}</IconButton>
    </Card>
  );
}

export default TrackItem;
