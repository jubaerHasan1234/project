import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import classEs from "./style/MiniPlayer.module.css";
export default function MiniPlayer({ id, title }) {
  const buttonRef = useRef();
  const [status, setStatus] = useState(false);
  const videoUrl = `https://www.youtube.com/watch?v=${id}`;
  function toggleMiniPlayer() {
    if (!status) {
      buttonRef.current.classList.remove(classEs.floatingBtn);
      setStatus(true);
    } else {
      buttonRef.current.classList.add(classEs.floatingBtn);
      setStatus(false);
    }
  }
  return (
    <div
      className={`${classEs.miniPlayer} ${classEs.floatingBtn}`}
      ref={buttonRef}
      onClick={toggleMiniPlayer}
    >
      <span className={`material-icons-outlined ${classEs.open}`}>
        {" "}
        play_circle_filled{" "}
      </span>
      <span
        className={`material-icons-outlined ${classEs.close}`}
        onClick={toggleMiniPlayer}
      >
        {" "}
        close{" "}
      </span>
      <ReactPlayer
        className={classEs.player}
        url={videoUrl}
        width="300px"
        height="168px"
        playing={status}
        controls
      />
      <p>{title}</p>
    </div>
  );
}
