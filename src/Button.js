function Button(props) {
  return (
    <button id={props.id} onClick={props.onClick} value={props.value}>
      {props.value}
    </button>
  )
}

export default Button;