import React from "react";

const CardSkeleton = () => {
  return (
    <div className="p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-96 bg-zinc-200 animate-pulse">
        <div className="h-32 w-full bg-zinc-100 rounded-lg"></div>
    </div>
  );
};

export default CardSkeleton;
