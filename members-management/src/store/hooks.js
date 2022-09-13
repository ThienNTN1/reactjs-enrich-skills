import { useContext, useRef } from "react";
import Context from "./Context";

export const useStore = () => {
  const [state, dispatch] = useContext(Context);
  return [state, dispatch];
};

export const useStoreRef = (refName) => {
  return (refName = useRef());
};
