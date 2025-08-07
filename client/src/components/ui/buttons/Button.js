
const Button = ({text, handleClick, width}) => {
  return (
    <button onClick={handleClick} style={{width: width}} className='text-sm font-medium bg-white text-black border border-black px-5 py-3 rounded-md hover:bg-black hover:text-white transition duration-300'>
        {text}
    </button>
  )
}

export default Button