import NavBar from "@/components/NavBar";
import Player from "@/components/Player";
import Container from "@mui/material/Container";
import Head from "next/head";

interface MainLayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
}

type Props = {
  children?: React.ReactNode;
  [elemName: string]: Props | React.ReactNode;
} & MainLayoutProps;

function MainLayout({ children, title, description, keywords, ...props }: Props) {
  return (
    <>
      <Head>
        <title>{title || "Музыкальная площадка"}</title>
        <meta
          name="description"
          content={"Здесь каждый может оставить свой трек и стать знаменитым." + (description || "")}
        />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={keywords || "Музыка, треки, артисты"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NavBar />
      <Container {...props}> {children}</Container>
      <Player />
    </>
  );
}

export default MainLayout;
