import FileUpload from "@/components/FileUpload";
import StepWrapper from "@/components/StepWrapper";
import { useInput } from "@/hooks/useInput";
import MainLayout from "@/layouts/MainLayout";
import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { FocusEvent, useState } from "react";
import styles from "../../styles/create.module.scss";
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
          .post("https://music-platform-server-aw4a1q1qh-shumak69.vercel.app/tracks", formData)
          .then((resp) => router.push("/tracks"))
          .catch((e) => console.log(e));
      default:
        break;
    }
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
    <MainLayout className={styles.layout}>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 && (
          <Grid container direction="column" className={styles.container}>
            <TextField
              label="???????????????? ??????????"
              margin="dense"
              {...name}
              required
              error={nameError}
              onBlur={(e) => onBlurInput(e, setNameError)}
            />
            <TextField
              label="?????? ??????????????????????"
              margin="dense"
              {...artist}
              required
              error={artistError}
              onBlur={(e) => onBlurInput(e, setArtistError)}
            />
            <TextField label="?????????? ?? ??????????" multiline rows={5} margin="dense" {...text} />
          </Grid>
        )}
        {activeStep === 1 && (
          <FileUpload setFile={setPicture} accept="image/*">
            <Button onClick={(e) => console.log(e)}>?????????????????? ??????????????????????</Button>
            {pictureError && !picture && <div className={styles.error}>???????????????????? ?????????????????? ??????????????????????</div>}
            <div>{picture?.name}</div>
          </FileUpload>
        )}
        {activeStep === 2 && (
          <FileUpload setFile={setAudio} accept="audio/*">
            <Button>?????????????????? ??????????</Button>
            {audioError && !audio && <div className={styles.error}>???????????????????? ?????????????????? ??????????</div>}
            <div>{audio?.name}</div>
          </FileUpload>
        )}
      </StepWrapper>
      <Grid container justifyContent="space-between" className={styles.buttonWrapper}>
        <Button disabled={activeStep === 0} onClick={back} variant="contained" size="large">
          ??????????
        </Button>
        <Button onClick={next} variant="contained" size="large">
          ??????????
        </Button>
      </Grid>
    </MainLayout>
  );
}

export default Create;
