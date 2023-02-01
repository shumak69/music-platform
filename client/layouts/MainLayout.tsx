import NavBar from "@/components/NavBar";
import Player from "@/components/Player";
import Container from "@mui/material/Container";

type Props = {
  children?: React.ReactNode;
  [elemName: string]: Props | React.ReactNode;
};

function MainLayout({ children, ...props }: Props) {
  return (
    <>
      <NavBar />
      <Container {...props}> {children}</Container>
      <Player />
    </>
  );
}

export default MainLayout;
