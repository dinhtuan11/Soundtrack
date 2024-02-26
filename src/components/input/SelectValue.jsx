import {Option, Select} from "@material-tailwind/react"
import PropTypes from "prop-types";
import {useController, useFormContext} from "react-hook-form";
import { cloneElement } from "react";

const SelectValue = ({ placeholder = "Email", name, valueForcus= [], valueUpdate}) => {
  const {formState, control, setValue} = useFormContext();
  const {errors} = formState;
  const {field} = useController({
    name,
    control,
    defaultValue: ""
  })
  const selectValue = (value)=> {
    setValue(name, value.id)
  }
  return (
    <div className="w-72">
    <Select
      {...field}
      name={name}
      size="lg"
      label={valueUpdate?.title??placeholder}
      selected={(element) =>
        element &&
        cloneElement(element, {
          disabled: true,
          className:
            "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
        })
      }
    >
      {valueForcus&&valueForcus?.map((items) => (
        <Option key={items.id} value={`${items.id}`} onClick={()=>selectValue(items)}>
          {items.title}
        </Option>
      ))}
    </Select>
    {!!errors[name] && (
      <p className="text-red-500 text-left text-sm">{errors[name]?.message}</p>
      )}
  </div>
  );
}

SelectValue.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    valueUpdate: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object
    ]),
    valueForcus: PropTypes.array
  }
export default SelectValue