const audio = new Audio("https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav");

function Session(props) {
  function convertTime() {
    const secVal = Math.floor(props.timerState % 60);
    const minVal = Math.floor(props.timerState / 60);
    const secs = secVal > 10 ? Math.floor(props.timerState % 60) :`0${Math.floor(props.timerState % 60)}` 
    const mins = minVal > 10 ? Math.floor(props.timerState / 60) : `0${Math.floor(props.timerState / 60)}`
    return (
      <div id="time-left">
        {mins}:{secs}
      </div>
    )
  }

  return (
    <div className='timer' >
      <label id='timer-label'>{props.sessionState}</label>
      <div id='time-left' >{convertTime()}</div>
      <Button id='start_stop' onClick={props.togglePause} value="Play/Pause"/>
      <Button id='reset' onClick={props.reset} value="Reset"/>
    </div>
  );
}

function Control(props) {
  return (
    <div className={props.className} >
      <label id={props.labelId}>{props.label}</label >
        <div className={`${props.className}-control`}>
          <Button id={props.decrement} onClick={props.onClick} value="-"/>
          <div id={props.lengthId}>{props.lengthState}</div>
          <Button id={props.increment} onClick={props.onClick} value="+"/>
        </div>
    </div>
  );
}

function Button(props) {
  return (
    <button id={props.id} onClick={props.onClick} value={props.value}>
      {props.value}
    </button>
  )
}

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
        } else if (event.target.value === '+'  && breakLength < 60) {
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
          audio.play();
        }
      } else if (sessionOrBreak === 'Break') {
        if (timer > 0) {
          setTimer(prevTimer => prevTimer - 1);
        } else {
          setSessionOrBreak('Session');
          audio.play();
        }
      } // else do nothing
    }
  }, timerOn ? 1000 : null)

  return (
    <div className="App">
      <h1>25 + 5 Clock</h1>
      <main>
        <div className="control-container">
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
        <Session
          togglePause={togglePause}
          reset={reset}
          sessionState={sessionOrBreak}
          timerState={timer}/>
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


ReactDOM.render(
    <App />,
  document.getElementById('root')
);