

document.addEventListener("click", (event) => {
	if (event.target.classList.contains("btn-outline-primary")) {
		const teamCode = event.target.dataset.teamCode;

		if (!teamCode) {
			alert("팀 코드가 입력되지 않았습니다.");
		} else {
			// 이 경우 teamSquad.jsp로 이동하고 teamCode를 넘겨줍니다.
			window.location.href = `squadByTeam.jsp?teamCode=${teamCode}`;
		}
	}
});

function getQueryParams() {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	return urlParams;
}
const queryParams = getQueryParams();
const leagueCode = parseInt(queryParams.get("leagueCode"), 10);

const currentYear = new Date().getFullYear();
let currentSeason = currentYear; // 기본값으로 현재 년도 설정

fetchStandings(currentSeason); // 처음 실행할 때 기본 시즌 결과 표시

function fetchStandings(currentSeason) {
	const settings = {
		async: true,
		crossDomain: true,
		url: `https://api-football-v1.p.rapidapi.com/v3/standings?league=${leagueCode}&season=${currentSeason}`,
		method: "GET",
		headers: {
			"x-rapidapi-host": "api-football-v1.p.rapidapi.com",
			"x-rapidapi-key": "735987fbd7mshc0c8b4d80a39ab8p19e685jsn1cb7e725f808",
		},
	};

	$.ajax(settings).done(function(response) {
		console.log(response);
		if (!response.response[0] || !response.response[0].league || !response.response[0].league.standings || !response.response[0].league.standings[0]) {
			currentSeason -= 1;
			fetchStandings(currentSeason);
			return;
		}
		const data = response.response[0].league.standings[0]; // 필요한 정보 추출
		const leagueData = response.response[0].league;
		const leagueContent = ` 
		   <img src="${leagueData.logo}" alt="${leagueData.name}" /><br>
		   <div class="row">	
		        <div class="col-auto me-auto"><h1>🏆${leagueData.name} 순위표 (${leagueData.country})</h1></div>
    			<div class="col-auto mt-3">
					<button class="btn btn-dark" id="prevSeason">이전 시즌</button>
					<button class="btn btn-danger" id="currentSeason">현재 시즌</button>
				</div>
			</div>
		   <h3> 모든 팀의 승점이 0 이라면, 이전 시즌 버튼 클릭 바랍니다.(유럽은 6월~7월 비시즌)</h3>
		   <hr>
		   `;
		$("#leagueContent").html(leagueContent);

		let tableHtml = '<table class="table table-striped">'; // HTML 테이블 구성
		tableHtml += "<thead><tr><th>순위</th><th></th><th>팀</th><th>라운드 수</th><th>승리</th><th>무승부</th><th>패배</th><th>골득실</th><th>승점</th><th>팀 코드</th><th>팀 스쿼드</th></tr></thead><tbody>";
		for (let i = 0; i < data.length; i++) {
			const teamData = data[i];
			const rank = teamData.rank;
			const teamName = teamData.team.name;
			const teamLogo = teamData.team.logo;
			const playedGames = teamData.all.played;
			const wonGames = teamData.all.win;
			const drawGames = teamData.all.draw;
			const lostGames = teamData.all.lose;
			const goalDifference = teamData.goalsDiff;
			const points = teamData.points;
			const teamCode = teamData.team.id;
			tableHtml += `<tr><td>${rank}</td><td><img src="${teamLogo}" alt="${teamName}" width="40"></td><td>${teamName}</td><td>${playedGames}</td><td>${wonGames}</td><td>${drawGames}</td><td>${lostGames}</td><td>${goalDifference}</td><td style="color:blue">${points}</td><td style="color:red">${teamCode}</td><td><button class="btn btn-outline-primary" data-team-code="${teamCode}">팀 스쿼드</button></td></tr>`; // 테이블에 정보 추가
		}
		tableHtml += "</tbody></table>";
		$("#standingTable").html(tableHtml); // 테이블을 적절한 위치에 추가
		registerEventListeners();
	});
}

function registerEventListeners() {
	document.querySelector("#prevSeason").addEventListener("click", function() {
		currentSeason -= 1;
		fetchStandings(currentSeason);
	});
	document.querySelector("#currentSeason").addEventListener("click", function() {
		currentSeason = currentYear;
		fetchStandings(currentSeason);
	});
};



