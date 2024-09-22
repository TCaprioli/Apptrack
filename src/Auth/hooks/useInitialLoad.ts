import { useEffect } from "react";
import { useAppDispatch } from "../../store";
import { verifyUser } from "../slice";

export const useInitialLoad = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(verifyUser());
  }, [dispatch]);
};
