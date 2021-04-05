import Button from './Button'

function Session(props) {
  return (
    <div className={props.className} >
      <label>{props.label}</label>
      <div id={props.id} >{props.state}</div>
      <Button id={props.startStop} onClick={props.playPauseSwitch} value={props.startStop}/>
      <Button id={props.reset} onClick={props.resetSwitch} value={props.reset}/>
    </div>
  );
}

export default Session;

