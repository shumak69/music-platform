import { useRef } from "react";
import styles from "../styles/FileUpload.module.scss";

interface FileUploadProps {
  setFile: Function;
  accept: string;
  children: React.ReactNode;
}

function FileUpload({ setFile, accept, children }: FileUploadProps) {
  const ref = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files![0]);
  };

  return (
    <div onClick={() => ref.current!.click()}>
      <input type="file" accept={accept} className={styles.dn} ref={ref} onChange={onChange} />
      {children}
    </div>
  );
}

export default FileUpload;
