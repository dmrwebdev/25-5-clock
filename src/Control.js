import Button from './Button'

function Control(props) {
  return (
    <div className={`control ${props.className}`} >
      <label id={props.labelId}>{props.label}</label >
        <div className={`${props.className}-control`}>
          <Button id={props.decrement} onClick={props.onClick} value="-"/>
          <div id={props.lengthId}>{props.lengthState}</div>
          <Button id={props.increment} onClick={props.onClick} value="+"/>
        </div>
    </div>
  );
}

export default Control;

