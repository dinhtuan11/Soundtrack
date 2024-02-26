import DatePicker from "react-datepicker";
import { getMonth, getYear } from "date-fns";
import range from "lodash/range";
import { useFormContext, Controller } from "react-hook-form";
import PropTypes from "prop-types";

const DateInput = ({ name, limitDate = "newDate" }) => {
  const boolLimit = limitDate==="newDate"
  const { formState, control } = useFormContext();
  const { errors } = formState;
  const years = range(1990, getYear(new Date()) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div className="flex justify-center gap-2 w-full">
                <button onClick={(e) => {e.preventDefault(); decreaseMonth();}} disabled={prevMonthButtonDisabled} className="font-bold">
                  {"<"}
                </button>
                <select
                  className="px-2 py-2 rounded-lg outline-none"
                  value={getYear(date)}
                  onChange={({ target: { value } }) => changeYear(value)}
                >
                  {years.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <select
                  className="px-2 py-2 rounded-lg outline-none"
                  value={months[getMonth(date)]}
                  onChange={({ target: { value } }) =>
                    changeMonth(months.indexOf(value))
                  }
                >
                  {months.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <button onClick={(e) => {e.preventDefault(); increaseMonth();}} disabled={nextMonthButtonDisabled} className="font-bold">
                  {">"}
                </button>
              </div>
            )}
            selected={field.value}
            onChange={(date) => {
              field.onChange(date); // Trigger the onChange event for react-hook-form
            }}
            className="w-full py-[7px] focus:shadow-md focus:shadow-gray-400 border border-gray-400 rounded-md px-4 outline-none"
            dateFormat="yyyy-MM-dd"
            dateFormatCalendar={"MMM yyyy"}
            minDate={!boolLimit&&new Date()}
            maxDate={boolLimit&&new Date()}
          />
        )}
      />
      {!!errors[name] && (
        <p className="text-red-500 text-left text-sm">{errors[name]?.message}</p>
      )}
    </>
  );
};

DateInput.propTypes = {
  name: PropTypes.string,
  limitDate: PropTypes.string
};

export default DateInput;