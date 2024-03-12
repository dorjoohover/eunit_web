
import mergeNames from '@/utils/functions';
import { useState } from 'react';
import { IoCalendarClearSharp } from 'react-icons/io5';
mergeNames;
const DateSelector = () => {
  return <div>DateSelector</div>;
};

export default DateSelector;

export const DateYearSelector = ({
  placeholder = 'YYYY',
  onSelect = (value: string) => {},
  defValue = '',
  requirement = true,
}) => {
  const [show, setShow] = useState(false);
  const [selectedYear, setSelectedYear] = useState(defValue);
  return (
    <div className="relative flex justify-center w-full">
      <div
        className={mergeNames(
          selectedYear || !requirement ? 'border-blue-500' : 'border-red-400',
          'flex flex-row justify-between overflow-hidden border-2 cursor-pointer rounded-full md:w-2/3'
        )}
        onClick={() => setShow((prev) => !prev)}
      >
        <p className="px-8 py-2 font-medium">{selectedYear || placeholder}</p>
        <button
          className={mergeNames(
            selectedYear || !requirement ? 'bg-blue-400' : 'bg-red-400',
            'h-full px-4  flex justify-center items-center'
          )}
        >
          <IoCalendarClearSharp size={20} className="text-white" />
        </button>
      </div>
      {show && (
        <div
          className={mergeNames(
            'z-[50] absolute h-[40vh] bottom-12 overflow-y-scroll rounded-md overflow-hidden flex flex-col md:w-2/3 w-full border bg-white'
          )}
        >
          <div className="grid grid-cols-4">
            {Array(100)
              .fill(0)
              .map((i, key) => {
                const year = new Date().getFullYear() - key;
                return (
                  <button
                    key={year}
                    onClick={() => {
                      setSelectedYear(year.toString());
                      onSelect(year.toString());
                      setShow(false);
                    }}
                    className="py-2 font-medium text-center transition-all ease-linear rounded-full hover:bg-blue-500 hover:text-white"
                  >
                    {year}
                  </button>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};
