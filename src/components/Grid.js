import React from "react";

function Grid({ arr, rowIndex, onClick }) {
  return (
    <div className="grids-column">
      {arr.map((item, index) => (
        <div
          key={index}
          className="grid"
          onClick={() => onClick(rowIndex, index)}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default Grid;
