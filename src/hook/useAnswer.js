import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";
export default function useAnswer(videoId) {
  const [loding, setLoding] = useState(true);
  const [error, setError] = useState(false);
  const [answers, setAnswer] = useState([]);
  useEffect(() => {
    async function fetchAnswer() {
      // database related works
      const dataBase = getDatabase();
      const answerReference = ref(
        dataBase,
        "answers/" + videoId + "/questions"
      );
      const answerQuery = query(answerReference, orderByKey());
      try {
        setError(false);
        setLoding(true);
        // request firbase database
        const snapshot = await get(answerQuery);
        setLoding(false);
        if (snapshot.exists()) {
          setAnswer((previousAnswer) => {
            return [...Object.values(snapshot.val())];
          });
        }
      } catch (error) {
        console.log(error);
        setLoding(false);
        setError(true);
      }
    }

    fetchAnswer();
  }, [videoId]);
  return {
    loding,
    error,
    answers,
  };
}
