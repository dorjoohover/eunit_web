import useWindowSize from "./useDimensions";

export const SIZE_XS = "xs";
export const SIZE_SM = "sm";
export const SIZE_MD = "md";
export const SIZE_LG = "lg";
export const SIZE_XL = "xl";
export const SIZE_XXL = "2xl";
export const SIZE_XXXL = "3xl";

export const resolveBreakpoint = (width: number) => {
  if (width < 475) {
    return "default";
  } else if (width > 475 && width < 640) {
    return SIZE_XS;
  } else if (width >= 640 && width < 768) {
    return SIZE_SM;
  } else if (width >= 768 && width < 1024) {
    return SIZE_MD;
  } else if (width >= 1024 && width < 1280) {
    return SIZE_LG;
  } else if (width >= 1280 && width < 1536) {
    return SIZE_XL;
  } else if (width >= 1536 && width < 1800) {
    return SIZE_XXL;
  } else if (width >= 1800) {
    return SIZE_XXXL;
  }
};

const useBreakpoints = () => {
  const { width } = useWindowSize();

  return resolveBreakpoint(width ?? 1801);
};
export default useBreakpoints;
