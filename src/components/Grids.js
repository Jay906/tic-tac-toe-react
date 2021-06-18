import React, { useState, useEffect } from "react";
import Grid from "./Grid";
import Players from "./Players";

function Grids() {
  //   Create a nested array with 3 arrays which represent every row
  const initialArray = Array.from({ length: 3 }, () => Array(3).fill(""));
  const [isX, setIsX] = useState(true);
  const [gridsArray, setGridsArray] = useState(initialArray);
  const [players, setPlayers] = useState({
    player1: 0,
    player2: 0,
  });

  const someoneHasWon = (array) => {
    for (let i in array) {
      if (array[i].every((item) => item === "X")) return "X";
      else if (array[i].every((item) => item === "O")) return "O";
    }
    if (
      (array[0][0] === "X" && array[1][1] === "X" && array[2][2] === "X") ||
      (array[0][2] === "X" && array[1][1] === "X" && array[2][0] === "X") ||
      (array[0][0] === "X" && array[1][0] === "X" && array[2][0] === "X") ||
      (array[0][1] === "X" && array[1][1] === "X" && array[2][1] === "X") ||
      (array[0][2] === "X" && array[1][2] === "X" && array[2][2] === "X")
    )
      return "X";
    else if (
      (array[0][0] === "O" && array[1][1] === "O" && array[2][2] === "O") ||
      (array[0][2] === "O" && array[1][1] === "O" && array[2][0] === "O") ||
      (array[0][0] === "O" && array[1][0] === "O" && array[2][0] === "O") ||
      (array[0][1] === "O" && array[1][1] === "O" && array[2][1] === "O") ||
      (array[0][2] === "O" && array[1][2] === "O" && array[2][2] === "O")
    )
      return "O";
    return false;
  };

  const arrayIsFull = (array) => {
    for (let i in array) {
      if (array[i].some((item) => item === "")) return false;
    }
    return true;
  };

  const onClick = (rowIndex = 0, itemIndex = 0) => {
    //   get the index of the row and then index of the item in the row
    const newArray = [...gridsArray];
    if (newArray[rowIndex][itemIndex] !== "")
      return window.alert("This grid is already taken");
    if (isX) {
      newArray[rowIndex][itemIndex] = "X";
    } else {
      newArray[rowIndex][itemIndex] = "O";
    }
    setIsX(!isX);
    setGridsArray(newArray);
    if (arrayIsFull(newArray)) {
      setTimeout(() => setGridsArray(initialArray), 500);
      setIsX(true);
    }
  };

  useEffect(() => {
    let timer;
    const newPlayers = { ...players };
    if (someoneHasWon(gridsArray) === "X") {
      newPlayers.player1 += 1;
      timer = setTimeout(() => {
        setPlayers(newPlayers);
        setGridsArray(initialArray);
        setIsX(true);
      }, 500);
    } else if (someoneHasWon(gridsArray) === "O") {
      newPlayers.player2 += 1;
      timer = setTimeout(() => {
        setPlayers(newPlayers);
        setGridsArray(initialArray);
        setIsX(true);
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [gridsArray, initialArray, players]);

  return (
    <>
      <Players players={players} />
      <div className="grids">
        {gridsArray.map((arr, index) => (
          <Grid key={index} arr={arr} rowIndex={index} onClick={onClick} />
        ))}
      </div>
    </>
  );
}

export default Grids;
