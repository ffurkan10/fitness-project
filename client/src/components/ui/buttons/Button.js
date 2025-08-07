
const Button = ({text, handleClick, width}) => {
  return (
    <button onClick={handleClick} style={{width: width}} className='text-sm font-medium bg-black text-white px-5 py-3 rounded-md hover:bg-dark transition duration-300'>
        {text}
    </button>
  )
}

export default Button