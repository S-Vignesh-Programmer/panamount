import React from "react";

function HeaderItem({ name, Icon }) {

  // Just Pass the Name and Icons using function
  return (
    <div className="group flex items-center gap-2 px-2 md:px-4 py-1 md:py-2 
    rounded-md cursor-pointer text-white transition duration-300 hover:text-white/25">
      
      <Icon className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
      {name && (
        <span className="hidden sm:inline text-sm font-medium whitespace-nowrap">
          {name}
        </span>
      )}
    </div>
  );
}
export default HeaderItem;
