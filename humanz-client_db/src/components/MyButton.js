import PropTypes from 'prop-types'

const MyButton = ({ classname, color, text, onClick, value}) => {
  return (
    <MyButton
      onClick={onClick}
      style={{
            backgroundColor: color,
            width: "250px", 
            height: "50px",
            color: 'white',
            fontWeight: 600,
            borderRadius: 15,
            fontFamily: 'inherit',
            cursor: 'pointer'
        }}
      className={classname}
      value = {value}
    >
      {text}
    </MyButton>
  )
}

MyButton.defaultProps = {
  color: '#007AF3',
}

MyButton.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
}

export default MyButton;