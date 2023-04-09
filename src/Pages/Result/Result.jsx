import { Button } from "@material-ui/core";
import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./ResultStyles.css";

const Result = ({ name, score, questions }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!name) {
      navigate("/");
    }
  }, [name, navigate]);

  const averageScore = useMemo(() => {
    return questions.length / 2;
  }, [questions]);

  return (
    <div className="result">
      <div>
        <h3>
          {score > averageScore ? "Well done" : "Not too bad"}, {name}
        </h3>
        <span className="score-info">You scored {score}</span>
      </div>
      <Button
        href="/"
        color="secondary"
        size="large"
        variant="contained"
        style={{ alignSelf: "center", margin: 30 }}
      >
        Back to Home
      </Button>
    </div>
  );
};

export default Result;
