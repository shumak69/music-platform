import TrackList from "@/components/TrackList";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import MainLayout from "@/layouts/MainLayout";
import { NextThunkDispatch, wrapper } from "@/store";
import { ITrack } from "@/types/track";
import { parseFromLS } from "@/utils";
import { Button, Card, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../../styles/tracks/favorite.module.scss";
function Favorites() {
  const router = useRouter();
  const { initFavorite } = useActions();
  // const { tracks, error } = useTypedSelector((state) => state.track);
  const { favoriteTracks } = useTypedSelector((state) => state.favorite);
  const dispatch = useDispatch() as NextThunkDispatch;
  useEffect(() => {
    initFavorite(parseFromLS<ITrack[]>("favorites").flat());
    // setFavorite(parseFromLS<ITrack[]>("favorites"));
  }, []);
  return (
    <MainLayout title="Список понравившихся треков" className={styles.pb}>
      <Grid container justifyContent="center">
        <Card className={styles.card}>
          <Box p={3}>
            <Box p={2}>
              <h1>Список понравившихся треков</h1>
            </Box>
          </Box>
          {!favoriteTracks.length && (
            <div className={styles.empty}>
              <div>Список лайков пуст 🙁</div>
              <Button
                variant="text"
                color="secondary"
                onClick={() => {
                  router.push("/tracks");
                }}
              >
                Перейти к списку треков
              </Button>
            </div>
          )}
          <TrackList tracks={favoriteTracks} />
        </Card>
      </Grid>
    </MainLayout>
  );
}

export default Favorites;
// export const getServerSideProps = wrapper.getServerSideProps((store) =>  (): Promise<any> => {

//   return  setFavorite(parseFromLS("favorites"));
// });
