import React, { useState, useEffect } from "react";
import { getMatches } from "../../fetchService/getMatches";
import "./style.css";
import Spinner from "../spinner";
import tbaImg from "../../img/tba.png";
import tba2Img from "../../img/tba2.png";
import moment from "moment";

function EsportCard({ teamID, teamName }) {
  const [loading, setLoading] = useState(true);
  const [teamMatches, setTeamMatches] = useState(null);

  useEffect(() => {
    if (!teamMatches) {
      getteamMatches();
    }
  });

  async function getteamMatches() {
    setLoading(true);
    const matches = await getMatches(teamID); //1651-vpDota 3216-naviCSGO 3288-vpCSGO 1669-TSDota
    setTeamMatches(matches);
    setLoading(false);
  }

  return loading ? (
    <div className="footballCard nobg">
      <Spinner />
    </div>
  ) : (
    <>
      {teamMatches?.map((item, i) => {
        const { scheduled_at } = item;
        const date = new Date(scheduled_at);
        let today = false;
        if (moment().isSame(date, "day")) {
          today = true;
        }
        if (i < 1 || today) {
          let winner = "";
          item.winner_id === teamID ? (winner = "green") : (winner = "red");
          if (item.winner_id === teamID) {
            winner = "green";
          } else if (item.winner_id === null) {
            winner = "";
          } else {
            winner = "red";
          }
          return (
            <div
              key={i}
              className={`gameCard ${item.videogame.slug} ${
                today ? "today" : ""
              }`}
            >
              <div className="videogame">
                {teamName} {item.videogame.name}
              </div>
              <p>
                {item.opponents[0]?.opponent.name || "TBA"} vs{" "}
                {item.opponents[1]?.opponent.name || "TBA"}
              </p>
              <div className="serie">{item.serie.full_name}</div>
              <div className="serie">{item.name}</div>
              <div className="serie">Best of {item.number_of_games}</div>
              <div className="versus">
                <img
                  alt={item.opponents[0]?.opponent.name}
                  src={item.opponents[0]?.opponent.image_url || tba2Img}
                ></img>

                <div className="score">
                  <p className={winner}>{`${item.results[0]?.score || 0} : ${
                    item.results[1]?.score || 0
                  }`}</p>
                </div>
                <img
                  alt={item.opponents[1]?.opponent.name}
                  src={item.opponents[1]?.opponent.image_url || tbaImg}
                ></img>
              </div>

              <div className="date">
                <span>{moment(date).format("DD.MM.yyyy HH:mm")}</span>
                <br />
                {today ? <span>Today!</span> : null}
              </div>
            </div>
          );
        }
        return null;
      })}
    </>
  );
}

export default EsportCard;
