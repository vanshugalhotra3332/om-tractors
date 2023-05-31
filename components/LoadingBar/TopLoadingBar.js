import React from "react";
import LoadingBar from "react-top-loading-bar";
import { useSelector, useDispatch } from "react-redux";
import { setProgress } from "@/slices/globalSlice";

const TopLoadingBar = () => {
  const dispatch = useDispatch();
  const progress = useSelector((state) => state.global.progress);

  return (
    <LoadingBar
      color="#FF9F43"
      progress={progress}
      waitingTime={400}
      onLoaderFinished={() => {
        dispatch(setProgress(0));
      }}
    />
  );
};

export default TopLoadingBar;
