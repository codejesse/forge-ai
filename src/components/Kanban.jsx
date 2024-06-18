import React from "react";

const Kanban = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 p-3">
      {/* TO DO div */}
      <div className="h-fit">
        <hr className="border-2 border-rose-600" />
        <div className="flex flex-row">
          <h1 className="font-normal text-[20px] text-[#92959E] mt-3">To do</h1>
        </div>
      </div>
      {/* doing div */}
      <div className="h-fit">
        <hr className="border-2 border-yellow-400" />
        <div className="flex flex-row">
          <h1 className="font-normal text-[20px] text-[#92959E] mt-3">Doing</h1>
        </div>
      </div>
      {/* completed div */}
      <div className="h-fit">
        <hr className="border-2 border-green-400" />
        <div className="flex flex-row">
          <h1 className="font-normal text-[20px] text-[#92959E] mt-3">Completed</h1>
        </div>
      </div>
    </div>
  );
};

export default Kanban;
