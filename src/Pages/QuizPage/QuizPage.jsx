import React, { useEffect, useState } from "react";
import "./QuizPage.css";
import Quiz from "../../components/Quiz/Quiz";
import { CircularProgress } from "@material-ui/core";

const QuizPage = ({ name, questions, score, setScore }) => {
  const [options, setOptions] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showSubtitle, setShowSubtitle] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const handleShuffle = (array) => {
    return array.sort((a, b) => 0.5 - Math.random());
  };

  useEffect(() => {
    setOptions(
      questions &&
        handleShuffle([
          questions[currentQuestion]?.correct_answer,
          ...questions[currentQuestion]?.incorrect_answers,
        ])
    );
  }, [questions, currentQuestion]);

  useEffect(() => {
    if (currentQuestion > 0) {
      setShowSubtitle(false);
    }
  }, [currentQuestion]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="quiz">
      {showSubtitle && <span className="subtitle">Welcome, {name}!</span>}
      {isLoading ? (
        <CircularProgress
          className="circular-progress"
          size={100}
          thickness={1}
          color="inherit"
          label="Page loading..."
        />
      ) : (
        <Quiz
          questions={questions}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          options={options}
          setOptions={setOptions}
          correct={questions[currentQuestion]?.correct_answer}
          score={score}
          setScore={setScore}
        />
      )}
    </div>
  );
};

export default QuizPage;
