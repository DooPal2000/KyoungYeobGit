
const apiKey = '';
const leagueId = 39;

let currentMonth = new Date().getMonth() + 1;
let currentYear = new Date().getFullYear();
let yearMonth = document.getElementById('yearMonth');
let fixtures = [];

window.onload = loadFixtures;


// 버튼 클릭 이벤트 리스너 등록
document.getElementById('prevMonthBtn').addEventListener('click', () => {
	currentMonth--;
	if (currentMonth < 1) {
		currentMonth = 12;
		currentYear--;
	}
	loadFixtures();
});

document.getElementById('nextMonthBtn').addEventListener('click', () => {
	currentMonth++;
	if (currentMonth > 12) {
		currentMonth = 1;
		currentYear++;
	}
	loadFixtures();
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-outline-dark")) {
    const fixtureCode = event.target.dataset.fixtureCode;
    
    if (!fixtureCode) {
      alert("일정코드가 입력되지 않았습니다.");
    } else {
      // 이 경우 prediction.jsp로 이동하고 fixtureCode를 넘겨줍니다.
      window.location.href = `prediction.jsp?fixtureCode=${fixtureCode}`;
    }
  }
});



function renderFixtures(fixtures) {
	yearMonth.innerHTML = currentYear + '년' + currentMonth + '월'
	const table = document.createElement('table');
	table.classList.add('table');

	const thead = document.createElement('thead');
	const tbody = document.createElement('tbody');

	const headerRow = document.createElement('tr');
	const dateHeader = document.createElement('th');
	const homeTeamHeader = document.createElement('th');
	const scoreHeader = document.createElement('th');
	const awayTeamHeader = document.createElement('th');
	const codeHeader = document.createElement('th');
	const predictHeader = document.createElement('th');

	dateHeader.textContent = '경기일자';
	homeTeamHeader.textContent = 'Home Team';
	scoreHeader.textContent = 'Score';
	awayTeamHeader.textContent = 'Away Team';
	codeHeader.textContent = '일정 코드'
	predictHeader.textContent = '승부예측 바로가기'

	headerRow.appendChild(dateHeader);
	headerRow.appendChild(homeTeamHeader);
	headerRow.appendChild(scoreHeader);
	headerRow.appendChild(awayTeamHeader);
	headerRow.appendChild(codeHeader);
	headerRow.appendChild(predictHeader);
	thead.appendChild(headerRow);

	fixtures.forEach((fixture) => {
		const fixtureRow = document.createElement('tr');
		const dateCell = document.createElement('td');
		const homeTeamCell = document.createElement('td');
		const scoreCell = document.createElement('td');
		const awayTeamCell = document.createElement('td');
		const fixtureCodeCell = document.createElement('td');
		const predictButtonCell = document.createElement('td');

		// 승부예측 버튼 만들기
		const predictBtn01 = document.createElement('button');
		predictBtn01.textContent = '승부예측';
		predictBtn01.classList.add('btn');
		predictBtn01.classList.add('btn-outline-dark');
		predictButtonCell.appendChild(predictBtn01);



		const homeTeam = fixture.teams.home.name;
		const awayTeam = fixture.teams.away.name;
		const scoreHome = fixture.score.fulltime.home;
		const scoreAway = fixture.score.fulltime.away;
		const homeTeamLogo = fixture.teams.home.logo;
		const awayTeamLogo = fixture.teams.away.logo;
		const fixtureCode = fixture.fixture.id;
		
		// predictBtn01 data setting
		predictBtn01.id = `predictBtn_${fixtureCode}`;
		predictBtn01.dataset.fixtureCode = fixtureCode;


		// fixtureCode insert 
		fixtureCodeCell.textContent = fixtureCode;

		const homeTeamLogoImg = document.createElement('img');
		homeTeamLogoImg.src = homeTeamLogo;
		homeTeamLogoImg.width = "30";

		const awayTeamLogoImg = document.createElement('img');
		awayTeamLogoImg.src = awayTeamLogo;
		awayTeamLogoImg.width = "30";



		// from utc to utc+9 (Asia_Date)
		const datetimeStr = fixture.fixture.date;
		const datetime = new Date(datetimeStr.replace('T', ' '));
		const newDatetime = new Date(datetime.getTime() + 0 * 60 * 60 * 1000);

		const options = {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			hour12: false,
		};
		const newDatetimeStr = newDatetime.toLocaleString('ko-KR', options)
			.replace(/:\d{2}\s/, ' ');

		dateCell.textContent = newDatetimeStr;

		homeTeamCell.textContent = homeTeam;
		awayTeamCell.textContent = awayTeam;
		homeTeamCell.appendChild(homeTeamLogoImg);
		awayTeamCell.appendChild(awayTeamLogoImg);





		// 0-0 draw
		if (scoreHome === 0 && scoreAway === 0) {
			scoreCell.textContent = '0 - 0'
		}
		else { // else score
			scoreCell.textContent = (scoreHome || scoreAway) ? `${scoreHome} -  ${scoreAway}` : '경기 시작 전';
			if (scoreHome > scoreAway) {
				homeTeamCell.style.backgroundColor = 'lime';
				awayTeamCell.style.backgroundColor = 'crimson';
			} else if (scoreAway > scoreHome) {
				homeTeamCell.style.backgroundColor = 'crimson';
				awayTeamCell.style.backgroundColor = 'lime';
			}
		}

		fixtureRow.appendChild(dateCell);
		fixtureRow.appendChild(homeTeamCell);
		fixtureRow.appendChild(scoreCell);
		fixtureRow.appendChild(awayTeamCell);
		fixtureRow.appendChild(fixtureCodeCell);
		fixtureRow.appendChild(predictButtonCell);

		tbody.appendChild(fixtureRow);
	});

	table.appendChild(thead);
	table.appendChild(tbody);

	// 수정된 부분
	const fixtureContainer = document.getElementById('fixture-container');
	fixtureContainer.innerHTML = '';
	fixtureContainer.appendChild(table);
}



function loadFixtures() {
	let fromDate = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-01`;
	let toDate = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-31`;

	const settings = {
		async: true,
		crossDomain: true,
		url: `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${leagueId}&season=${currentYear}&from=${fromDate}&to=${toDate}&timezone=274`,
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': apiKey,
			'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
		}
	};

	$.ajax(settings).done(function(response) {
		console.log(response);
		renderFixtures(response.response);
	});
}
