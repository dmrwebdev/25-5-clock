import React, {useState, useEffect, useRef} from 'react';
import './index.css';
import Control from './Control'
import Session from './Session';

const beep = document.getElementById('beep');

function App() {
  const [sessionLength, setSession] = useState(25);
  const [breakLength, setBreak] = useState(5);
  const [timer, setTimer] = useState(1500);
  const [timerOn, setTimerOn] = useState(false);
  const [sessionOrBreak, setSessionOrBreak] = useState('Session');

  useEffect(() => {
    if (sessionOrBreak === 'Session') {
      setTimer(Math.floor(sessionLength * 60))
    } else {
      setTimer(Math.floor(breakLength * 60))
    }
  }, [sessionLength, breakLength, sessionOrBreak])

  function handleChange(event) {
    if(!timerOn) {
      if (/session/i.test(event.target.id) ) {
        if(event.target.value === '-'  && sessionLength > 1) {
          setSession(prevSession => prevSession - 1)
        } else if (event.target.value === '+' && sessionLength < 60) {
          setSession(prevSession => prevSession + 1);
        }
      } else if (/break/i.test(event.target.id)) {
        if(event.target.value === '-' && breakLength > 1) {
          setBreak(prevSession => prevSession - 1);
        } else if (event.target.value === '+' && breakLength < 60) {
          setBreak(prevSession => prevSession + 1)
        }   
      }    
    }
  }

  function reset() {
    setTimerOn(false);
    setSessionOrBreak('Session');
    setTimer(sessionLength * 60);
    setBreak(5);
    setSession(25);
    beep.pause();
    beep.currentTime = 0;
  
  }

  function togglePause() {
    console.log(';this')
    timerOn ? setTimerOn(false) : setTimerOn(true);
  }

  useInterval(() => {
    if (timerOn) {
      if(sessionOrBreak === 'Session') {
        if (timer > 0) {
          setTimer(prevTimer => prevTimer - 1);
        } else {
          setSessionOrBreak('Break');
          beep.play();
        }
      } else if (sessionOrBreak === 'Break') {
        if (timer > 0) {
          setTimer(prevTimer => prevTimer - 1);
        } else {
          setSessionOrBreak('Session');
          beep.play();
        }
      } // else do nothing
    }
  }, timerOn ? 1000 : null)

  return (
    <>
    <div className="strap"/>
    <div className="circle outer">
    <div className="circle inner">
      <h1>25 + 5 Clock</h1>
      <Session
            togglePause={togglePause}
            reset={reset}
            sessionState={sessionOrBreak}
            timerState={timer}/>
      <div className="main-container">
        <div>
          <div className="length-controls">
            <Control className="session"
              decrement="session-decrement"
              increment="session-increment"
              labelId='session-label'
              lengthId='session-length'
              onClick={handleChange}
              label="Session"
              lengthState={sessionLength} />
            <Control className="break"
              decrement="break-decrement"
              increment="break-increment"
              labelId='break-label'
              lengthId='break-length'
              onClick={handleChange}
              label="Break"
              lengthState={breakLength}  />
          </div>
        </div>
        <audio 
          id='beep'
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </div>
    </div>
    </div>
    </>
  );
}

function useInterval(callback, delay) {
  const savedCallback = useRef();
  console.log(savedCallback)
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default App;
