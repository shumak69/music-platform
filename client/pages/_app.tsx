import { wrapper } from "@/store";
import "@/styles/globals.css";
import { NextComponentType } from "next";
import { AppProps } from "next/app";
import React, { Component, FC } from "react";
import { Provider } from "react-redux";
// import { wrapper } from "../components/store";

// const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
//   const { store, props } = wrapper.useWrappedStore(rest);
//   return (
//     <Provider store={store}>
//       <Component {...props.pageProps} />
//     </Provider>
//   );

class MyApp extends React.Component<AppProps> {
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export const MyApp1: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default wrapper.withRedux(MyApp);

export function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
