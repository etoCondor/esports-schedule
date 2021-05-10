import React, { useState, useEffect } from "react";
import { getMatches } from "../../fetchService/getMatches";
import "./style.css";
import Spinner from "../spinner";

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
		const matches = await getMatches(teamID); //1651-vpDota 3216-naviCSGO 3288-vpCSGO
		setTeamMatches(matches);
		setLoading(false);
	}

	function dateCorrector(date) {
		const currentDate =
			date.getDate().toString().length === 2
				? date.getDate()
				: `0${date.getDate()}`;
		const currentMonth =
			date.getMonth().toString().length === 2
				? date.getMonth() + 1
				: `0${date.getMonth() + 1}`;
		const currentHours =
			date.getHours().toString().length === 2
				? date.getHours()
				: `0${date.getHours()}`;
		const currentMinutes =
			date.getMinutes().toString().length === 2
				? date.getMinutes()
				: `0${date.getMinutes()}`;
		return `${currentDate}.${currentMonth}.${date.getFullYear()} 
${currentHours}:${currentMinutes}`;
	}

	function renderPlayers() {
		if (!loading) {
			return teamMatches.map((item, i) => {
				const { scheduled_at } = item;
				const date = new Date(scheduled_at);
				if (i < 1) {
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
						<div key={i} className={`gameCard ${item.videogame.slug}`}>
							<div className='videogame'>
								{teamName} {item.videogame.name}
							</div>
							<div className='serie'>{item.serie.full_name}</div>
							<div className='versus'>
								<img
									alt='sasi'
									src={item.opponents[0]?.opponent.image_url}
								></img>

								<div className='score'>
									<p>
										{item.opponents[0]?.opponent.name} vs{" "}
										{item.opponents[1]?.opponent.name}
									</p>
									<p
										className={winner}
									>{`${item.results[0]?.score} : ${item.results[1]?.score}`}</p>
								</div>
								<img
									alt='sasiska'
									src={item.opponents[1]?.opponent.image_url}
								></img>
							</div>

							<div className='date'>
								<span>{dateCorrector(date)}</span>
							</div>
						</div>
					);
				}
				return null;
			});
		} else {
			return null;
		}
	}
	const items = renderPlayers(teamMatches);
	return loading ? <Spinner /> : items;
}

export default EsportCard;
