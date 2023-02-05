import { transformToDate } from "@/utils";
import { ChangeEvent } from "react";

interface TrackProgressBarProps {
  currentTime: number;
  duration: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  audio?: boolean;
}

function TrackProgressBar({ currentTime, duration, onChange, audio }: TrackProgressBarProps) {
  return (
    <div style={{ display: "flex" }}>
      <input type="range" min={0} max={duration} value={currentTime} onChange={onChange} />
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
