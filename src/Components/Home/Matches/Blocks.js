import React, { Component } from "react";
import Slide from "react-reveal/Slide";

import { dbMatches } from "../../../firebase";
import { dbLooper } from "../../UI/misc";
import MatchesBlock from "../../UI/matches_block";

class Blocks extends Component {
  state = {
    matches: []
  };

  componentDidMount() {
    dbMatches
      .limitToLast(6)
      .once("value")
      .then(snapshot => {
        const matches = dbLooper(snapshot);
        this.setState({
          matches: matches.reverse()
        });
      });
  }

  showMatches = matches =>
    matches
      ? matches.map((match, index) => (
          <Slide bottom key={index}>
            <div className="item">
              <div className="wrapper">
                <MatchesBlock match={match} />
              </div>
            </div>
          </Slide>
        ))
      : null;

  render() {
    return (
      <div className="home_matches">{this.showMatches(this.state.matches)}</div>
    );
  }
}

export default Blocks;
