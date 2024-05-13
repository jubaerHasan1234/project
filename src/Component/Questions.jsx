import Answers from "./Answers";
import classEs from "./style/Question.module.css";
export default function Question({ answers = [] }) {
  return answers.map((answer, index) => (
    <div className={classEs.question} key={index}>
      <div className={classEs.qtitle}>
        <span className="material-icons-outlined"> help_outline </span>
        {answer.title}
      </div>
      <Answers options={answer.options} input={false} />
    </div>
  ));
}
