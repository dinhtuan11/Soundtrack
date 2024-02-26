import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { empty } from "src/utils/Helper";

const SelectValidate = ({ name, datas, setId, defaultValue }) => {
  const { formState, control, setValue } = useFormContext();
  const [values, setValues] = useState(defaultValue??"")
  const { errors } = formState;
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });
  useEffect(() => {
    if (name === "artistId") {
      setValue("artistId", !defaultValue?"1":defaultValue, { shouldValidate: true });
      setId(empty(defaultValue)?"1":defaultValue)
    }
  }, [name, setValue, defaultValue, setId]);
  return (
    <>
      <div className="w-6/12">
        <label
          htmlFor={name}
          className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${
            name === "artistId"
              ? "after:content-['*'] after:ml-0.5 after:text-red-500"
              : ""
          }`}
        >
          Select {name === "artistId" ? "Artist" : "Album"}
        </label>
           <select
            {...field}
            name={name}
            value={values}
            onChange={(e) => {
              setValue(name, e.target.value, { shouldValidate: true });
              setValues(e.target.value)
              if (name === "artistId") setId(e.target.value);
            }}
            id={name}
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {datas &&
              datas.map((items) => (
                <option key={items.id} value={`${items.id}`}>
                  {items?.title || items?.name}
                </option>
              ))}
          </select>
        {name === "artistId" ? (
          <div className="h-2">
            {!!errors[name] && (
              <p className="text-sm text-left text-red-500">
                {errors[name]?.message}
              </p>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
};
SelectValidate.propTypes = {
  name: PropTypes.string,
  datas: PropTypes.array,
  artistId: PropTypes.string,
  setId: PropTypes.func,
  dataAlbum: PropTypes.object,
  defaultValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool
  ])
};
export default SelectValidate;
