import NavBar from "@/components/NavBar";
import Container from "@mui/material/Container";

type Props = {
  children?: React.ReactNode;
};

function MainLayout({ children }: Props) {
  return (
    <>
      <NavBar />
      <Container> {children}</Container>
    </>
  );
}

export default MainLayout;
