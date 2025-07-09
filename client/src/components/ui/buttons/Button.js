
const Button = ({text, handleClick, width}) => {
  return (
    <button onClick={handleClick} style={{width: width}} className='text-sm font-medium bg-dark text-white px-5 py-3 rounded-md hover:bg-light transition duration-300'>
        {text}
    </button>
  )
}

export default Button