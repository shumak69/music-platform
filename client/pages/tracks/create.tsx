import FileUpload from "@/components/FileUpload";
import StepWrapper from "@/components/StepWrapper";
import MainLayout from "@/layouts/MainLayout";
import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import styles from "../../styles/create.module.scss";
function Create() {
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState(null);
  const [audio, setAudio] = useState(null);
  const next = () => {
    if (activeStep !== 2) {
      setActiveStep((step) => step + 1);
    }
  };
  const back = () => {
    setActiveStep((step) => step - 1);
  };
  return (
    <MainLayout>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 && (
          <Grid container direction="column" className={styles.container}>
            <TextField label="Название трека" margin="dense" />
            <TextField label="Имя исполнителя" margin="dense" />
            <TextField label="Слова к треку" multiline rows={3} margin="dense" />
          </Grid>
        )}
        {activeStep === 1 && (
          <FileUpload setFile={setPicture} accept="image/*">
            <Button>Заргузить изображение</Button>
          </FileUpload>
        )}
        {activeStep === 2 && (
          <FileUpload setFile={setAudio} accept="audio/*">
            <Button>Заргузить аудио</Button>
          </FileUpload>
        )}
      </StepWrapper>
      <Grid container justifyContent="space-between">
        <Button disabled={activeStep === 0} onClick={back}>
          Назад
        </Button>
        <Button onClick={next}>Далее</Button>
      </Grid>
    </MainLayout>
  );
}

export default Create;
