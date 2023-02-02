import { ChangeEvent } from "react";

interface TrackProgressBarProps {
  currentTime: number;
  duration: number;
  onChange: (e: ChangeEvent) => void;
}

function TrackProgressBar({ currentTime, duration, onChange }: TrackProgressBarProps) {
  return (
    <div style={{ display: "flex" }}>
      <input type="range" min={currentTime} max={currentTime} value={currentTime} onChange={onChange} />
      <div>
        {currentTime} / {duration}
      </div>
    </div>
  );
}

export default TrackProgressBar;
