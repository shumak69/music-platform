import TrackList from "@/components/TrackList";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import MainLayout from "@/layouts/MainLayout";
import { NextThunkDispatch, wrapper } from "@/store";
import { fetchTracks, searchTracks } from "@/store/action-creators/track";
import { Search } from "@mui/icons-material";
import { Button, Card, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../../styles/tracks/index.module.scss";
import LoopIcon from "@mui/icons-material/Loop";
function Index() {
  const router = useRouter();
  const { tracks, error } = useTypedSelector((state) => state.track);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch() as NextThunkDispatch;
  const [timer, setTimer] = useState<null | ReturnType<typeof setTimeout>>(null);
  const search = async (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(async () => {
        await dispatch(await searchTracks(e.target.value));
      }, 500)
    );
  };
  useEffect(() => {
    try {
      dispatch(fetchTracks());
    } catch (error) {
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, []);
  return (
    <MainLayout title="Список треков" className={styles.pb}>
      <Grid container justifyContent="center">
        <Card className={styles.card}>
          {isLoading ? (
            <div className={styles.container}>
              <LoopIcon sx={{ color: "#ff8f00", height: 50, width: 100 }} />
            </div>
          ) : (
            <>
              <Box p={3} className={styles.box}>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  p={2}
                  className={styles.wrapper}
                >
                  <h1 className={styles.header}>Список треков</h1>
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <Search sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                    <TextField
                      id="input-with-sx"
                      label="Поиск"
                      variant="standard"
                      value={query}
                      onChange={search}
                    />
                  </Box>
                  <Button onClick={() => router.push("/tracks/create")}>Загрузить</Button>
                </Grid>

                {error && (
                  <div className={styles.empty}>
                    <div>При получении запроса произошла ошибка 🙁</div>
                  </div>
                )}
              </Box>
              <TrackList tracks={tracks} />
            </>
          )}
        </Card>
      </Grid>
    </MainLayout>
  );
}

export default Index;
// export const getServerSideProps = wrapper.getServerSideProps((store) => async (): Promise<any> => {
//   const dispatch = store.dispatch as NextThunkDispatch;
//   return await dispatch(fetchTracks());
// });
// export const getServerSideProps = wrapper.getServerSideProps((store) => ({ req, res, ...etc }) => {
//   console.log("2. Page.getServerSideProps uses the store to dispatch things");
//   const dispatch = store.dispatch as NextThunkDispatch;
//   return dispatch(fetchTracks());
// });
