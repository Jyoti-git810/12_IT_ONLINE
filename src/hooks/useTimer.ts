import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/redux/hook";
import { setTimer } from "@/redux/slices/timer";

export const useTimer = (durationInMs: number = 60 * 60 * 1000) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const endTime = useRef<number>(Date.now() + durationInMs);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Ensure previous interval is cleared
    }

    intervalRef.current = setInterval(() => {
      const diff = endTime.current - Date.now();
      if (diff <= 0) {
        clearInterval(intervalRef.current!);
        router.push("/result");
        return;
      }

      const hour = Math.floor((diff / (60 * 60 * 1000)) % 24);
      const min = Math.floor((diff / (60 * 1000)) % 60);
      const sec = Math.floor((diff / 1000) % 60);

      dispatch(setTimer({ hour, min, sec }));
    }, 1000);

    return () => clearInterval(intervalRef.current!); // Cleanup on unmount
  }, [dispatch, router]);

  return;
};
