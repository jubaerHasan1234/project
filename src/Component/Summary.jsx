import { useMemo } from "react";
import successLogo from "../assets/images/success.png";
import useFetchApi from "../hook/useFetchApi";
import classEs from "./style/Summary.module.css";
export default function Summary({ score, noq }) {
  const getKeyword = useMemo(() => {
    if ((score / (noq * 5)) * 100 < 50) {
      return "failed";
    } else if ((score / (noq * 5)) * 100 < 75) {
      return "good";
    } else if ((score / (noq * 5)) * 100 < 100) {
      return "very good";
    } else {
      return "excellent";
    }
  });
  const { loding, error, result } = useFetchApi(
    `https://api.pexels.com/v1/search?query=${getKeyword()}&per_page=1`,
    "GET",
    {
      Authorization: "PXuYJF3p3TGvd2dI2MUDcwcqj1qfmm2GzgaQcLwpU2IGPL0mMcKG35p3",
    }
  );
  const image = result ? result?.photos[0].src.medium : successLogo;
  return (
    <div className={classEs.summary}>
      <div className={classEs.point}>
        {/* <!-- progress bar will be placed here --> */}
        <p className={classEs.score}>
          Your score is <br />
          {score} out of {noq * 5}
        </p>
      </div>
      {loding && <div className={classEs.badge}>Loding your badge....</div>}
      {error && <div className={classEs.badge}>An error occured!</div>}
      {!loding && !error && (
        <div className={classEs.badge}>
          <img src={image} />
        </div>
      )}
    </div>
  );
}
