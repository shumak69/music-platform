import MainLayout from "@/layouts/MainLayout";
import { ITrack } from "@/types/track";
import { Button, Grid, TextField } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../styles/tracks/TrackPage.module.scss";
import listens from "../../static/image/w26h261390848413visible26.png";
function TrackPage() {
  const track: ITrack = {
    _id: "1",
    name: "Трек 1",
    artist: "Artist 1",
    text: "Some text",
    listens: 5,
    audio: "http://localhost:3001/audio/245f49db-4963-4cb6-8522-f72a9e49fd5e.mp3",
    picture: "http://localhost:3001/image/1d95c1f5-d468-4411-920a-5cf4266c53fa.jpg",
    comments: [],
  };
  const router = useRouter();
  return (
    <MainLayout className={styles.wrapper}>
      <Grid justifyContent="space-between" container alignItems="center">
        <Grid container className={styles.container} xs={8} item>
          <img src={track.picture} alt={track.name} width={200} height={200} />
          <div className={styles.info}>
            <h1 className={styles.trackName}>{track.name}</h1>
            <h2 className={styles.artist}> {track.artist}</h2>
            <h2 className={styles.listens}>
              {track.listens} <Image width={20} height={20} src={listens} alt="listens"></Image>
            </h2>
          </div>
        </Grid>
        <Button
          onClick={() => router.back()}
          variant="outlined"
          className={[styles.back, styles.currentColor].join(" ")}
        >
          Назад
        </Button>
      </Grid>
      <h1>Слова к треку</h1>
      <p>{track.text}</p>
      <h1>Комментарии</h1>
      <Grid container className={styles.currentColor}>
        <TextField label="Ваше имя" fullWidth />
        <TextField label="Комментарий" fullWidth multiline rows={4} margin="dense" />
        <Button>Отправить комментарий</Button>
      </Grid>
      <div>
        {track.comments.map((comment) => (
          <div key={comment._id}>
            <div>Автор - {comment.username}</div>
            <div>Комментарий - {comment.text}</div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

export default TrackPage;
