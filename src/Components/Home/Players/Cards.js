import React, { Component } from "react";
import Animate from "react-move/Animate";
import { easePolyOut } from "d3-ease";
import PlayerCard from "../../UI/PlayerCard";
import Otamendi from "../../../Resources/images/players/Otamendi.png";

class HomeCards extends Component {
  state = {
    cards: [
      {
        bottom: 90,
        left: 300
      },
      {
        bottom: 60,
        left: 200
      },
      {
        bottom: 30,
        left: 100
      },
      {
        bottom: 0,
        left: 0
      }
    ]
  };

  showAnimateCards = () =>
    this.state.cards.map((card, index) => (
      <Animate
        key={index}
        show={this.props.show}
        start={{
          left: 0,
          bottom: 0
        }}
        enter={{
          bottom: [card.bottom],
          left: [card.left],
          timing: { duration: 500, ease: easePolyOut }
        }}
      >
        {({ bottom, left }) => {
          return (
            <div
              style={{
                position: "absolute",
                bottom,
                left
              }}
            >
              <PlayerCard
                number="30"
                first="Nicolas"
                last="Otamendi"
                bck={Otamendi}
              />
            </div>
          );
        }}
      </Animate>
    ));

  render() {
    return <div>{this.showAnimateCards()}</div>;
  }
}

export default HomeCards;
