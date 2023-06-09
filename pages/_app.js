import React, { useEffect } from "react";
import { useRouter } from "next/router";

//css imports
import "@/styles/globals.css";

// toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import Sidebar from "@/components/Sidebar";
import TopLoadingBar from "@/components/LoadingBar/TopLoadingBar";

// redux
import { Provider } from "react-redux";
import { store } from "../store";

import { setProgress, setWindowWidth } from "@/slices/globalSlice";
import Navbar from "@/components/Navbar";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const handleResize = () => {
      store.dispatch(setWindowWidth(window.innerWidth));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = () => {
      store.dispatch(setProgress(40));
    };

    const handleRouteChangeComplete = () => {
      store.dispatch(setProgress(100));
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router]);

  return (
    <>
      <Provider store={store}>
        <TopLoadingBar />
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Navbar />
        <Sidebar />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
