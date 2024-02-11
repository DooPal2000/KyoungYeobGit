
const apiKey = '';

document.addEventListener("DOMContentLoaded", function(event) {
  const urlParams = new URLSearchParams(window.location.search);
  const teamCode = urlParams.get("teamCode");
  if (teamCode) {
    const teamCodeInput = document.getElementById("teamCodeInput");
    teamCodeInput.value = teamCode;
    const teamCodeBtn = document.getElementById("teamCodeBtn");
    teamCodeBtn.click();
  }
});

document.getElementById('teamCodeBtn').addEventListener('click', () => {
	const teamCodeInput = document.getElementById('teamCodeInput');
	const teamCode = teamCodeInput.value;

	if (!teamCode) {
		alert('팀코드가 입력되지 않았습니다.')
	} else {
		loadSqaud(teamCode);
	}
});

function loadSqaud(teamCode) {
	
	const settings = {
	async: true,
	crossDomain: true,
	url: `https://api-football-v1.p.rapidapi.com/v3/players/squads?team=${teamCode}`,
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': apiKey,
		'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
	console.log(response.response[0].players);
	console.log(response.response[0].team.name);
	
	const playerData = Object.values(response.response[0].players);
	const teamData = response.response[0].team;
	const cardGroup = document.querySelector("#card-group");
	const teamInfo = document.querySelector("#teamInfo");	
	
	while (cardGroup.firstChild) {
    	cardGroup.removeChild(cardGroup.firstChild);
  	}	
  
  	const teamName = document.createElement("h3");
  	teamName.textContent = teamData.name;
  	
  	const logo = document.createElement("img");
  	logo.src = teamData.logo;
  	teamName.appendChild(logo);
  	
/*  	const lineBreak = document.createElement("br");
*/  	
  	cardGroup.appendChild(teamName);
/*  	cardGroup.appendChild(lineBreak);
*/  	
  	
	playerData.forEach((player) => {
	  const playerCard = createPlayerCard(player);
	  cardGroup.appendChild(playerCard);
	});	
});
}

function createPlayerCard(player) {
  // Create the col element
  const col = document.createElement("div");
  col.className = "col";

  // Create card
  const card = document.createElement("div");
  card.className = "card";
  
  // Create card header(number)
  const cardHeader = document.createElement("div");
  cardHeader.className = "card-header";
  cardHeader.textContent = "선수코드: "+player.id;
	
  

  // Create card image
  const cardImg = document.createElement("img");
  cardImg.src = player.photo; // 이미지 소스 지정
  cardImg.className = "card-img-top";
  cardImg.alt = "No image file"; // 적절한 대체 텍스트 지정

  // Create card body
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  // Create card title
  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.innerHTML = player.name; // 선수 이름

  // Create card text
  const cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.innerHTML = "나이: " + player.age + "<br>포지션: " + player.position + "<br>등번호: " + player.number;


  // Assemble the elements
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  card.appendChild(cardHeader);
  card.appendChild(cardImg);
  card.appendChild(cardBody);
  col.appendChild(card);

  return col;
}


