import { transformToDate } from "@/utils";
import { ChangeEvent } from "react";
import styles from "../styles/TrackProgressBar.module.scss";
interface TrackProgressBarProps {
  currentTime: number;
  duration: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  audio?: boolean;
}

function TrackProgressBar({ currentTime, duration, onChange, audio }: TrackProgressBarProps) {
  return (
    <div className={styles.wrapper}>
      <input
        type="range"
        min={0}
        max={duration}
        value={currentTime}
        onChange={onChange}
        className={audio ? styles.audioRange : ""}
      />
      {audio ? (
        <div>
          {transformToDate(currentTime)} / {transformToDate(duration)}
        </div>
      ) : (
        <div>
          {currentTime} / {duration}
        </div>
      )}
    </div>
  );
}

export default TrackProgressBar;
