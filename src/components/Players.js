import React from "react";

function Players({ players }) {
  return (
    <div>
      <h1>Player1: {players.player1}</h1>
      <h1>Player2: {players.player2}</h1>
    </div>
  );
}

export default Players;
