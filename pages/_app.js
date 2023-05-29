import React from "react";

// components
import Sidebar from "@/components/Sidebar";

// redux
import { Provider } from "react-redux";
import { store } from "../store";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Sidebar />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
