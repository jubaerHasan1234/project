import {
  get,
  getDatabase,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAt,
} from "firebase/database";
import { useEffect, useState } from "react";
export default function UseVideoList(page) {
  const [loding, setLoding] = useState(true);
  const [error, setError] = useState(false);
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    async function fetchVideos() {
      // database related works
      const dataBase = getDatabase();
      const videoReference = ref(dataBase, "videos");
      const videoQuery = query(
        videoReference,
        orderByKey(),
        startAt(String(page)),
        limitToFirst(8)
      );
      try {
        setError(false);
        setLoding(true);
        // request firbase database
        const snapshot = await get(videoQuery);
        setLoding(false);
        if (snapshot.exists()) {
          setVideos((previousVideos) => {
            return [...previousVideos, ...Object.values(snapshot.val())];
          });
        } else {
          //data end
          setHasMore(false);
        }
      } catch (error) {
        console.log(error);
        setLoding(false);
        setError(true);
      }
    }
    fetchVideos();
  }, [page]);
  return {
    loding,
    error,
    videos,
    hasMore,
  };
}
