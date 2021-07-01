async function getMatches(teamID) {
	const url = `https://api.allorigins.win/raw?url=https://api.pandascore.co/teams/${teamID}/matches?token=Y5KMbTDQ9OImOMYfc1Ns-qlX12NwKWMGWA6guV08XBxPREbMkEw`;
	const matches = await fetch(url).then((response) => response.json());
	return matches;
}

async function getCSKAMatches(date) {
	const matches = await fetch(
		`https://app.sportdataapi.com/api/v1/soccer/matches?apikey=a0e96410-acb8-11eb-8890-3f0cbf105a29&season_id=1982`,
		// `https://app.sportdataapi.com/api/v1/soccer/matches?apikey=a0e96410-acb8-11eb-8890-3f0cbf105a29&season_id=1477&date_from=${date}`,
	).then((response) => response.json());
	return matches;
}
export { getMatches, getCSKAMatches };
// https://app.sportdataapi.com/api/v1/soccer/seasons?apikey=a0e96410-acb8-11eb-8890-3f0cbf105a29&league_id=504
// `https://app.sportdataapi.com/api/v1/soccer/matches?apikey=a0e96410-acb8-11eb-8890-3f0cbf105a29&season_id=1477`,
