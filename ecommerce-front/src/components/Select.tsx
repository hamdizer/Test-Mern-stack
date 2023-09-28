import { ReactNode, useState } from "react"
interface SelectProps{
    label:string,
    options:ReactNode
    getSelectedCountry?(country:string):void
}
export const Select=(props:SelectProps)=>{
    const [selectedValue,setSelectedValue]=useState("")
    const handleChangeValue=(event:React.ChangeEvent<HTMLSelectElement>)=>{
        setSelectedValue(event.target.value)
       props.getSelectedCountry&& props.getSelectedCountry(event.target.value)
    }

    return (
        <div className="mb-4">
            <label
              htmlFor={props.label}
              className="block text-sm font-medium text-gray-700"
            >
               {props.label}
            </label>
            <select onChange={handleChangeValue}  value={selectedValue}   className="mt-1 p-2 w-full rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-300" id="country">
               <option value="">Select An Item</option>
                {props.options}
            </select>
          </div>
    )
}