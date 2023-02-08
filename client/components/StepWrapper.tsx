import { Card, Container, Grid, Step, StepLabel, Stepper } from "@mui/material";
import styles from "../styles/StepWrapper.module.scss";
interface StepWrapperProps {
  activeStep: number;
  children?: React.ReactNode;
}

const steps = ["Информация о треке", "Загрузите обложку", "Загрузите сам трек"];
function StepWrapper({ activeStep, children }: StepWrapperProps) {
  return (
    <Container>
      <Stepper activeStep={activeStep}>
        {steps.map((step, i) => (
          <Step
            key={i}
            completed={activeStep > i}
            className={activeStep > i ? styles.completed : styles.stepLabel}
          >
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container justifyContent="center" className={styles.container}>
        <Card className={styles.card}>{children}</Card>
      </Grid>
    </Container>
  );
}

export default StepWrapper;
