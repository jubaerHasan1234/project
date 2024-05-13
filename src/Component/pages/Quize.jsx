import { getDatabase, ref, set } from "firebase/database";
import _ from "lodash";
import { useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../ContexApi/AuthContex";
import UseQuestion from "../../hook/useQuestion";
import Answers from "../Answers";
import MiniPlayer from "../MiniPlayer";
import ProgresBar from "../ProgresBar";
const initialState = null;
const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;
    case "answers":
      const questions = _.cloneDeep(state);
      questions[action.questionID].options[action.optionIndex].checked =
        action.value;
      return questions;
    default:
      return state;
  }
};
export default function Quize() {
  const { id } = useParams();
  const { loding, error, question } = UseQuestion(id);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [fullQuestionData, dispatch] = useReducer(reducer, initialState);

  const { currentUser } = useAuth();
  const navigat = useNavigate();
  const location = useLocation();
  useEffect(() => {
    dispatch({
      type: "questions",
      value: question,
    });
  }, [question]);
  function handelAnswerChange(listen, index) {
    dispatch({
      type: "answers",
      questionID: currentQuestion,
      optionIndex: index,
      value: listen.target.checked,
    });
  }
  //  hendel when user click the next button to get the next question
  function nextQuestion() {
    if (currentQuestion <= question.length) {
      setCurrentQuestion((previousCurrent) => previousCurrent + 1);
    }
  }
  // hendel when user click the next button to get back to the previous question
  function previousQuestion() {
    if (currentQuestion >= 1 && currentQuestion <= question.length) {
      setCurrentQuestion((previousCurrent) => previousCurrent - 1);
    }
  }
  // progresBar calculation
  const parcantage =
    question.length > 0 ? ((currentQuestion + 1) / question.length) * 100 : 0;
  // submit function
  async function submit() {
    const { uid } = currentUser;
    const dataBase = getDatabase();
    const resultRefarenc = ref(dataBase, `result/${uid}`);
    await set(resultRefarenc, {
      [id]: fullQuestionData,
    });
    navigat(`/Result/${id}`, { state: { key: fullQuestionData } });
  }
  return (
    <>
      {loding && <h1>Loding........</h1>}
      {error && <h1>There was an error.</h1>}
      {!loding && !error && fullQuestionData && fullQuestionData.length > 0 && (
        <>
          <h1>{fullQuestionData[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answers
            options={fullQuestionData[currentQuestion].options}
            handelChange={handelAnswerChange}
            input={true}
          />
          <ProgresBar
            next={nextQuestion}
            previous={previousQuestion}
            progress={parcantage}
            submit={submit}
          />
          <MiniPlayer id={id} title={location.state.videoTitle} />
        </>
      )}
    </>
  );
}
