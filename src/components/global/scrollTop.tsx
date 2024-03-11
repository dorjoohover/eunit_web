"use client";
import mergeNames from "@/utils/functions";
import { useEffect, useState } from "react";
import { HiArrowUp } from "react-icons/hi";

const ScrollTop = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
      // else !setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const top = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className="fixed md:bottom-[60px] bottom-[80px] md:right-[50px] right-[10px] sm:block hidden">
      <button
        onClick={top}
        className={mergeNames(
          "bg-blue-600 rounded-full md:py-3 py-2 md:px-4 px-3",
          "transition-all duration-400 ease-in-out",
          !scrolled ? "opacity-0" : "opacity-100",
          !scrolled ? "translate-y-[100px]" : "translate-y-[0px]"
        )}
      >
        <HiArrowUp color="white" size={20} />
      </button>
    </div>
  );
};

export default ScrollTop;
