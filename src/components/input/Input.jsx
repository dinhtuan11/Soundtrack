import {Input as InputMui} from "@material-tailwind/react"
import PropTypes from "prop-types";
import { AiOutlineEye } from "react-icons/ai"
import { BsEyeSlash } from "react-icons/bs"
import {useController, useFormContext} from "react-hook-form";
import { useState } from "react";

const Input = ({type = "text", placeholder = "Email", children = "", name, valueUpdate}) => {
  const {formState, control} = useFormContext();
  const {errors} = formState;
  const {field} = useController({
    name,
    control,
    defaultValue: ""
  })
  const [togglePassword, setTogglePassword] = useState(false);
  return (
    <div className="relative w-full">
      <InputMui
        {...field}
        error = {!!errors[name]}
        type={type && togglePassword ? "text" : type}
        name={name}
        label={placeholder}
        placeholder={valueUpdate}
        className={`pl-8 focus:shadow-md ${valueUpdate?errors[name]?'border-t-red-500_important':'border-t-gray-900_important border-t-gray-200_important':''}`}
        labelProps={{
          className: `gap-5 peer-focus:gap-0 ${valueUpdate&&'hidden'} `,
        }}
        containerProps={{ className: "min-w-[100px]" }}
        
        icon={type === "password" ? <Icon togglePassword={togglePassword} onClick={() => setTogglePassword((pre) => !pre)}></Icon>: <></>}
      />
      <div className="h-2">
        {!!errors[name] && (
      <p className="text-red-500 text-left text-sm">{errors[name]?.message}</p>
      )}
      </div>
      <div className="absolute top-[9px] px-2">
        {children}
      </div>
    </div>
  );
}
const Icon = ({togglePassword, onClick}) => {
  return (
      <span onClick={onClick} className="cursor-pointer">
        {togglePassword ? <BsEyeSlash/> : <AiOutlineEye/>}
      </span>
    )
}

Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    children: PropTypes.object,
    name: PropTypes.string,
    valueUpdate: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string
    ])
  }
Icon.propTypes = {
  togglePassword: PropTypes.bool,
  setTogglePassword: PropTypes.bool,
  onClick: PropTypes.func,

}
export default Input