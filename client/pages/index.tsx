import MainLayout from "@/layouts/MainLayout";
import { Button, Grid } from "@mui/material";
import { useRouter } from "next/router";
import styles from "../styles/index.module.scss";
function Index() {
  const router = useRouter();
  return (
    <MainLayout>
      <div className={styles.center}>
        <h1>Добро пожаловать в Spofity</h1>
        <h3>Здесь собраны лучшие треки!</h3>
        <Grid justifyContent="space-around" alignItems="center" container marginTop={8}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            className={styles.button}
            onClick={() => router.push("/tracks")}
          >
            Список треков
          </Button>
          <Button variant="contained" disabled size="large" className={styles.button}>
            Понравившийся треки
          </Button>
        </Grid>
      </div>
    </MainLayout>
  );
}

export default Index;
