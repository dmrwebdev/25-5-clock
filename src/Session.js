import playPause from './play-pause.svg'
import reset from './reset.svg'


function Session(props) {

  function convertTime() {
    const secVal = Math.floor(props.timerState % 60);
    const minVal = Math.floor(props.timerState / 60);
    const secs = secVal >= 9 ? Math.floor(props.timerState % 60) : `0${Math.floor(props.timerState % 60)}` 
    const mins = minVal >= 9 ? Math.floor(props.timerState / 60) : `0${Math.floor(props.timerState / 60)}`
    return (
      <div id="time-left">
        {mins}:{secs}
      </div>
    )
  }

  return (
    <div className='timer-controls' >
      <label id='timer-label'>{props.sessionState}</label>
      <img id='start_stop' src={playPause} onClick={props.togglePause} alt="Play/Pause"/>
      <div id='time-left' >{convertTime()}</div>
      <img id='reset' src={reset} onClick={props.reset} alt="Reset"/>
    </div>
  );
}

export default Session;

