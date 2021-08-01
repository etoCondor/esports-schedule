import React, { useState, useEffect } from "react";
import { getCSKAMatches } from "../../fetchService/getMatches";
import "./style.css";
import Spinner from "../spinner";

function CSKACard() {
	const [loading, setLoading] = useState(true);
	const [teamMatches, setTeamMatches] = useState(null);

	useEffect(() => {
		if (!teamMatches) {
			getteamMatches();
		}
	});

	async function getteamMatches() {
		setLoading(true);
		const currentFullDate = new Date();
		const currentDate =
			currentFullDate.getDate().toString().length === 2
				? currentFullDate.getDate()
				: `0${currentFullDate.getDate()}`;
		const currentMonth =
			currentFullDate.getMonth().toString().length === 2
				? currentFullDate.getMonth() + 1
				: `0${currentFullDate.getMonth() + 1}`;
		const dateString = `${currentFullDate.getFullYear()}-${currentMonth}-${currentDate}`;
		const matches = await getCSKAMatches(dateString);
		setTeamMatches(matches);
		setLoading(false);
	}

	function dateCorrector(date) {
		const currentDate =
			date.getDate().toString().length === 2
				? date.getDate()
				: `0${date.getDate()}`;
		const currentMonth =
			(1 + date.getMonth()).toString().length === 2
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
			let currentI = [];
			// return teamMatches.data?.reverse().map((item, i) => {
			return teamMatches.data?.map((item, i) => {
				const date = new Date(item.match_start_iso);
				let today = false;
				if (
					date.getDate() === new Date().getDate() &&
					date.getMonth() === new Date().getMonth() &&
					date.getYear() === new Date().getYear()
				) {
					today = true;
				}
				if (
					(item.home_team.team_id === 6184 ||
						item.away_team.team_id === 6184) &&
					currentI.length < 2 &&
					date.getDate() >= new Date().getDate() &&
					date.getMonth() >= new Date().getMonth() &&
					date.getYear() >= new Date().getYear()
				) {
					currentI.push(i);
					return (
						<div key={i} className={`footballCard ${today ? "todayBall" : ""}`}>
							<div className='versus'>
								<img alt={item.home_team.name} src={item.home_team.logo}></img>

								<div className='score'>
									<p>
										{item.home_team.name} vs {item.away_team.name}
									</p>

									<br />
									<p>
										{item.stats.home_score} : {item.stats.away_score}
									</p>
									<br />
								</div>

								<img alt={item.away_team.name} src={item.away_team.logo}></img>
							</div>
							<div className='date'>
								<span>{dateCorrector(date)}</span>
								<br />
								{today ? <span>Today!</span> : null}
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
	return loading ? <Spinner /> : items || null;
}

export default CSKACard;
