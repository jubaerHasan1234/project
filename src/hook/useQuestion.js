import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";
export default function UseQuestion(videoId) {
  const [loding, setLoding] = useState(true);
  const [error, setError] = useState(false);
  const [question, setQuestion] = useState([]);
  useEffect(() => {
    async function fetchQuestion() {
      // database related works
      const dataBase = getDatabase();
      const quizReference = ref(dataBase, "quiz/" + videoId + "/questions");
      const quizQuery = query(quizReference, orderByKey());
      try {
        setError(false);
        setLoding(true);
        // request firbase database
        const snapshot = await get(quizQuery);
        setLoding(false);
        if (snapshot.exists()) {
          setQuestion((previousQuestion) => {
            return [...Object.values(snapshot.val())];
          });
        }
      } catch (error) {
        console.log(error);
        setLoding(false);
        setError(true);
      }
    }

    fetchQuestion();
  }, [videoId]);

  return {
    loding,
    error,
    question,
  };
}
