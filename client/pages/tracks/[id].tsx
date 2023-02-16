import MainLayout from "@/layouts/MainLayout";
import { ITrack } from "@/types/track";
import { Button, Divider, Grid, TextField } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../styles/tracks/TrackPage.module.scss";
import listens from "../../static/image/w26h261390848413visible26.png";
import { Fragment, useState } from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import { useInput } from "@/hooks/useInput";

interface TrackPageProps {
  serverTrack: ITrack;
}

function TrackPage({ serverTrack }: TrackPageProps) {
  const [track, setTrack] = useState(serverTrack);
  const router = useRouter();
  const username = useInput("");
  const text = useInput("");

  const addComment = async () => {
    try {
      const response = await axios.post("http://localhost:3001/tracks/comment", {
        username: username.value,
        text: text.value,
        trackId: track._id,
      });
      setTrack({ ...track, comments: [...track.comments, response.data] });
    } catch (error) {
      alert(error);
    } finally {
      username.onChange("");
      text.onChange("");
    }
  };
  console.log(track?.text || "Слова отсутствуют");
  return (
    <MainLayout
      title={track?.name + " - " + track?.artist}
      className={styles.wrapper}
      keywords={"Музыка, артисты, " + track?.name + ", " + track?.artist}
    >
      <Grid justifyContent="space-between" container alignItems="center">
        <Grid container className={styles.container} xs={10} item>
          <img src={"http://localhost:3001/" + track?.picture} alt={track?.name} width={200} height={200} />
          <div className={styles.info}>
            <h1 className={styles.trackName}>{track?.name}</h1>
            <h2 className={styles.artist}> {track?.artist}</h2>
            <h2 className={styles.listens}>
              {track?.listens} <Image width={20} height={20} src={listens} alt="listens"></Image>
            </h2>
          </div>
        </Grid>
        <Button
          onClick={() => router.push("/tracks")}
          variant="contained"
          color="warning"
          className={[styles.back, styles.currentColor].join(" ")}
        >
          Назад
        </Button>
      </Grid>
      <h1>Слова к треку</h1>
      <pre className={styles.text}>{track?.text || "Слова отсутствуют"}</pre>
      <h1>Комментарии</h1>
      <Grid container className={styles.currentColor}>
        <TextField label="Ваше имя" fullWidth {...username} color="warning" sx={{ color: "" }} />
        <TextField label="Комментарий" fullWidth multiline rows={4} margin="dense" {...text} color="warning" />
        <Button onClick={addComment}>Отправить комментарий</Button>
      </Grid>
      <div>
        {track?.comments.map((comment, index) => (
          <Fragment key={comment._id}>
            {index !== 0 && <Divider orientation="horizontal" />}
            <div className={styles.comment}>
              <div className={styles.username}>{comment.username}</div>
              <div className={styles.text}> {comment.text}</div>
            </div>
          </Fragment>
        ))}
      </div>
    </MainLayout>
  );
}

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let response = null;
  try {
    response = await axios.get<ITrack>("http://localhost:3001/tracks/" + params!.id);
  } catch (error) {
    console.error(error);
  }
  return {
    props: {
      serverTrack: response ? response.data : null,
    },
  };
};
