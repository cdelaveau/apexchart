import React from "react";
import './Commun.css'
import backimage from './img/backimage.jpg';
import AnimeComponent from "./AnimeGraphComponent";


function Graph() {
  return (
    <div>
      <img src={backimage} alt="yes" className='imgback' />
      <div id="graph-div">
        <AnimeComponent />
      </div>
    </div>
  );
}
export default Graph;