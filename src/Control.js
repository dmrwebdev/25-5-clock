import Button from './Button'

function Control(props) {
  return (
    <div className={props.className} >
      <label>{props.text}</label >
        <div className={`${props.className}-control`}>
          <Button id={props.decrement} onClick={props.onClick} value="-"/>
          <div id={props.label}>{props.state}</div>
          <Button id={props.increment} onClick={props.onClick} value="+"/>
        </div>
    </div>
  );
}

export default Control;

