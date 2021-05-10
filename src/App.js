import React from "react";
import EsportCard from "./components/esportCard";
import "./App.css";
import CSKACard from "./components/CSKACard";
function App() {
	return (
		<>
			<div className='esports'>
				<EsportCard teamID={1651} teamName={"Virtus.pro"} /*VP_Dota2*/ />
				<EsportCard teamID={3288} teamName={"Virtus.pro"} /*VP_CSGO*/ />
				<EsportCard teamID={3216} teamName={"Na`Vi"} /*NaVi_CSGO*/ />
			</div>
			<div className='football'>
				<CSKACard />
			</div>
		</>
	);
}

export default App;
