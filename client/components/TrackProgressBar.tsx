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
  const ratio = currentTime / duration;
  return (
    <div className={styles.wrapper}>
      <div className={[styles.container, audio ? styles.audioRange : ""].join(" ")}>
        <input type="range" min={0} max={duration} value={currentTime} onChange={onChange} />
        <div
          className={styles.progressBar}
          style={{ width: `calc(${ratio * 100}% + ${-ratio * 2.5 + 2.5}px)` }}
        ></div>
      </div>
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
