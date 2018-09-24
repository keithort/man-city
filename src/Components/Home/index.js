import React from "react";
import Featured from "./Featured";
import Matches from "./Matches";
import Players from "./Players";
import Promotion from "./Promotion";

const Home = () => {
  return (
    <div className="bck_blue">
      <Featured />
      <Matches />
      <Players />
      <Promotion />
    </div>
  );
};

export default Home;
