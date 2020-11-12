import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Peer from "peerjs";

function AskForHelp(props) {
  const [state, setState] = useState("Waiting for establishing connection...");
  const [text, setText] = useState("Pick up one of the users");
  const [peer, setPeer] = useState(new Peer());
  const [user, setUser] = useState({ id: "" });
  const [candidates, setCandidate] = useState([]);
  const [otherUser, setOtherUser] = useState({ pickUser: false });
  const [connection, setConnection] = useState(null);
  const [recommdation, setRecommdation] = useState(null);

  useEffect(() => {
    peer.on("open", (id) => {
      setState("Connected.");
      setUser({ id: id });
    });
    if (connection) {
      connection.on("open", () => {
        connection.on("data", (data) => {
          setRecommdation(data);
          setText("She/He recommends this to you")
        });
        setState("Connected to user");
        setText("Your position is sent to other user");
        connection.send(props.user);
      });
    }
  });

  const getCandidate = () => {
    fetch("http://ec2-3-83-164-100.compute-1.amazonaws.com:8088/p2p/getID.do", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 0) {
          let candidateIdString = data.data;
          let candidateId = candidateIdString.split(" ");
          setCandidate(candidateId);
        }
      });
  };

  let recoLink;

  if (recommdation) {
    recoLink = <a href={recommdation.url}>{recommdation.name}</a>;
  }

  const candidateList = candidates.map((candidate) => (
    <li
      className="list-group-item"
      onClick={() => {
        setOtherUser({ id: candidate, pickUser: true });
        setState(`Connecting to ${candidate}`);
        let conn = peer.connect(candidate);
        setConnection(conn);
      }}
    >
      {candidate}
    </li>
  ));

  if (otherUser.pickUser) {
    return (
      <div className="DialogContent Card" style={{ background: "white" }}>
        <div className="card-body">
          <h1 className="card-title">{state}</h1>
          <h6 className="card-subtitle mb-2 text-muted">
            Your id is {user.id}
          </h6>

          <p className="card-text">{text}</p>
        </div>
        <div className="card-body">{recoLink}</div>
      </div>
    );
  } else {
    return (
      <div className="DialogContent Card" style={{ background: "white" }}>
        <div className="card-body">
          <h1 className="card-title">{state}</h1>
          <h6 className="card-subtitle mb-2 text-muted">
            Your id is {user.id}
          </h6>
          <p className="card-text">{text}</p>
        </div>
        <ul
          className="list-group list-group-flush"
          style={{ overflow: "scroll", maxHeight: "500px" }}
        >
          {candidateList}
        </ul>
        <div className="card-body">
          <button className="btn btn-primary" onClick={() => getCandidate()}>
            refresh
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.position,
  };
}

export default connect(mapStateToProps, null)(AskForHelp);
