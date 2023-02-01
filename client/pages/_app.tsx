import "@/styles/globals.css";
import React, { FC } from "react";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import { wrapper } from "@/store";
// import { wrapper } from "../components/store";

const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  );
};

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
