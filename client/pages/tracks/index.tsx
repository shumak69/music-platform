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
function Index() {
  const router = useRouter();
  const { tracks, error } = useTypedSelector((state) => state.track);
  const [query, setQuery] = useState("");
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
    dispatch(fetchTracks());
  }, []);
  if (error) {
    return (
      <MainLayout>
        <h1>{error}</h1>
      </MainLayout>
    );
  }
  return (
    <MainLayout title="Список треков">
      <Grid container justifyContent="center">
        <Card style={{ width: 900 }}>
          <Box p={3}>
            <Grid container justifyContent="space-between" alignItems="center" p={2}>
              <h1>Список треков</h1>
              {/* <TextField value={query} onChange={search} label="Поиск..." /> */}
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <Search sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx" label="Поиск" variant="standard" value={query} onChange={search} />
              </Box>
              <Button onClick={() => router.push("/tracks/create")}>Загрузить</Button>
            </Grid>
            {!tracks.length && (
              <div className={styles.empty}>
                <div>При получении запроса произошла ошибка 🙁</div>
              </div>
            )}
          </Box>
          <TrackList tracks={tracks} />
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
