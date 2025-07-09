import PhoneInput from "react-phone-input-2";

const InputPhone = ({data, setData, name, width, labelText}) => {
  return (
    <div className="flex flex-col gap-2" style={{width: width || '100%'}}>
        <label htmlFor={name} className="text-dark text-sm font-semibold mr-2">{labelText}</label>
        <PhoneInput 
            name={name} 
            onChange={setData} 
            value={data} 
            country={"tr"} 
            countryCodeEditable={false} 
            containerStyle={{ width: width || '100%' }} // dış çerçeve için
            inputStyle={{
                width: "100%",  // iç input'a full genişlik ver
                borderRadius: "0.5rem",
                borderColor: "#1e1e1e",
                borderWidth: "1px",
                padding: "0.5rem",
            }}
        />
    </div>
  )
}

export default InputPhone