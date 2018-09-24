import React, { Component } from "react";
import Reveal from "react-reveal/Reveal";

import Stripes from "../../../Resources/images/stripes.png";
import { Tag } from "../../UI/misc";
import HomeCards from "./Cards";

class Players extends Component {
  state = {
    show: false
  };

  render() {
    const tags = ["Meet", "The", "Players"];
    return (
      <Reveal
        fraction={0.7}
        onReveal={() => {
          this.setState({
            show: true
          });
        }}
      >
        <div
          className="home_meetplayers"
          style={{ background: `url(${Stripes}) #fff` }}
        >
          <div className="container">
            <div className="home_meetplayers_wrapper">
              <div className="home_card_wrapper">
                <HomeCards show={this.state.show} />
              </div>
              <div className="home_text_wrapper">
                {tags.map((tag, index) => (
                  <div key={index}>
                    <Tag
                      bck="#0e1731"
                      size="100px"
                      color="#fff"
                      add={{
                        display: "inline-block",
                        marginBottom: "20px"
                      }}
                    >
                      {tag}
                    </Tag>
                  </div>
                ))}
                <div>
                  <Tag
                    bck="#fff"
                    size="27px"
                    color="#0e1731"
                    add={{
                      border: "1px solid #0e1731",
                      display: "inline-block",
                      marginBottom: "20px"
                    }}
                    linkTo="/the_team"
                  >
                    Meet the team
                  </Tag>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    );
  }
}

export default Players;
