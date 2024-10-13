import React from "react";

const Heading = () => {
  return (
    <h1 className="text-center text-4xl mt-5 
                   max-lg:text-3xl 
                   max-sm:text-2xl 
                   max-sm:ml-0 
                   max-lg:ml-0">
      TO{" "}
      <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
        DO
      </span>{" "}
      List
    </h1>
  );
};

export default Heading;

