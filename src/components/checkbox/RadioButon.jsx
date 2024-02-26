import { Radio } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useController, useFormContext } from "react-hook-form";

const RadioButon = ({ label = "", color = "orange", name = "", value, valueView}) => {
  const {formState, control} = useFormContext();
  const {errors} = formState;
  const {field} = useController({
    name,
    control,
    defaultValue: 1
  })
  return (
    <div className="">
      <Radio {...field} name={name} label={label} color={color} value={value} defaultChecked={valueView?value === valueView:value===1}/>
     {!!errors[name] && (
     <p className="text-left text-sm text-red-500">{errors[name]?.message}</p>
     )
     } 
     
    </div>
    )
}
RadioButon.propTypes = {
    label: PropTypes.string,
    color: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.number,
    valueView: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number
    ])
}
export default RadioButon