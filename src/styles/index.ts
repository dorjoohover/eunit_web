export const STYLES = {
  height: "h-[250px] sm:h-[350px]",
  flexAround: "flex justify-around items-center",
  flexBetween: "flex justify-between items-center",
  flexCenter: "flex justify-center",
  input:
    "px-4 py-2 rounded-full border-2 border-blue-400 bg-blue-100/10  text-black font-medium placeholder-slate-400",
  loginWidth: "flex flex-col bg-white px-5 md:px-10 py-10 w-full",
  blueButton:
    "font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all easeIn rounded-full ",
  active:
    "relative block py-1.5 px-3 rounded border-0 bg-blue-600 outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md",
  notActive:
    "relative block py-1.5 border-gray-200 px-3 rounded border bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
  select: "border-1 border-blue-400 rounded-full text-[14px] text-sm",
  button:
    "font-bold text-white transition-all easeIn rounded-full grid place-items-center",
};

export const radioGroup =
  "flex flex-wrap justify-end gap-4 mt-4 whitespace-nowrap";

export const radioStatus = {
  green: "",
};
export const TEXT = {
  mainHeading: "text-[60px]",
};
export const brk = "md:flex-col lg:flex-row sm:flex-row";
export const fade = () => ({
  hidden: {
    opacity: 0,
    y: -10,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      stiffness: 0,
      ease: "easeInOut",
      duration: 0.3,
    },
  },
});
