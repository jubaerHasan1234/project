import _ from "lodash";
import { useLocation, useParams } from "react-router-dom";
import useAnswers from "../../hook/useAnswer";
import Analysis from "../Analysis";
import Summary from "../Summary";
export default function Result() {
  const { state } = useLocation();
  const { key: fullQuestionData } = state;
  const { id } = useParams();
  const { loding, error, answers } = useAnswers(id);
  // console.log(answers);
  function calculate() {
    let score = 0;

    answers.forEach((question, indexOne) => {
      let correctIndexs = [],
        checkedIndexs = [];
      question.options.forEach((option, indexTwo) => {
        if (option.correct) correctIndexs.push(indexTwo);
        if (fullQuestionData[indexOne].options[indexTwo].checked) {
          checkedIndexs.push(indexTwo);
          option.checked = true;
        }
      });
      if (_.isEqual(correctIndexs, checkedIndexs)) {
        score = score + 5;
      }
    });
    return score;
  }
  const userScore = calculate();
  // calculate();
  return (
    <>
      {loding && <h1>Loding..........</h1>}
      {error && <h1>There was an error.</h1>}
      {answers && answers.length > 0 && (
        <>
          <Summary score={userScore} noq={answers.length} />
          <Analysis answers={answers} />
        </>
      )}
    </>
  );
}
