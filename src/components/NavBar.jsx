import React from "react";

const NavBar = () => {
  return (
    <div className="bg-black py-3 sticky top-0 z-50  backdrop-blur-lg border-b border-neutral-700/80 lg:text-sm max-lg:w-full">
      <div className="text-center">
        <span className=" text-4xl tracking-tigth bg-gradient-to-r from-orange-500 to-red-800 text-transparent  bg-clip-text ">
          toDo
        </span>
      </div>
    </div>
  );
};
export default NavBar;
