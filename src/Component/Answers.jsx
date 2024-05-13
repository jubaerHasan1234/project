import { Fragment } from "react";
import CheckBox from "./CheckBox";
import classEs from "./style/Quize.module.css";
export default function Answers({ options = [], handelChange, input }) {
  return (
    <div className={classEs.answers}>
      {options.map((option, index) => (
        <Fragment key={index}>
          {input ? (
            <CheckBox
              className={classEs.answer}
              text={option.title}
              value={index}
              checked={option.checked}
              onChange={(listen) => handelChange(listen, index)}
              key={index}
            />
          ) : (
            <CheckBox
              className={`${classEs.answer} ${
                option.correct
                  ? classEs.correct
                  : option.checked
                  ? classEs.wrong
                  : null
              }`}
              text={option.title}
              defaultChecked={option.checked}
              disabled
              key={index}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}
