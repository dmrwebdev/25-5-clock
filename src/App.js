import React, {useState, useEffect, useRef} from 'react';
import './index.css';
import Control from './Control'
import Session from './Session';

const initialSession  = 25;
const initialBreak = 5;

function App() {
  const [sessionLength, setSession] = useState(initialSession);
  const [breakLength, setBreak] = useState(initialBreak);
  const [timer, setTimer] = useState(25);
  const [timerActive, settimerActive] = useState(false);
  const [sessionOrBreak, setSessionOrBreak] = useState('Session');


  function handleChange(event) {
    if(!timerActive) {
      if (/session/i.test(event.target.id)) {
        if(event.target.value === '-') {
          setSession(prevSession => prevSession - 1);
          setTimer(Math.floor(sessionLength * (1000 * 60) / 1000))
        } else {
          setSession(prevSession => prevSession + 1);
          setTimer(Math.floor(sessionLength * (1000 * 60) / 1000))
        }
      } else {
        if(event.target.value === '-') {
          setBreak(prevSession => prevSession - 1);
        } else {
          setBreak(prevSession => prevSession + 1)
        }   
      }    
   }
  }


  function reset() {
    settimerActive(false)
    setTimer(sessionLength)
  }

  function handleTimer() {
      settimerActive(true);
  }

  useInterval(() => {
    if(timerActive & sessionOrBreak === "Session" & timer !== 0) {
      setTimer(timer - 1);
    } else {
      setSessionOrBreak('Break');
      handleTimer();
    }
  }, timerActive ? 1000 : null)


  return (
    <div className="App">
      <h1>25 + 5 Clock</h1>
      <main>
        <div className="control-container">
          <Control className="session"
            decrement="session-decrement"
            increment="session-increment"
            onClick={handleChange}
            length="session-length"
            label="Session"
            state={sessionLength} />
          <Control className="break"
            decrement="break-decrement"
            increment="break-increment"
            onClick={handleChange}
            length="break-length"
            label="Break"
            state={breakLength}  />
        </div>
        <Session
          className="timer"
          id="time-left"
          reset="Reset"
          playPauseSwitch={handleTimer}
          resetSwitch={reset}
          startStop="Play/Pause"
          label="Time Left"
          state={timer} />
      </main>
    </div>
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
