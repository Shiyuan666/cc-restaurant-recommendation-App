import React, { useState } from "react";
import Dialog from "../Dialog/Dialog";
import RatingCard from "./RatingCard";

function RatingPanel(props) {
  const [index, setIndex] = useState(0);
  const [showRestaurantCard, toggleShow] = useState(false);
  const [scores, setScore] = useState([]);

  const nextRestaurant = (restaurants) => {
    return (index) => {
      if (index === restaurants.length) {
        props.closeRatingPanel(false, scores)
        toggleShow(false);
      }
      setIndex(index);
    };
  };

  const addScore = (score) => {
    let newScores = scores.slice();
    newScores.push(score);
    setScore(newScores);
  };

  if (index === props.restaurants.length) {
    return <div></div>;
  }

  const restaurantCard = (
    <RatingCard
      classList="DialogContent Diaglog-card"
      img={props.restaurants[index].image_url}
      name={props.restaurants[index].name}
      categories={props.restaurants[index].categories}
      nextRestaurant={nextRestaurant(props.restaurants)}
      addScore={addScore}
      index={index}
    />
  );

  let showBanner = props.login
    ? `You have to finish your initial review, ${
        props.restaurants.length - index
      } businesses remained`
    : "You should log in before you check your recommendation";

  return (
    <div className="mask" style={props.style}>
      <div className="mask-layer"></div>
      <div className="mask-banner">
        <h1 style={{ flex: "0 0 100%" }}>{showBanner}</h1>
        <button
          onClick={() => {
            toggleShow(true);
          }}
          style={{ background: "rgb(136,167,179)", color: "white" }}
          className="btn mask-button"
        >
          show it!
        </button>
      </div>
      <Dialog show={showRestaurantCard} toggleShow={toggleShow}>
        {restaurantCard}
      </Dialog>
    </div>
  );
}

export default RatingPanel;
