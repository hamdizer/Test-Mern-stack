import React, { useState } from 'react';
interface RadioButtonProps{
    values:string[],
    getData:(role:string)=>void
}
const RadioGroup = (props:RadioButtonProps) => {
  const [selectedValue, setSelectedValue] = useState(props.values[0]);

  const handleRadioChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    props.getData(event.target.value)
  };

  return (
    <div className="flex space-x-4">
        <label>Role</label>
        {props.values.map((value:string)=>( <label className="inline-flex items-center">
        <input
          type="radio"
          value={value}
          checked={selectedValue === value}
          onChange={handleRadioChange}
          className="form-radio h-4 w-4 text-blue-600"
        />
        <span className="ml-2">{value}</span>
      </label>))}
     

    </div>
  );
};

export default RadioGroup;

