import { ChangeEvent } from "react";

interface TrackProgressBarProps {
  currentTime: number;
  fullTime: number;
  onChange: (e: ChangeEvent) => void;
}

function TrackProgressBar({ currentTime, fullTime, onChange }: TrackProgressBarProps) {
  return (
    <div style={{ display: "flex" }}>
      <input type="range" min={currentTime} max={currentTime} value={currentTime} onChange={onChange} />
      <div>
        {currentTime} / {fullTime}
      </div>
    </div>
  );
}

export default TrackProgressBar;
