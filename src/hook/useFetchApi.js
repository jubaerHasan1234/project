import { useEffect, useState } from "react";

export default function useFetchApi(url, method, headers) {
  const [loding, setLoding] = useState(false);
  const [error, setError] = useState(false);
  const [result, setResult] = useState(null);
  useEffect(() => {
    async function requstFetchApi() {
      try {
        setLoding(true);
        setError(false);
        const response = await fetch(url, {
          method: method || "GET",
          headers: headers,
        });
        const data = await response.json();
        setResult(data);
        setLoding(false);
      } catch (error) {
        console.log(error);
        setLoding(false);
        setError(true);
      }
    }
    requstFetchApi();
  }, []);
  return {
    loding,
    error,
    result,
  };
}
