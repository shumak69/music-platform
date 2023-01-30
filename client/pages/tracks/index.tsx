import TrackList from "@/components/TrackList";
import MainLayout from "@/layouts/MainLayout";
import { ITrack } from "@/types/track";
import { Button, Card, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React from "react";

function Index() {
  const router = useRouter();
  const tracks: ITrack[] = [
    {
      _id: "1",
      name: "Трек 1",
      artist: "Artist 1",
      text: "Some text",
      listens: 5,
      audio: "http://localhost:5000/audio/245f49db-4963-4cb6-8522-f72a9e49fd5e.mp3",
      picture: "http://localhost:5000/picture/1d95c1f5-d468-4411-920a-5cf4266c53fa.jpg",
      comments: [],
    },
    {
      _id: "1",
      name: "Трек 1",
      artist: "Artist 1",
      text: "Some text",
      listens: 5,
      audio: "http://localhost:5000/audio/245f49db-4963-4cb6-8522-f72a9e49fd5e.mp3",
      picture: "http://localhost:5000/picture/1d95c1f5-d468-4411-920a-5cf4266c53fa.jpg",
      comments: [],
    },
  ];
  return (
    <MainLayout>
      <Grid container justifyContent="center">
        <Card style={{ width: 900 }}>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>Список треков</h1>
              <Button onClick={() => router.push("/tracks/create")}>Загрузить</Button>
            </Grid>
          </Box>
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  );
}

export default Index;
