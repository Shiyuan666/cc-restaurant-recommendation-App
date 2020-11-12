import React from 'react'
import './Card.css'

function Card(props){
    return (
        <div className={props.classList + "card myCard"} style={{width: "18rem"}}>
            <img src={props.img} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <a href={props.url} className="btn btn-primary" target="_blank">Details</a>
            </div>
        </div>
    )
}

export default Card