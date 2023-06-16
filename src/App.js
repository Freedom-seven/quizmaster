import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home, QuizPage, Result } from "./Pages";
import Header from "./components/Header/Header";

function App() {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);

  const fetchQuestions = async (category, difficulty) => {
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=15${
          category ? `&category=${category}` : ""
        }${difficulty ? `&difficulty=${difficulty}` : ""}&type=multiple`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      setQuestions(data.results);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                name={name}
                setName={setName}
                fetchQuestions={fetchQuestions}
              />
            }
          ></Route>
          <Route
            path="/quiz"
            element={
              <QuizPage
                name={name}
                questions={questions}
                score={score}
                setScore={setScore}
                setQuestions={setQuestions}
              />
            }
          ></Route>
          <Route
            path="/result"
            element={<Result name={name} score={score} questions={questions} />}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
