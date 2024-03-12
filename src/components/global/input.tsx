import mergeNames from "@/utils/functions";
import React from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import CurrencyInputField from "react-currency-input-field";
const Input = ({
  onChange = () => {},
  ph = "",
  value = "",
  props,
  type,
  className = "",
  requirement = true,
}: {
  onChange: (value: string) => void;
  ph?: string;
  value?: string;
  props?: any;
  type?: any;
  className?: string;
  requirement?: boolean;
}) => {
  return (
    <input
      {...props}
      placeholder={ph}
      type={type}
      defaultValue={value}
      // onChange={(e) => onChange(e.target.value)}
      onChange={(e) => {
        e.persist();
        onChange(e.target.value);
      }}
      className={mergeNames(
        "px-4 py-2 sm:w-5/6 md:w-2/3 w-full flex items-center justify-between",
        value || !requirement ? "border-blue-400 " : "border-red-400 ",
        "rounded-full border-2 bg-blue-100/10 outline-blue-400",
        "text-black font-medium placeholder-slate-400",
        className
      )}
      required
    />
  );
};

export default Input;

export const NumberInput = ({
  onChange = (value: number) => {},
  ph = "",
  value = "",
  props,
  className = "",
}: {
  onChange: (value: number) => void;
  ph: string;
  value: string;
  props: any;
  className: string;
}) => {
  // const counterId = React.useRef(0);
  const [isClicked, setIsClicked] = React.useState(false);
  const [counter, setCounter] = React.useState(
    isNaN(parseInt(value)) ? 0 : parseInt(value)
  );

  React.useEffect(() => {
    // console.log(`CALLING UPDATES ${counterId.current++}`, counter);
    onChange(counter);
  }, [counter]);

  return (
    <div
      className={mergeNames(
        "h-11 m-0 p-0 md:w-2/3 w-full flex items-center justify-between overflow-hidden",
        "rounded-full border-2 border-blue-400 bg-blue-100/10 outline-blue-400",
        "text-black font-medium placeholder-slate-400",
        className
      )}
    >
      {!isClicked ? (
        <button
          className="w-full h-full px-4 py-2 border-none ring-0"
          onClick={() => {
            setIsClicked(true);
          }}
        >
          {counter}
        </button>
      ) : (
        <input
          required
          {...props}
          type={"number"}
          autoFocus={isClicked}
          placeholder={ph}
          defaultValue={counter || ""}
          onChange={(e) => {
            onChange(parseInt(e.target.value));
            setCounter(parseInt(e.target.value));
          }}
          className="w-full h-full px-4 py-2 text-center border-none ring-0 bg-blue-100/50"
        />
      )}
      <div className="flex flex-col m-0 ">
        <button
          className="w-full px-2"
          onClick={() => {
            setIsClicked(false);
            let val;
            setCounter((prev) => {
              val = prev + 1;
              return val;
            });
            onChange(counter);
          }}
        >
          <BiChevronUp className="text-blue-600" />
        </button>
        <button
          className="w-full px-2 "
          onClick={() => {
            setIsClicked(false);
            setCounter((prev) => (prev > 0 ? prev - 1 : prev));
            onChange(counter);
          }}
        >
          <BiChevronDown className="text-blue-600" />
        </button>
      </div>
    </div>
  );
};

export const CurrencyInput = ({
  placeholder = "",
  onChange = (value: string) => {},
  value = 0,
}) => {
  return (
    <CurrencyInputField
      // prefix="MNT "
      value={value}
      id="input-example"
      name="input-name"
      decimalsLimit={2}
      placeholder={placeholder}
      intlConfig={{ locale: "mn-MN", currency: "MNT" }}
      onValueChange={(value, name) => onChange(value ?? "")}
      className={mergeNames(
        value == 0 ? "border-red-400" : "border-blue-400/70",
        "w-full px-4 py-2 font-semibold border-2 rounded-full "
      )}
    />
  );
};
export const FormattedNumberInput = ({
  placeholder = "",
  onChange = (value: string) => {},
  suffix = "",
  value = 0,
}) => {
  return (
    <div
      className={mergeNames(
        value == 0 ? "border-red-400" : "border-blue-400/70",
        "flex items-center px-4 overflow-hidden font-semibold border-2 rounded-full "
      )}
    >
      <CurrencyInputField
        // prefix="MNT "
        // suffix={suffix}
        value={value}
        id="input-example"
        name="input-name"
        decimalsLimit={2}
        placeholder={placeholder}
        onValueChange={(value, name) => onChange(value ?? "")}
        className={mergeNames("w-full py-2 border-none outline-none ring-0")}
      />
      {suffix}
    </div>
  );
};
