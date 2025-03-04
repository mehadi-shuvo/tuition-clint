import { useEffect } from "react";

const useTitle = (title: string) => {
  useEffect(() => {
    document.title = "Tuition Point: " + title;
  }, [title]);
};

export default useTitle;
