import React, { useState, useEffect } from "react";
import Peer from "peerjs";

function ProvideHelp(props) {
  const [state, setState] = useState("Waiting for establishing connection...");
  const [peer, setPeer] = useState(new Peer());
  const [user, setUser] = useState({ id: "" });
  const [comm, setComm] = useState(
    "People who ask for help will see your id, please stay at this card."
  );
  const [list, setList] = useState([]);
  const [conn, setConn] = useState();
  const [restaurants, setRes] = useState([])

  useEffect(() => {
    peer.on("open", (id) => {
      setUser({ id: id });
      fetch(
        "http://ec2-3-83-164-100.compute-1.amazonaws.com:8088/p2p/saveID.do",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `inputID=${id}`,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 0) setState("Registered.");
        });
    });
    peer.on('connection',(conn)=>{
      setState('Please recommand a restaurant');
      conn.on('open',()=>{
        conn.on('data',(data)=>{
          console.log(data) 
          fetch("http://ec2-3-83-164-100.compute-1.amazonaws.com:8088/yelp-fusion/requestRecommend.do",{
            method: 'POST',
            mode:'cors',
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `latitude=${data.latitude}&longitude=${data.longitude}&price=1&term=Chinese`,
          }).then(response=>response.json())
          .then((res)=>{
            console.log(res)
            setRes(JSON.parse(res.data))
          })
        })
      })
      setConn(conn);
    })
  },[]);


  let restaurantsList = restaurants.map((restaurant)=>{
    return (
      <li className="list-group-item" onClick={()=>{conn.send({name: restaurant.name, url: restaurant.url})}}>{restaurant.name}</li>
    )
  })

  return (
    <div className="DialogContent Card" style={{ background: "white" }}>
      <div className="card-body">
        <h1 className="card-title">{state}</h1>
        <h6 className="card-subtitle mb-2 text-muted">Your id is {user.id}</h6>
        <p className="card-text"></p>
        <ul
          className="list-group list-group-flush"
          style={{ overflow: "scroll", maxHeight: "500px" }}
        >
          {restaurantsList}
        </ul>
      </div>
    </div>
  );
}

export default ProvideHelp;
