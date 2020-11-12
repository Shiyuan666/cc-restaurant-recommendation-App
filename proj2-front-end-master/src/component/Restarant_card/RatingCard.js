import React from 'react'
import './Card.css'

function RatingCard(props){
    return (
        <div className={props.classList + "card myCard"}>
            <img src={props.img} style={{maxHeight:"400px"}} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                    <button onClick={()=>{props.addScore(5); props.nextRestaurant(props.index+1)}} style={{background:'rgb(136,167,179)', color:"white"}}className="btn">Like it!</button>
                    <button onClick={()=>{props.addScore(1); props.nextRestaurant(props.index+1)}}  style={{background:'rgb(196,150,168)', color:"white", marginLeft:'10px'}} className="btn">No No No</button>
            </div>
        </div>
    )
}

export default RatingCard