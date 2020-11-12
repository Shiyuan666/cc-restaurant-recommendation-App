import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Card from "./Card";
import "./Panel.css";
import RatingPanel from "./RatingPanel";

function Panel(props) {
  const [recommendation, setRecommendation] = useState({isNewUser:false, login: false, list:[], rating:[]});

  const closeRatingPanel=(state, rating)=>{
    let business_id = recommendation.list.map(res=>{
      return res.business_id;
    })
    if(recommendation.isNewUser){
      fetch('http://ec2-18-208-177-247.compute-1.amazonaws.com:5000/newuser',{
        method:'POST',
        mode:'cors',
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          user_id:props.user.userID,
          business_id:business_id,
          rating:rating
        })
      }).then(res=>{
        let url = `http://ec2-18-208-177-247.compute-1.amazonaws.com:5000?user_id=${props.user.userID}&latitude=${props.user.position.latitude}&longtitude=${props.user.position.longitude}`;
        fetch(url, {
          method: "GET",
          mode:'cors'
        })
          .then((response) => response.json())
          .then((res) => {
            let restaurants = [];
            if(res["10"] === 1){
              for(let i = 0; i < 10; i++){
                restaurants.push(res[i]);
              }
            }else{
              for(let i = 0; i < Object.keys(res).length-1; i++){
                restaurants.push(res[i]["business id"])
              }
            }
            let restaurantsPromiseArr = restaurants.map((restaurant) => {
              return fetch(
                "http://ec2-3-83-164-100.compute-1.amazonaws.com:8088/yelp-fusion/requestRecommendByID.do",
                {
                  method: "POST",
                  mode: "cors",
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                  body: `restaurantID=${restaurant}`,
                }
              ).then((response) => response.json());
            });
            Promise.all(restaurantsPromiseArr).then((rawRestaurantsArr) => {
              let restaurantsJSON = []
              for(let restaurant of rawRestaurantsArr){
                if(restaurant.status === 0){
                  let data = JSON.parse(restaurant.data)
                  restaurantsJSON.push(data)
                }
              }
              setRecommendation({list:restaurantsJSON, isNewUser: false, login:true});
            });
          });
      })
    }
  }

  useEffect(() => {
    if(props.user.userID){
      let url = `http://ec2-18-208-177-247.compute-1.amazonaws.com:5000?user_id=${props.user.userID}&latitude=${props.user.position.latitude}&longtitude=${props.user.position.longitude}`;
      fetch(url, {
        method: "GET",
        mode:'cors'
      })
        .then((response) => response.json())
        .then((res) => {
          let restaurants = [];
          let show = (res["10"] === 1);
          if(show){
            for(let i = 0; i < 10; i++){
              restaurants.push(res[i]);
            }
          }else{
            for(let i = 0; i < Object.keys(res).length-1; i++){
              restaurants.push(res[i]["business id"])
            }
          }
          let restaurantsPromiseArr = restaurants.map((restaurant) => {
            return fetch(
              "http://ec2-3-83-164-100.compute-1.amazonaws.com:8088/yelp-fusion/requestRecommendByID.do",
              {
                method: "POST",
                mode: "cors",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `restaurantID=${restaurant}`,
              }
            ).then((response) => response.json());
          });
          Promise.all(restaurantsPromiseArr).then((rawRestaurantsArr) => {
            let restaurantsJSON = []
            let i = 0;
            for(let restaurant of rawRestaurantsArr){
              if(restaurant.status === 0){
                let data = JSON.parse(restaurant.data)
                data = {...data, business_id: restaurants[i]}
                i = i + 1;
                restaurantsJSON.push(data)
              }
            }
            setRecommendation({list:restaurantsJSON, isNewUser:show, login:true});
          });
        });
    };
  },[props.user.userID]);

  const restaurantList = recommendation.list.map((restaurant, index) => (
    <Card
      key={restaurant.business_id}
      img={restaurant.image_url}
      name={restaurant.name}
      categories={restaurant.categories}
      url={restaurant.url}
    />
  ));

  console.log(recommendation)
  return (
    <div>
      <RatingPanel
        style={recommendation.isNewUser ?{}:{display: "none" }}
        login={recommendation.login}
        restaurants={recommendation.list}
        closeRatingPanel={closeRatingPanel}
      ></RatingPanel>
      <div className="App">{restaurantList}</div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, null)(Panel);
