import React, { Component } from "react";
import Fade from "react-reveal/Fade";

import Stripes from "../../Resources/images/stripes.png";
import PlayerCard from "../UI/PlayerCard";
import { dbPlayers, firebase } from "../../firebase";
import { dbLooper } from "../UI/misc";
import { Promise } from "core-js";

class Team extends Component {
  state = {
    loading: true,
    players: []
  };

  componentDidMount() {
    dbPlayers.once("value").then(snapshot => {
      const players = dbLooper(snapshot);
      let promises = [];

      for (let key in players) {
        promises.push(
          new Promise((resolve, reject) => {
            firebase
              .storage()
              .ref("players")
              .child(players[key].image)
              .getDownloadURL()
              .then(url => {
                players[key].url = url;
                resolve();
              });
          })
        );
      }

      Promise.all(promises).then(() => {
        this.setState({
          loading: false,
          players
        });
      });
    });
  }

  showPlayersByCategory = category => {
    this.state.players
      ? this.state.players.map((player, index) => {
          return player.position === category ? (
            <Fade left delay={20} key={index}>
              <div className="item">
                <PlayerCard
                  number={player.number}
                  name={player.name}
                  lastname={player.lastname}
                  bck={player.bck}
                />
              </div>
            </Fade>
          ) : null;
        })
      : null;
  };

  render() {
    console.log(this.state.players);
    return (
      <div
        className="the_team_container"
        style={{ background: `url(${Stripes}) repeat` }}
      >
        {!this.state.players ? (
          <div>
            <div className="team_category_wrapper">
              <div className="title">Keepers</div>
              <div className="team_cards">
                {this.showPlayersByCategory("Keeper")}
              </div>
            </div>
            <div className="team_category_wrapper">
              <div className="title">Defence</div>
              <div className="team_cards">
                {this.showPlayersByCategory("Defence")}
              </div>
            </div>
            <div className="team_category_wrapper">
              <div className="title">Midfield</div>
              <div className="team_cards">
                {this.showPlayersByCategory("Midfield")}
              </div>
            </div>
            <div className="team_category_wrapper">
              <div className="title">Striker</div>
              <div className="team_cards">
                {this.showPlayersByCategory("Striker")}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Team;
