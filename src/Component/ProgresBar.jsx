// import { NavLink } from "react-router-dom";
import { useRef, useState } from "react";
import Button from "./Button";
import classEs from "./style/ProgresBar.module.css";

export default function ProgresBar({ next, previous, progress, submit }) {
  const [toolTip, setToolTip] = useState(false);
  const toolTipRef = useRef();
  function toggleToolTip() {
    if (toolTip) {
      setToolTip(false);
      toolTipRef.current.style.display = "none";
    } else {
      setToolTip(true);
      toolTipRef.current.style.left = `calc(${progress}% - 65px)`;
      toolTipRef.current.style.display = "block";
    }
  }
  return (
    <div className={classEs.progressBar}>
      <div className={classEs.backButton} onClick={previous}>
        <span className="material-icons-outlined"> arrow_back </span>
      </div>
      <div className={classEs.rangeArea}>
        <div className={classEs.tooltip} ref={toolTipRef}>
          {progress}% Complete!
        </div>
        <div className={classEs.rangeBody}>
          <div
            className={classEs.progress}
            style={{ width: `${progress}%` }}
            onMouseOver={toggleToolTip}
            onMouseOut={toggleToolTip}
          ></div>
        </div>
      </div>
      {/* <NavLink to="/Result"> */}
      <Button
        className={classEs.next}
        style={{ height: "auto", marginTop: "0rem" }}
        onClick={progress === 100 ? submit : next}
      >
        <span>{progress === 100 ? "Submit quiz" : "Next Question"}</span>
        <span className="material-icons-outlined"> arrow_forward </span>
      </Button>
      {/* </NavLink> */}
    </div>
  );
}
