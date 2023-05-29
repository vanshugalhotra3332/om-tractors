import Sidebar from "@/components/Sidebar";
import React from "react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Sidebar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
