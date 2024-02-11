
const apiKey = '';

document.addEventListener("DOMContentLoaded", function(event) {
  const urlParams = new URLSearchParams(window.location.search);
  const fixtureCode = urlParams.get("fixtureCode");
  if (fixtureCode) {
    const fixtureCodeInput = document.getElementById("fixtureCodeInput");
    fixtureCodeInput.value = fixtureCode;
    const predictBtn = document.getElementById("predictBtn");
    predictBtn.click();
  }
});






document.getElementById('predictBtn').addEventListener('click', () => {
	const fixtureCodeInput = document.getElementById('fixtureCodeInput');
	const fixtureCode = fixtureCodeInput.value;

	if (!fixtureCode) {
		alert('일정코드가 입력되지 않았습니다.')
	} else {
		loadPrediction(fixtureCode);
		loadOddBook(fixtureCode);
	}
});
function loadOddBook(fixtureCode) {
	const settings = {
		async: true,
		crossDomain: true,
		url: `https://api-football-v1.p.rapidapi.com/v3/odds?fixture=${fixtureCode}`,
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': apiKey,
			'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
		}
	};

	$.ajax(settings).done(function(response) {
		console.log(response);

		const fixtureDate = response.response[0].fixture.date;
		console.log(fixtureDate);
		const bookmaker = response.response[0].bookmakers[1].bets;
		console.log(bookmaker);


		const data = bookmaker;

		const optionNames = ['Match Winner', 'Goals Over/Under', 'Double Chance'];
		const optionsToDisplay = data.filter(option => optionNames.includes(option.name));

		const containerDiv = document.querySelector('.container .row.align-items-start');
		containerDiv.innerHTML = '<h4>🍀 배당률</h4>';

		optionsToDisplay.forEach(option => {
			const optionDiv = document.createElement('div');
			optionDiv.classList.add('col');
			optionDiv.innerHTML = `<hr><strong>${option.name}</strong><br>`;

			option.values.forEach(value => {
				optionDiv.innerHTML += `${value.value} : ${value.odd}<br>`;
			});

			containerDiv.appendChild(optionDiv);
		});
	});
}

function loadPrediction(fixtureCode) {
	const settings = {
		async: true,
		crossDomain: true,
		url: `https://api-football-v1.p.rapidapi.com/v3/predictions?fixture=${fixtureCode}`,
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': apiKey,
			'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
		}
	};

	$.ajax(settings).done(function(response) {
		console.log(response);

		const predictions = response.response[0].predictions.advice;
		const homeTeam = response.response[0].teams.home;
		const awayTeam = response.response[0].teams.away;
		const homeTeamLogo = homeTeam.logo;
		const awayTeamLogo = awayTeam.logo;


		const homeRecentGames = response.response[0].teams.home.league.form;
		const awayRecentGames = response.response[0].teams.away.league.form;
		const homeRecent5Games = homeRecentGames.substr(homeRecentGames.length - 5);
		const awayRecent5Games = awayRecentGames.substr(awayRecentGames.length - 5);


		const homeTeamLogoImg = document.createElement('img');
		homeTeamLogoImg.src = homeTeamLogo;
		homeTeamLogoImg.width = "50";

		const awayTeamLogoImg = document.createElement('img');
		awayTeamLogoImg.src = awayTeamLogo;
		awayTeamLogoImg.width = "50";


		console.log(predictions);

		// Creating a text element above the table
		const predictBox = document.getElementById('predictBox');
		const textAboveTable = document.createElement('p');
		textAboveTable.innerHTML = `<br><h2>🎲 추천하는 베팅</h2><br><h2><span style='color: red'>${predictions}</span></h2><hr>`
		predictBox.appendChild(textAboveTable);



		// Creating the table
		const table = document.createElement('table');
		table.classList.add('table');
		table.classList.add('mt-5');
		table.classList.add('px-3');



		// Creating the table header
		const tableHeader = document.createElement('thead');
		const tableHeaderRow = document.createElement('tr');
		const th1 = document.createElement('th');
		th1.textContent = 'Home Team';
		const th2 = document.createElement('th');
		th2.textContent = '최근 5경기(Home)';
		const th3 = document.createElement('th');
		th3.textContent = 'Away Team';
		const th4 = document.createElement('th');
		th4.textContent = '최근 5경기(Away)';

		tableHeader.appendChild(th1);
		tableHeader.appendChild(th2);
		tableHeader.appendChild(th3);
		tableHeader.appendChild(th4);
		tableHeader.appendChild(tableHeaderRow);
		table.appendChild(tableHeader);

		table.classList.add('table');

		// Creating the table row for data
		const dataRow = document.createElement('tr');

		// Home Team
		const homeTeamCell = document.createElement('td');
		homeTeamCell.textContent = homeTeam.name;
		homeTeamCell.appendChild(homeTeamLogoImg);

		// Away Team
		const awayTeamCell = document.createElement('td');
		awayTeamCell.textContent = awayTeam.name;
		awayTeamCell.appendChild(awayTeamLogoImg);

		const homeRecent5Cell = document.createElement('td');
		homeRecent5Cell.style.background = 'black';
		homeRecent5Cell.innerHTML = colorizeResults(homeRecent5Games);


		const awayRecent5Cell = document.createElement('td');
		awayRecent5Cell.style.background = 'black';
		awayRecent5Cell.innerHTML = colorizeResults(awayRecent5Games);



		dataRow.appendChild(homeTeamCell);
		dataRow.appendChild(homeRecent5Cell);

		dataRow.appendChild(awayTeamCell);
		dataRow.appendChild(awayRecent5Cell);

		table.appendChild(dataRow);
		// Appending the table to the document body or any desired HTML element
		predictBox.appendChild(table);
	});
}






function colorizeResults(results) {
	let coloredResults = '';
	for (let i = 0; i < results.length; i++) {
		if (results[i] === 'W') {
			coloredResults += '<span style="color: #00FF00;">' + results[i] + '</span>';
		} else if (results[i] === 'L') {
			coloredResults += '<span style="color: red;">' + results[i] + '</span>';
		} else if (results[i] === 'D') {
			coloredResults += '<span style="color: white;">' + results[i] + '</span>';
		}
	}
	return coloredResults;
}
