import Questions from "./Questions";
import classEs from "./style/Analysis.module.css";
export default function Analysis({ answers }) {
  return (
    <div className={classEs.analysis}>
      <h1>Questions Analysis</h1>
      <Questions answers={answers} />
    </div>
  );
}
