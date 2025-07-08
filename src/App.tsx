import React, { useState, useEffect, useRef } from 'react';
import MathIcon from './assets/icons/math.png';
import EnglishIcon from './assets/icons/english.png';
import failSound from './assets/sound-effects/fail.mp3';
import winSound from './assets/sound-effects/win.mp3';

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

type GameState = 'logo' | 'start' | 'challenge' | 'gameOver' | 'chooseMode' | 'chooseSubject' | 'spinWheel' | 'welcome' | 'mathLevels';

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
  const [wheelRotation, setWheelRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<null | 'Math' | 'English'>(null);
  const [animating, setAnimating] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null); // <-- moved here
  const [pressedIdx, setPressedIdx] = useState<number | null>(null);
  const failAudioRef = useRef<HTMLAudioElement | null>(null);
  const winAudioRef = useRef<HTMLAudioElement | null>(null);

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
    // Play fail sound
    if (failAudioRef.current) {
      failAudioRef.current.currentTime = 0;
      failAudioRef.current.volume = 1.0;
      failAudioRef.current.play();
    }
    // Stop win sound if playing
    if (winAudioRef.current) {
      winAudioRef.current.pause();
      winAudioRef.current.currentTime = 0;
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    if (answerIndex === currentProblem!.correctAnswer) {
      setTimeLeft(0); // Stop the timer immediately
    }
    setTimeout(() => {
      if (answerIndex === currentProblem!.correctAnswer) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('satifySolved', 'true');
        }
        // Stop fail sound and play win sound
        if (failAudioRef.current) {
          failAudioRef.current.pause();
          failAudioRef.current.currentTime = 0;
        }
        if (winAudioRef.current) {
          winAudioRef.current.currentTime = 0;
          winAudioRef.current.volume = 1.0;
          winAudioRef.current.play();
        }
        setTimeout(() => {
          setGameState('chooseMode');
        }, 2000); // Wait 2 seconds before moving to next screen
      } else {
        // Stop fail sound
        if (failAudioRef.current) {
          failAudioRef.current.pause();
          failAudioRef.current.currentTime = 0;
        }
        setTimeout(() => {
          setGameState('gameOver');
        }, 2000); // Wait 2 seconds before moving to game over
      }
    }, 200); // Show feedback quickly, then wait 2s if correct or wrong
  };

  const handleTryAgain = () => {
    // Stop fail sound
    if (failAudioRef.current) {
      failAudioRef.current.pause();
      failAudioRef.current.currentTime = 0;
    }
    setGameState('start');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const topics = [
    { label: 'Algebra', key: 'algebra' },
    { label: 'Advanced Math', key: 'advanced' },
    { label: 'Problem Solving & Data Analysis', key: 'problem' },
    { label: 'Geometry & Trigonometry', key: 'geometry' },
    { label: 'Random', key: 'random' },
  ];
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(topics[0].key);

  if (gameState === 'logo') {
    return (
      <div className="screen-transition" key="logo">
        <div className="app">
          <div className="logo">SATify</div>
        </div>
      </div>
    );
  }

  if (gameState === 'start') {
    return (
      <div className="screen-transition" key="start">
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
      </div>
    );
  }

  if (gameState === 'challenge' && currentProblem) {
    return (
      <div className="screen-transition" key="challenge">
        <div className="app">
          <div className="challenge-screen">
            <div className="timer">{formatTime(timeLeft)}</div>
            <div className="problem">
              {currentProblem.question}
            </div>
            <BombMascot />
            <div className="choices">
              {currentProblem.choices.map((choice, index) => {
                const isCorrect = index === currentProblem.correctAnswer;
                const isSelected = selectedAnswer === index;
                const showGreen = showResult && isCorrect;
                const showRed = showResult && isSelected && !isCorrect;
                return (
                  <button
                    key={index}
                    className={`choice challenge-choice-btn`}
                    style={{
                      background: showGreen
                        ? '#eaffea'
                        : showRed
                        ? '#fff3f3'
                        : '#fff',
                      border: showGreen
                        ? '2px solid #6fd96f'
                        : showRed
                        ? '2px solid #ff5a5a'
                        : '2px solid #bbb',
                      color: showGreen
                        ? '#43b943'
                        : showRed
                        ? '#d32f2f'
                        : '#222',
                      display: 'flex',
                      alignItems: 'center',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      boxShadow: 'none',
                      marginBottom: 8,
                      marginTop: 0,
                      marginLeft: 0,
                      marginRight: 0,
                      borderRadius: 14,
                      padding: '1.2rem 0.5rem',
                      cursor: selectedAnswer !== null ? 'default' : 'pointer',
                      transition: 'all 0.2s cubic-bezier(.4,2,.6,1)'
                    }}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                  >
                    <span style={{ color: showGreen ? '#6fd96f' : showRed ? '#ff5a5a' : '#bbb', fontWeight: 700, fontSize: '1.1rem', marginRight: 12 }}>{String.fromCharCode(65 + index)}</span>
                    <span style={{ color: showGreen ? '#43b943' : showRed ? '#d32f2f' : '#222', fontWeight: 600 }}>{choice}</span>
                  </button>
                );
              })}
            </div>
            {/* Remove showResult feedback text, only use button colors */}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'gameOver') {
    return (
      <div className="screen-transition" key="gameOver">
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
      </div>
    );
  }

  if (gameState === 'chooseMode') {
    return (
      <div className="screen-transition" key="chooseMode">
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
      </div>
    );
  }

  if (gameState === 'chooseSubject') {
    return (
      <div className="screen-transition" key="chooseSubject">
        <div className="app" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <h2 className="choose-subject-title" style={{ color: '#2d3a3a', marginBottom: '2rem', fontWeight: 800, fontSize: '2rem' }}>What do you want to practice today?</h2>
          <div className="button-container" style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              className="choose-mode-btn math-btn"
              style={{ background: 'linear-gradient(135deg, #81ecec 0%, #0984e3 100%)', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', display: 'flex' }}
              onClick={() => setGameState('mathLevels')}
            >
              <img src={MathIcon} alt="Math" style={{ width: 120, height: 120, marginBottom: 16 }} />
              <span style={{ fontWeight: 700, fontSize: '2rem', color: 'white', marginTop: 4 }}>Math</span>
            </button>
            <div style={{ color: '#636e72', fontWeight: 600, fontSize: '1.2rem' }}>or</div>
            <button
              className="choose-mode-btn english-btn"
              style={{ background: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)', color: '#2d3a3a', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', display: 'flex' }}
              onClick={() => alert('English mode coming soon!')}
            >
              <img src={EnglishIcon} alt="English" style={{ width: 120, height: 120, marginBottom: 16 }} />
              <span style={{ fontWeight: 700, fontSize: '2rem', color: 'white', marginTop: 4 }}>English</span>
            </button>
          </div>
          <div style={{ marginTop: '1rem', fontWeight: 600, color: '#636e72', fontSize: '1.1rem', cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => setGameState('spinWheel')}
          >
            Choose for me
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'spinWheel') {
    const handleSpin = () => {
      if (spinning) return;
      setSpinning(true);
      setResult(null);
      setAnimating(false);
      setWheelRotation(0);
      setTimeout(() => {
        const isMath = Math.random() < 0.5;
        const baseAngle = isMath ? 90 : 270;
        const extraSpins = 12 + Math.floor(Math.random() * 5); // 12-16 full spins
        // Add a random offset so the pointer never lands in exactly the same spot
        const randomOffset = (Math.random() - 0.5) * 30; // -15 to +15 degrees
        const finalRotation = 360 * extraSpins + baseAngle + randomOffset;
        setAnimating(true);
        setWheelRotation(finalRotation);
        setTimeout(() => {
          setResult(isMath ? 'English' : 'Math');
          setSpinning(false);
          setAnimating(false);
        }, 5500);
      }, 50);
    };

    return (
      <div className="screen-transition" key="spinWheel">
        <div className="app" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <h2 style={{ color: '#2d3a3a', marginBottom: '2rem', fontWeight: 800, fontSize: '2rem' }}>Spin the Wheel!</h2>
          <div style={{ position: 'relative', width: 300, height: 320, marginBottom: '2rem' }}>
            {/* Pointer - flipped to point downward and overlap the wheel edge */}
            <div style={{ position: 'absolute', left: '50%', top: 8, transform: 'translateX(-50%)', zIndex: 3 }}>
              <svg width="36" height="28" viewBox="0 0 36 28">
                <polygon points="0,0 36,0 18,28" fill="#636e72" />
              </svg>
            </div>
            {/* Wheel */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: 20,
              width: 300,
              height: 300,
              borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: '0 12px 40px rgba(67, 198, 172, 0.18)',
              border: '6px solid #fff',
              background: '#fff',
              transition: animating ? 'transform 5.5s cubic-bezier(0.12, 0.85, 0.38, 1.08)' : 'none',
              transform: `rotate(${wheelRotation}deg)`
            }}>
              <svg width="300" height="300" viewBox="0 0 300 300">
                {/* Right half - Math (right side, 180deg) */}
                <path d="M150,150 L150,0 A150,150 0 1,1 150,300 Z" fill="#23a9fa" />
                {/* Left half - English (left side, 180deg) */}
                <path d="M150,150 L150,300 A150,150 0 1,1 150,0 Z" fill="#ffe066" />
                {/* Math label (right, horizontal, centered) */}
                <text x="240" y="155" textAnchor="middle" fontSize="2rem" fontWeight="bold" fill="#fff" dominantBaseline="middle" style={{ textShadow: '0 2px 8px #1976d2' }}>Math</text>
                {/* English label (left, horizontal, centered) */}
                <text x="60" y="155" textAnchor="middle" fontSize="2rem" fontWeight="bold" fill="#bfa600" dominantBaseline="middle" style={{ textShadow: '0 2px 8px #fffde4' }}>English</text>
              </svg>
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
              transition: 'all 0.2s cubic-bezier(.4,2,.6,1)'
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
      </div>
    );
  }

  if (gameState === 'welcome') {
    return (
      <div className="screen-transition" key="welcome">
        <div className="app">
          <div className="welcome-screen">
            <h1>🎉 Welcome to the Website! 🎉</h1>
            <p>You successfully defused the bomb!</p>
            <p style={{ marginTop: '1rem', fontSize: '1.2rem' }}>
              The main website content will be built here...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'mathLevels') {
    // Responsive sizing
    const isMobile = window.innerWidth < 700;
    const circleSize = isMobile ? 70 : 100;
    // Example: 6 levels, only the first is completed
    const levelCompletion = [true, false, false, false, false, false];
    const levels = [1, 2, 3, 4, 5, 6];
    // Path positions: smooth, centered zig-zag
    const pathWidth = isMobile ? 340 : 420;
    const pathHeight = isMobile ? 520 : 600;
    const center = pathWidth / 2 - circleSize / 2;
    const offset = isMobile ? 60 : 80;
    const step = isMobile ? 80 : 100;
    const positions = [
      { left: center, top: 0 },
      { left: center + offset, top: step },
      { left: center - offset, top: step * 2 },
      { left: center + offset, top: step * 3 },
      { left: center - offset, top: step * 4 },
      { left: center, top: step * 5 },
    ];
    return (
      <div className="screen-transition" key="mathLevels">
        <div className="app" style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', minHeight: '100vh', paddingTop: isMobile ? 24 : 48, width: '100vw', background: '#fff' }}>
          {/* Dropdown menu - now blue like Duolingo */}
          <div style={{
            background: '#23a9fa',
            borderRadius: 28,
            padding: isMobile ? '1.1rem 1.2rem' : '1.5rem 2.5rem',
            marginBottom: isMobile ? 24 : 36,
            width: isMobile ? '95vw' : 540,
            maxWidth: '98vw',
            boxShadow: '0 4px 24px #23a9fa33',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            position: 'relative',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2 }}>
                <span style={{ fontSize: isMobile ? '1rem' : '1.1rem', color: '#b3e6ff', fontWeight: 700, letterSpacing: 1 }}>
                  MATH TOPIC
                </span>
              </div>
              <div style={{ fontWeight: 800, fontSize: isMobile ? '1.25rem' : '2rem', color: '#fff', letterSpacing: 0.5 }}>
                {topics.find(t => t.key === selectedTopic)?.label}
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <button
                style={{
                  background: 'none',
                  border: '2px solid #b3e6ff',
                  borderRadius: 18,
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: isMobile ? '1rem' : '1.1rem',
                  padding: isMobile ? '0.5rem 1.1rem' : '0.7rem 1.7rem',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 8,
                  boxShadow: '0 2px 8px #23a9fa22',
                  outline: 'none',
                  transition: 'background 0.2s',
                }}
                onClick={() => setDropdownOpen(v => !v)}
              >
                <svg width={isMobile ? 20 : 24} height={isMobile ? 20 : 24} viewBox="0 0 24 24" fill="none"><path d="M7 10l5 5 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Choose Topic
              </button>
              {dropdownOpen && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: isMobile ? 38 : 48,
                  background: '#fff',
                  borderRadius: 16,
                  boxShadow: '0 8px 32px #23a9fa33',
                  minWidth: isMobile ? 160 : 220,
                  zIndex: 10,
                  padding: isMobile ? '0.5rem 0.2rem' : '0.7rem 0.5rem',
                }}>
                  {topics.map(topic => (
                    <div
                      key={topic.key}
                      style={{
                        padding: isMobile ? '0.7rem 1rem' : '1rem 1.5rem',
                        color: topic.key === selectedTopic ? '#23a9fa' : '#222',
                        fontWeight: topic.key === selectedTopic ? 800 : 600,
                        fontSize: isMobile ? '1.05rem' : '1.15rem',
                        background: topic.key === selectedTopic ? '#eaf6ff' : 'none',
                        borderRadius: 12,
                        cursor: 'pointer',
                        marginBottom: 2,
                        transition: 'background 0.15s',
                      }}
                      onClick={() => { setSelectedTopic(topic.key); setDropdownOpen(false); }}
                    >
                      {topic.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Path and level buttons */}
          <div style={{
            position: 'relative',
            width: pathWidth,
            height: pathHeight,
            margin: '0 auto',
            marginBottom: isMobile ? 18 : 32,
            display: 'flex',
            justifyContent: 'center',
          }}>
            {/* Path lines/dots (drawn behind the buttons) */}
            <svg
              width={pathWidth}
              height={pathHeight}
              style={{ position: 'absolute', left: 0, top: 0, zIndex: 0, pointerEvents: 'none' }}
            >
              {positions.slice(1).map((pos, idx) => {
                const prev = positions[idx];
                const next = pos;
                return (
                  <line
                    key={idx}
                    x1={prev.left + circleSize / 2}
                    y1={prev.top + circleSize / 2}
                    x2={next.left + circleSize / 2}
                    y2={next.top + circleSize / 2}
                    stroke="#cfd8dc"
                    strokeWidth={8}
                    strokeDasharray="22 16"
                    opacity="0.7"
                    strokeLinecap="round"
                  />
                );
              })}
            </svg>
            {/* Level circles */}
            {levels.map((level, idx) => {
              const completed = levelCompletion[idx];
              const pos = positions[idx];
              // Colors for blue and gray states
              const topColor = completed ? '#23a9fa' : '#ededed';
              const shadowColor = completed ? '#1976d2' : '#bdbdbd';
              const textColor = completed ? '#fff' : '#b0b0b0';
              // Animation: scale down on press
              const isPressed = pressedIdx === idx;
              return (
                <button
                  key={level}
                  style={{
                    position: 'absolute',
                    left: pos.left,
                    top: pos.top,
                    width: circleSize,
                    height: circleSize,
                    borderRadius: '50%',
                    background: 'none',
                    boxShadow: 'none',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: completed ? 'pointer' : 'not-allowed',
                    outline: 'none',
                    zIndex: 2,
                    userSelect: 'none',
                    boxSizing: 'border-box',
                    padding: 0,
                    transition: 'transform 0.18s cubic-bezier(.4,2,.6,1)',
                    transform: isPressed ? 'scale(0.88)' : 'scale(1)',
                  }}
                  onMouseDown={() => completed && setPressedIdx(idx)}
                  onMouseUp={() => completed && setPressedIdx(null)}
                  onMouseLeave={() => completed && setPressedIdx(null)}
                  onTouchStart={() => completed && setPressedIdx(idx)}
                  onTouchEnd={() => completed && setPressedIdx(null)}
                  onClick={() => { if (completed) { setSelectedLevel('level' + level); setPressedIdx(null); } }}
                  disabled={!completed}
                >
                  <svg width={circleSize} height={circleSize + 18} viewBox={`0 0 ${circleSize} ${circleSize + 18}`} style={{ display: 'block' }}>
                    {/* Shadow ellipse below, offset down */}
                    <ellipse
                      cx={circleSize / 2}
                      cy={circleSize + 7}
                      rx={circleSize * 0.46}
                      ry={circleSize * 0.16}
                      fill={shadowColor}
                      opacity="1"
                    />
                    {/* Main top circle */}
                    <circle
                      cx={circleSize / 2}
                      cy={circleSize / 2}
                      r={circleSize / 2}
                      fill={topColor}
                    />
                    {/* Centered number or star with shadow */}
                    {completed ? (
                      <>
                        {/* Number shadow */}
                        <text
                          x="50%"
                          y={circleSize * 0.62}
                          textAnchor="middle"
                          fontSize={isMobile ? circleSize * 0.48 : circleSize * 0.44}
                          fontWeight="bold"
                          fill="#1976d2"
                          opacity="0.25"
                          style={{ filter: 'blur(1.5px)' }}
                          dominantBaseline="middle"
                        >
                          {level}
                        </text>
                        {/* Number */}
                        <text
                          x="50%"
                          y={circleSize * 0.58}
                          textAnchor="middle"
                          fontSize={isMobile ? circleSize * 0.48 : circleSize * 0.44}
                          fontWeight="bold"
                          fill={textColor}
                          dominantBaseline="middle"
                        >
                          {level}
                        </text>
                      </>
                    ) : (
                      <>
                        {/* Star shadow ellipse */}
                        <ellipse
                          cx={circleSize / 2}
                          cy={circleSize * 0.62}
                          rx={circleSize * 0.18}
                          ry={circleSize * 0.07}
                          fill="#d6d6d6"
                          opacity="0.7"
                        />
                        {/* Star */}
                        <path
                          d={`M${circleSize / 2} ${circleSize * 0.32}
                            l${circleSize * 0.07} ${circleSize * 0.14}
                            l${circleSize * 0.16} ${circleSize * 0.02}
                            l-${circleSize * 0.12} ${circleSize * 0.11}
                            l${circleSize * 0.03} ${circleSize * 0.16}
                            l-${circleSize * 0.14} -${circleSize * 0.08}
                            l-${circleSize * 0.14} ${circleSize * 0.08}
                            l${circleSize * 0.03} -${circleSize * 0.16}
                            l-${circleSize * 0.12} -${circleSize * 0.11}
                            l${circleSize * 0.16} -${circleSize * 0.02}
                            z`}
                          fill={textColor}
                        />
                      </>
                    )}
                  </svg>
                </button>
              );
            })}
          </div>
          {/* Pop-up for level start (unchanged) */}
          {selectedLevel && (
            <div style={{
              position: 'fixed',
              left: 0, top: 0, width: '100vw', height: '100vh',
              background: 'rgba(21, 101, 192, 0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 100,
            }}
              onClick={() => setSelectedLevel(null)}
            >
              <div
                style={{
                  background: '#fff',
                  borderRadius: 24,
                  boxShadow: '0 8px 32px #1565c033',
                  padding: isMobile ? '1.2rem 1.2rem' : '2.2rem 2.5rem',
                  minWidth: isMobile ? 220 : 340,
                  maxWidth: '90vw',
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  position: 'relative',
                }}
                onClick={e => e.stopPropagation()}
              >
                <h3 style={{ color: '#1565c0', fontWeight: 800, fontSize: isMobile ? '1.1rem' : '1.5rem', marginBottom: 12, textAlign: 'center' }}>
                  Level {selectedLevel.replace('level', '')}
                </h3>
                <div style={{ color: '#222', fontWeight: 600, fontSize: isMobile ? '1rem' : '1.15rem', marginBottom: 18, textAlign: 'center' }}>
                  Ready to start this level?
                </div>
                <button
                  style={{
                    background: 'linear-gradient(90deg, #74b9ff 0%, #1565c0 100%)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: isMobile ? '1.05rem' : '1.2rem',
                    border: 'none',
                    borderRadius: 18,
                    padding: isMobile ? '0.7rem 1.5rem' : '1rem 2.5rem',
                    marginBottom: 10,
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px #1565c022',
                    transition: 'background 0.2s',
                  }}
                  onClick={() => alert('Start Level ' + selectedLevel.replace('level', ''))}
                >
                  START +10 XP
                </button>
                <button
                  style={{
                    background: 'none',
                    color: '#1565c0',
                    fontWeight: 600,
                    fontSize: isMobile ? '0.95rem' : '1.1rem',
                    border: 'none',
                    borderRadius: 12,
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    marginTop: 2,
                    textDecoration: 'underline',
                  }}
                  onClick={() => setSelectedLevel(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          <div style={{ marginTop: isMobile ? 18 : 32, color: '#636e72', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600, fontSize: isMobile ? '1rem' : '1.1rem' }}
            onClick={() => setGameState('chooseSubject')}
          >
            Back
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ...existing app rendering... */}
      <audio ref={failAudioRef} src={failSound} preload="auto" />
      <audio ref={winAudioRef} src={winSound} preload="auto" />
    </>
  );
}

export default App; 