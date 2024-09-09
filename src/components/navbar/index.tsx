"use client";
import CategoryBottom from "./bottom";
import UpperNav from "./upper";

const Navbar = () => {
  return (
    <>
      <div className="sticky top-0 z-20" id="navbar">
        <CategoryBottom />
        <UpperNav />
      </div>
    </>
  );
};

export default Navbar;
