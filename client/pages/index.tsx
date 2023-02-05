import MainLayout from "@/layouts/MainLayout";
import styles from "../styles/index.module.css";
function Index() {
  return (
    <MainLayout>
      <div className={styles.center}>
        <h1>Добро пожаловать</h1>
        <h3>Здесь собраны лучшие треки!</h3>
      </div>
    </MainLayout>
  );
}

export default Index;
