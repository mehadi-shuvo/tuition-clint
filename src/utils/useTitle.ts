import { useEffect } from "react";

const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title + "| Teacher Lagbe";
  }, [title]);
};

export default useTitle;
