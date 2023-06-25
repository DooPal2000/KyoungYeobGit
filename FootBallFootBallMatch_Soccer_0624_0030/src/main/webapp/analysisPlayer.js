
const apiKey = '735987fbd7mshc0c8b4d80a39ab8p19e685jsn1cb7e725f808';

document.getElementById('analysisPlayerBtn').addEventListener('click', () => {
	const playerCodeInput = document.getElementById('playerCodeInput');
	const seasonCodeInput = document.getElementById('seasonCodeInput');

	const playerCode = playerCodeInput.value;
	const seasonCode = seasonCodeInput.value;

	if (!playerCode || !seasonCode) {
		alert('코드 두 개를 모두 입력해 주세요.');
	} else {
		loadAnalysis(playerCode, seasonCode);
	}
});
function loadAnalysis(playerCode, seasonCode) {
	const settings = {
		async: true,
		crossDomain: true,
		url: `https://api-football-v1.p.rapidapi.com/v3/players?id=${playerCode}&season=${seasonCode}`,
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': apiKey,
			'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
		}
	};

	$.ajax(settings).done(function(response) {
		console.log(response);
		const player = response.response[0].player;
		const playerStat = response.response[0].statistics;

		console.log(player);
		console.log(playerStat);

		const playerBox = document.querySelector('#playerBox');
		/*		const statBox = document.querySelector('#statBox');
		*/

		const playerCard = `
			  <div class="card text-white bg-dark mb-3" style="max-width: 800px;">
			    <div class="row g-0">
			      <div class="col-md-4">
			        <img src="${player.photo}" class="img-fluid rounded-start" alt="Player Profile Image  style="height: 500px;">
			      </div>
			      <div class="col-md-8">
			        <div class="card-body">
			          <h5 class="card-title">${player.name}</h5>
			          <p class="card-text">나이: ${player.age} (만 나이)<br> 국적: ${player.nationality}<br>신장: ${player.height} <br> 몸무게: ${player.weight} </p>
			          <p class="card-text"></p>
			        </div>
			      </div>
			    </div>
			  </div>
		`;

		// 카드 컨테이너에 카드 코드 삽입
		playerBox.innerHTML = playerCard;

		const createStatsCard = (stats) => {
			return `
			    <div class="card text-white bg-primary mb-3" style="max-width: 800px;">
			      <div class="card-header">통계 정보</div>
			      <div class="card-body">
			        <h3 class="card-title">${seasonCode} 시즌</h3> 
			        <p class="card-text">소속 리그 나라: ${stats.league.country}   <img src="${stats.league.flag}" class="img-fluid" alt=".." style="width:80px; height:80px;"> <br>소속 리그: ${stats.league.name} <img src="${stats.league.logo}" class="img-fluid" alt=".." style="width:80px; height:80px;">  </p>
			        <p class="card-text">소속 팀: ${stats.team.name}   <img src="${stats.team.logo}" class="img-fluid" alt=".." style="width:80px; height:80px;">  </p>
			        <p class="card-text">⚽ 득점! : ${stats.goals.total} <br> ⚽어시스트: ${stats.goals.assists} </p>
			        <p class="card-text">🥅 패스 : ${stats.passes.total} <br> 🥅 정확한 패스: ${stats.passes.accuracy} <br> 🥅 키 패스: ${stats.passes.key}</p>
			        <p class="card-text">🔥🔥전체 출전 수: ${stats.games.appearences} <br> 🔥선발 출전 수: ${stats.games.lineups} <br> ⏰ 출전 시간: ${stats.games.minutes} 분(minute) <br> <br>포지션: ${stats.games.position} <br> 평균 평점: ${stats.games.rating} </p>
			        
			      </div>
			    </div>
 			 `;
		}

		const displayStatsCards = () => {
			const statBox = document.getElementById('statBox'); 
			let cardsHTML = '';

			for (const stats of playerStat) {
				cardsHTML += createStatsCard(stats);
			}

			statBox.innerHTML = cardsHTML;
		}

		displayStatsCards();
	});
}










