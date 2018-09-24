import React from "react";

const PlayerCard = props => {
  return (
    <div className="player_card_wrapper">
      <div
        className="player_card_thmb"
        style={{
          background: `url(${props.bck}) #f2f9ff`
        }}
      />
      <div className="player_card_nfo">
        <div className="player_card_number">{props.number}</div>
        <div className="player_card_name">
          <span>{props.first}</span>
          <span>{props.last}</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
