import React, { useState, useEffect } from "react";
import { decode } from "html-entities";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import "./QuizStyles.css";

const Quiz = ({
  questions,
  currentQuestion,
  setCurrentQuestion,
  correct,
  options,
  score,
  setScore,
}) => {
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const navigate = useNavigate();
  const max_question = questions.length;

  const getOptionClass = (option) => {
    if (selected === option && selected === correct) return "select";
    else if (selected === option && selected !== correct) return "wrong";
    else if (option === correct) return "select";
  };

  const handleCheck = (option) => {
    setSelected(option);
    if (option === correct) {
      setScore((prevScore) => prevScore + 1);
    }
    setError(false);
  };

  const handleQuit = () => {
    setCurrentQuestion(0);
  };

  const handleNext = () => {
    if (currentQuestion >= max_question - 1) {
      navigate("/result");
    } else if (selected || timeLeft === 0) {
      setCurrentQuestion(currentQuestion + 1);
      setSelected(null);
      setError(false);
      setTimeLeft(60);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    if (timeLeft === 0) {
      setSelected(null);
      setError(true);
    }
    const timer =
      timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="question">
      <div className="quiz-info">
        <span className="category-info">
          {questions[currentQuestion].category}
        </span>
        <span className="score-info">Score: {score}</span>
        {timeLeft ? (
          <span className="time-info">Time: {timeLeft}</span>
        ) : (
          <span className="time-info">Time's up!</span>
        )}
      </div>
      <h3>Question {currentQuestion + 1}</h3>
      <div className="current-quiz">
        <p>{decode(questions[currentQuestion].question)}</p>

        <div className="options">
          {error && timeLeft > 0 && !selected && (
            <ErrorMessage>Please select an answer</ErrorMessage>
          )}

          {options &&
            options.map((option) => (
              <button
                key={option}
                className={`single-option ${
                  selected && getOptionClass(option)
                }`}
                onClick={() => handleCheck(option)}
                disabled={selected !== null || timeLeft === 0}
              >
                {decode(option)}
              </button>
            ))}
        </div>

        <div className="controls">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{ width: 185 }}
            href="/"
            onClick={handleQuit}
          >
            Quit
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 185 }}
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
