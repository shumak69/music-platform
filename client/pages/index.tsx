import MainLayout from "@/layouts/MainLayout";
import { Button, Grid } from "@mui/material";
import { useRouter } from "next/router";
import styles from "../styles/index.module.scss";
function Index() {
  const router = useRouter();
  return (
    <MainLayout>
      <div className={styles.center}>
        <h1 className={styles.header}>Добро пожаловать в Spofity</h1>
        <h3 className={styles.headerThree}>Здесь собраны лучшие треки!</h3>
        <Grid
          justifyContent="space-around"
          alignItems="center"
          container
          marginTop={5}
          className={styles.buttonContainer}
        >
          <Button
            variant="contained"
            color="secondary"
            size="large"
            className={styles.button}
            onClick={() => router.push("/tracks")}
          >
            Список треков
          </Button>
          <Button
            variant="contained"
            size="large"
            className={styles.button}
            color="success"
            onClick={() => router.push("/tracks/favorites")}
          >
            Понравившийся треки
          </Button>
        </Grid>
      </div>
    </MainLayout>
  );
}

export default Index;
