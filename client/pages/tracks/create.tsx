import FileUpload from "@/components/FileUpload";
import StepWrapper from "@/components/StepWrapper";
import { useInput } from "@/hooks/useInput";
import MainLayout from "@/layouts/MainLayout";
import { Button, Grid, TextField } from "@mui/material";
import { ChangeEvent, FocusEvent, useState } from "react";
import styles from "../../styles/create.module.scss";
import axios from "axios";
import { useRouter } from "next/router";
function Create() {
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [artistError, setArtistError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [pictureError, setPictureError] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const name = useInput("");
  const text = useInput("");
  const artist = useInput("");
  const router = useRouter();
  const next = () => {
    switch (activeStep) {
      case 0:
        if (!artist.value) {
          setArtistError(true);
        }
        if (!name.value) {
          setNameError(true);
        }
        if (artist.value && name.value) {
          setActiveStep((step) => step + 1);
        }
        break;
      case 1:
        if (!picture) {
          setPictureError(true);
          break;
        }
        setActiveStep((step) => step + 1);
        break;
      case 2:
        if (!audio) {
          setAudioError(true);
          break;
        }
        const formData = new FormData();
        formData.append("name", name.value);
        formData.append("text", text.value);
        formData.append("artist", artist.value);
        formData.append("picture", picture!);
        formData.append("audio", audio!);
        axios
          .post("http://localhost:3001/tracks", formData)
          .then((resp) => router.push("/tracks"))
          .catch((e) => console.log(e));
      default:
        break;
    }
    // if (activeStep !== 2) {
    //   setActiveStep((step) => step + 1);
    // } else {
    //   const formData = new FormData();
    //   formData.append("name", name.value);
    //   formData.append("text", text.value);
    //   formData.append("artist", artist.value);
    //   formData.append("picture", picture!);
    //   formData.append("audio", audio!);
    //   axios
    //     .post("http://localhost:3001/tracks", formData)
    //     .then((resp) => router.push("/tracks"))
    //     .catch((e) => console.log(e));
    // }
  };
  const back = () => {
    setActiveStep((step) => step - 1);
  };

  const onBlurInput = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>, fun: Function) => {
    if (e.target.value) {
      fun(false);
    }
  };

  return (
    <MainLayout>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 && (
          <Grid container direction="column" className={styles.container}>
            <TextField
              label="Название трека"
              margin="dense"
              {...name}
              required
              error={nameError}
              onBlur={(e) => onBlurInput(e, setNameError)}
            />
            <TextField
              label="Имя исполнителя"
              margin="dense"
              {...artist}
              required
              error={artistError}
              onBlur={(e) => onBlurInput(e, setArtistError)}
            />
            <TextField label="Слова к треку" multiline rows={3} margin="dense" {...text} />
          </Grid>
        )}
        {activeStep === 1 && (
          <FileUpload setFile={setPicture} accept="image/*">
            <Button onClick={(e) => console.log(e)}>Заргузить изображение</Button>
            {pictureError && !picture && <div className={styles.error}>Необходимо загрузить изображение</div>}
            <div>{picture?.name}</div>
          </FileUpload>
        )}
        {activeStep === 2 && (
          <FileUpload setFile={setAudio} accept="audio/*">
            <Button>Заргузить аудио</Button>
            {audioError && !audio && <div className={styles.error}>Необходимо загрузить аудио</div>}
            <div>{audio?.name}</div>
          </FileUpload>
        )}
      </StepWrapper>
      <Grid container justifyContent="space-between">
        <Button disabled={activeStep === 0} onClick={back} variant="contained" size="large">
          Назад
        </Button>
        <Button onClick={next} variant="contained" size="large">
          Далее
        </Button>
      </Grid>
    </MainLayout>
  );
}

export default Create;
