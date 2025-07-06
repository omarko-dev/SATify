import React, { useState, useEffect } from 'react';

const BombMascot = () => (
  <div style={{ fontSize: '5rem', margin: '1.5rem 0' }} role="img" aria-label="bomb">
    💣
  </div>
);
const Explosion = () => (
  <div style={{ fontSize: '5rem', margin: '1.5rem 0' }} role="img" aria-label="explosion">
    💥
  </div>
);

const CurvedArrow = () => (
  <div style={{ width: 130, height: 60, position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', color: '#222', zIndex: 2 }}>
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 130 130" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
      <path d="M129.577 119.394C122.607 107.851 115.202 96.5246 108.232 84.9813C106.925 82.8033 103.222 83.6741 103.44 86.2881C103.44 91.2977 103.658 96.0894 103.658 101.099C100.173 97.3962 99.3015 93.0398 98.6481 87.8128C98.2125 85.6347 97.3413 83.2385 94.9458 82.5854C91.2431 81.4964 87.1048 85.1991 84.2733 87.1594C77.0857 92.1689 70.5515 98.05 62.7105 102.188C53.5627 106.762 53.3449 100.228 55.3052 93.0405C57.2654 85.4173 60.7503 77.7941 64.6708 71.0421C71.6406 59.2806 79.6997 47.0835 81.6596 33.3618C82.7486 25.7386 78.8281 14.1949 69.2443 14.6305C57.4832 15.0661 43.9789 23.7783 36.3557 32.4905C31.9996 36.8466 7.16978 69.5175 4.77392 50.7862C3.03148 37.0645 14.3574 20.2934 21.1093 8.96754C21.9806 7.4429 19.8025 5.91826 18.7135 7.22509C10.2194 17.6794 3.46744 30.9655 0.418167 44.2517C-1.10647 51.4393 1.28939 64.7254 11.7441 61.8939C23.9412 58.6268 32 44.9051 39.841 35.7573C44.6327 29.8765 52.2559 25.5204 58.79 22.0355C72.7296 14.6301 79.046 25.5204 75.5611 38.1531C71.2053 53.6173 60.0969 66.2497 53.7805 80.843C51.6025 86.0703 43.7615 103.494 52.2559 107.851C62.0571 112.86 75.1255 100.445 82.0952 95.0004C81.6596 95.2182 93.2033 85.8525 93.8567 87.8131C94.5101 89.7734 94.5101 92.1689 94.9461 94.3469C95.817 98.4853 97.5598 101.753 100.391 104.366C96.253 104.148 92.1146 104.366 87.9763 105.019C85.7983 105.455 85.5805 108.722 87.3229 109.811C99.7378 116.781 113.677 118.523 126.964 123.097C128.923 123.969 130.884 121.355 129.577 119.394ZM106.054 108.287C107.361 108.287 107.796 107.197 107.578 106.326C108.232 105.891 108.668 105.237 108.668 104.366C108.668 101.535 108.668 98.4853 108.668 95.6538C113.024 102.624 117.38 109.376 121.736 116.346C113.459 113.95 104.965 112.207 97.1242 108.94C99.9553 108.722 103.005 108.504 106.054 108.287Z" fill="currentColor"></path>
    </svg>
  </div>
);

const RotatedTitle = () => (
  <div style={{
    position: 'absolute',
    left: 30,
    top: 'calc(50% - 70px)',
    transform: 'rotate(-7deg)',
    color: '#2d3a3a',
    fontWeight: 700,
    fontSize: '1.5rem',
    letterSpacing: '0.01em',
    zIndex: 3,
    whiteSpace: 'nowrap',
    textShadow: '1px 1px 8px #f8f8f8',
  }}>
    Solve this problem to unlock the site
  </div>
);

type GameState = 'logo' | 'start' | 'challenge' | 'gameOver' | 'chooseMode' | 'chooseSubject' | 'spinWheel' | 'welcome';

interface Problem {
  question: string;
  choices: string[];
  correctAnswer: number;
}

const SAT_PROBLEMS: Problem[] = [
  {
    question: "What is 25% of 80?",
    choices: ["15", "18", "20", "25"],
    correctAnswer: 2
  },
  {
    question: "What is 1/4 of 60?",
    choices: ["10", "12", "15", "20"],
    correctAnswer: 2
  },
  {
    question: "If a shirt costs $40 and is discounted by 10%, what is the sale price?",
    choices: ["$36", "$38", "$34", "$32"],
    correctAnswer: 0
  },
  {
    question: "What is 30% of 50?",
    choices: ["10", "12", "15", "20"],
    correctAnswer: 2
  },
  {
    question: "What is 2/5 of 25?",
    choices: ["5", "8", "10", "12"],
    correctAnswer: 2
  },
  {
    question: "If you have 3/4 of a pizza and eat 1/2 of what you have, how much pizza is left?",
    choices: ["1/4", "3/8", "1/2", "3/4"],
    correctAnswer: 1
  },
  {
    question: "What is 60 increased by 20%?",
    choices: ["66", "70", "72", "80"],
    correctAnswer: 2
  },
  {
    question: "If 10% of x is 5, what is x?",
    choices: ["10", "20", "50", "100"],
    correctAnswer: 3
  },
  {
    question: "What is 2/3 of 21?",
    choices: ["12", "13", "14", "15"],
    correctAnswer: 2
  },
  {
    question: "If a number is decreased by 25% and the result is 60, what was the original number?",
    choices: ["75", "80", "85", "90"],
    correctAnswer: 1
  }
];

function App() {
  // Check localStorage on initial load
  const [gameState, setGameState] = useState(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('satifySolved') === 'true') {
      return 'chooseMode';
    }
    return 'logo';
  });
  const [timeLeft, setTimeLeft] = useState(10);
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<null | 'Math' | 'English'>(null);

  // Logo splash effect
  useEffect(() => {
    if (gameState === 'logo') {
      const timer = setTimeout(() => {
        setGameState('start');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [gameState]);

  // Timer countdown
  useEffect(() => {
    if (gameState === 'challenge' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setGameState('gameOver');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState, timeLeft]);

  const handleStart = () => {
    const randomProblem = SAT_PROBLEMS[Math.floor(Math.random() * SAT_PROBLEMS.length)];
    setCurrentProblem(randomProblem);
    setTimeLeft(10);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameState('challenge');
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    setTimeout(() => {
      if (answerIndex === currentProblem!.correctAnswer) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('satifySolved', 'true');
        }
        setGameState('chooseMode');
      } else {
        setGameState('gameOver');
      }
    }, 1200);
  };

  const handleTryAgain = () => {
    setGameState('start');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (gameState === 'logo') {
    return (
      <div className="app">
        <div className="logo">SATify</div>
      </div>
    );
  }

  if (gameState === 'start') {
    return (
      <div className="app" style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {/* Arrow and text stack above the button, up and left, with bigger arrow and single-line text */}
          <div className="arrow-text-stack" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginBottom: '2rem', marginRight: '20rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="arrow-text" style={{
                transform: 'rotate(-5deg) translateX(0rem)',
                color: '#2d3a3a',
                fontWeight: 700,
                fontSize: '1.05rem',
                letterSpacing: '0.01em',
                marginBottom: '-0.2rem',
                whiteSpace: 'nowrap',
                textShadow: '1px 1px 8px #f8f8f8',
                textAlign: 'right',
                maxWidth: 320,
                lineHeight: 4.1,
              }}>
                <span className="arrow-text-line">Solve this problem to unlock the site</span>
              </div>
              <div className="arrow-svg" style={{ width: 130, height: 60, color: '#222', zIndex: 2 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 130 130" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
                  <path d="M129.577 119.394C122.607 107.851 115.202 96.5246 108.232 84.9813C106.925 82.8033 103.222 83.6741 103.44 86.2881C103.44 91.2977 103.658 96.0894 103.658 101.099C100.173 97.3962 99.3015 93.0398 98.6481 87.8128C98.2125 85.6347 97.3413 83.2385 94.9458 82.5854C91.2431 81.4964 87.1048 85.1991 84.2733 87.1594C77.0857 92.1689 70.5515 98.05 62.7105 102.188C53.5627 106.762 53.3449 100.228 55.3052 93.0405C57.2654 85.4173 60.7503 77.7941 64.6708 71.0421C71.6406 59.2806 79.6997 47.0835 81.6596 33.3618C82.7486 25.7386 78.8281 14.1949 69.2443 14.6305C57.4832 15.0661 43.9789 23.7783 36.3557 32.4905C31.9996 36.8466 7.16978 69.5175 4.77392 50.7862C3.03148 37.0645 14.3574 20.2934 21.1093 8.96754C21.9806 7.4429 19.8025 5.91826 18.7135 7.22509C10.2194 17.6794 3.46744 30.9655 0.418167 44.2517C-1.10647 51.4393 1.28939 64.7254 11.7441 61.8939C23.9412 58.6268 32 44.9051 39.841 35.7573C44.6327 29.8765 52.2559 25.5204 58.79 22.0355C72.7296 14.6301 79.046 25.5204 75.5611 38.1531C71.2053 53.6173 60.0969 66.2497 53.7805 80.843C51.6025 86.0703 43.7615 103.494 52.2559 107.851C62.0571 112.86 75.1255 100.445 82.0952 95.0004C81.6596 95.2182 93.2033 85.8525 93.8567 87.8131C94.5101 89.7734 94.5101 92.1689 94.9461 94.3469C95.817 98.4853 97.5598 101.753 100.391 104.366C96.253 104.148 92.1146 104.366 87.9763 105.019C85.7983 105.455 85.5805 108.722 87.3229 109.811C99.7378 116.781 113.677 118.523 126.964 123.097C128.923 123.969 130.884 121.355 129.577 119.394ZM106.054 108.287C107.361 108.287 107.796 107.197 107.578 106.326C108.232 105.891 108.668 105.237 108.668 104.366C108.668 101.535 108.668 98.4853 108.668 95.6538C113.024 102.624 117.38 109.376 121.736 116.346C113.459 113.95 104.965 112.207 97.1242 108.94C99.9553 108.722 103.005 108.504 106.054 108.287Z" fill="currentColor"></path>
                </svg>
              </div>
            </div>
          </div>
          {/* Start button */}
          <button
            className="start-button big-gradient"
            onClick={handleStart}
            style={{
              fontSize: '2rem',
              padding: '2rem 4rem',
              borderRadius: '60px',
              fontWeight: 800,
              boxShadow: '0 8px 32px rgba(252, 182, 159, 0.25)',
              background: 'linear-gradient(90deg, #ffecd2 0%, #fcb69f 50%, #f8ffae 100%)',
              color: '#2d3a3a',
              border: 'none',
              letterSpacing: '0.05em',
              transition: 'all 0.2s cubic-bezier(.4,2,.6,1)',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            START
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'challenge' && currentProblem) {
    return (
      <div className="app">
        <div className="challenge-screen">
          <div className="timer">{formatTime(timeLeft)}</div>
          <div className="problem">
            {currentProblem.question}
          </div>
          <BombMascot />
          <div className="choices">
            {currentProblem.choices.map((choice, index) => (
              <button
                key={index}
                className={`choice ${
                  selectedAnswer !== null
                    ? index === currentProblem.correctAnswer
                      ? 'correct'
                      : index === selectedAnswer
                      ? 'incorrect'
                      : ''
                    : ''
                }`}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
              >
                {String.fromCharCode(97 + index)} {choice}
              </button>
            ))}
          </div>
          {showResult && (
            <div style={{ color: '#2d3a3a', fontSize: '1.5rem', marginTop: '1rem' }}>
              {selectedAnswer === currentProblem.correctAnswer ? '✅ Correct!' : '❌ Wrong!'}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (gameState === 'gameOver') {
    return (
      <div className="app">
        <div className="game-over">
          <Explosion />
          <h2>💥 BOOM! 💥</h2>
          <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Oops! Try again!</p>
          <button className="try-again-button" onClick={handleTryAgain}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'chooseMode') {
    return (
      <div className="app" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <h2 style={{ color: '#2d3a3a', marginBottom: '2rem', fontWeight: 800, fontSize: '2rem' }}>Welcome to SATify!</h2>
        <div className="button-container" style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            className="choose-mode-btn"
            style={{ background: 'linear-gradient(135deg, #74b9ff 0%, #00b894 100%)' }}
            onClick={() => alert('Login functionality coming soon!')}
          >
            Login & Save Progress
          </button>
          <div style={{ color: '#636e72', fontWeight: 600, fontSize: '1.2rem' }}>or</div>
          <button
            className="choose-mode-btn"
            style={{ background: 'linear-gradient(135deg, #fdcbf1 0%, #e17055 100%)' }}
            onClick={() => setGameState('chooseSubject')}
          >
            Continue as Guest
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'chooseSubject') {
    return (
      <div className="app" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <h2 className="choose-subject-title" style={{ color: '#2d3a3a', marginBottom: '2rem', fontWeight: 800, fontSize: '2rem' }}>What do you want to practice today?</h2>
        <div className="button-container" style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            className="choose-mode-btn"
            style={{ background: 'linear-gradient(135deg, #81ecec 0%, #0984e3 100%)' }}
            onClick={() => alert('Math mode coming soon!')}
          >
            Math
          </button>
          <div style={{ color: '#636e72', fontWeight: 600, fontSize: '1.2rem' }}>or</div>
          <button
            className="choose-mode-btn"
            style={{ background: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)', color: '#2d3a3a' }}
            onClick={() => alert('English mode coming soon!')}
          >
            English
          </button>
        </div>
        <div style={{ marginTop: '1rem', fontWeight: 600, color: '#636e72', fontSize: '1.1rem', cursor: 'pointer', textDecoration: 'underline' }}
          onClick={() => setGameState('spinWheel')}
        >
          Choose for me
        </div>
      </div>
    );
  }

  if (gameState === 'spinWheel') {
    const handleSpin = () => {
      setSpinning(true);
      setTimeout(() => {
        const isMath = Math.random() < 0.5;
        setResult(isMath ? 'Math' : 'English');
        setSpinning(false);
      }, 1800);
    };

    return (
      <div className="app" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <h2 style={{ color: '#2d3a3a', marginBottom: '2rem', fontWeight: 800, fontSize: '2rem' }}>Spin the Wheel!</h2>
        <div style={{ width: 300, height: 300, borderRadius: '50%', background: 'conic-gradient(#81ecec 0% 50%, #ffeaa7 50% 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', boxShadow: '0 8px 32px rgba(67, 198, 172, 0.10)' }}>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#2d3a3a', textAlign: 'center' }}>
            {spinning ? 'Spinning...' : result ? result : 'Math or English?'}
          </div>
        </div>
        <button
          style={{
            fontSize: '1.3rem',
            padding: '1rem 2.5rem',
            borderRadius: '30px',
            fontWeight: 700,
            color: 'white',
            background: 'linear-gradient(135deg, #fdcbf1 0%, #00b894 100%)',
            border: 'none',
            boxShadow: '0 8px 32px rgba(67, 198, 172, 0.10)',
            cursor: spinning ? 'not-allowed' : 'pointer',
            opacity: spinning ? 0.7 : 1,
            marginBottom: '1.5rem',
          }}
          onClick={handleSpin}
          disabled={spinning}
        >
          {spinning ? 'Spinning...' : 'Spin'}
        </button>
        {result && (
          <button
            style={{
              fontSize: '1.1rem',
              padding: '0.7rem 2rem',
              borderRadius: '20px',
              fontWeight: 700,
              color: '#2d3a3a',
              background: '#fff',
              border: '2px solid #00b894',
              marginTop: '0.5rem',
              cursor: 'pointer',
            }}
            onClick={() => alert(`${result} mode coming soon!`)}
          >
            Start {result}
          </button>
        )}
        <div style={{ marginTop: '2rem', color: '#636e72', cursor: 'pointer', textDecoration: 'underline' }}
          onClick={() => setGameState('chooseSubject')}
        >
          Back
        </div>
      </div>
    );
  }

  if (gameState === 'welcome') {
    return (
      <div className="app">
        <div className="welcome-screen">
          <h1>🎉 Welcome to the Website! 🎉</h1>
          <p>You successfully defused the bomb!</p>
          <p style={{ marginTop: '1rem', fontSize: '1.2rem' }}>
            The main website content will be built here...
          </p>
        </div>
      </div>
    );
  }

  return null;
}

export default App; 