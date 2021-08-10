import './App.css';
import questions from './Questions';
import React, { useState } from 'react';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userTactics, setUserTactics] = useState({})
  const [showTeam, setShowTeam] = useState(false);

  const handleAnswerOptionClick = (questionKey, answerValue) => {
    const latestQA = {}
    latestQA[questionKey] = answerValue
    setUserTactics({ ...userTactics, ...latestQA });

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowTeam(true);
    }
  };
  return (
    <div className='app'>
      {showTeam ? (
        <div className='score-section'>
          (Suggested eleven)
        </div>
      ) : (
        <>
          <div className='question-section'>
            <div className='question-count'>
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className='question-text'>{questions[currentQuestion].questionText}</div>
          </div>
          <div className='answer-section'>
            {questions[currentQuestion].answerOptions.map((answerOption) => (
              <button onClick={() => handleAnswerOptionClick(questions[currentQuestion].questionKey, answerOption.answerValue)}>{answerOption.displayText}</button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
