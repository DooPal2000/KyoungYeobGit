const settings = {
    async: true,
    crossDomain: true,
    url: "https://api-football-v1.p.rapidapi.com/v3/standings?league=292&season=2023",
    method: "GET",
    headers: {
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
      "x-rapidapi-key": "735987fbd7mshc0c8b4d80a39ab8p19e685jsn1cb7e725f808",
    },
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    const data = response.response[0].league.standings[0]; // 필요한 정보 추출
    let tableHtml = '<table class="table table-striped">'; // HTML 테이블 구성
    tableHtml += "<thead><tr><th>순위</th><th></th><th>팀</th><th>플레이한 라운드 수</th><th>승리</th><th>무승부</th><th>패배</th><th>골득실</th><th>승점</th></tr></thead><tbody>";
    for (let i = 0; i < 12; i++) {
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

      tableHtml += `<tr><td>${rank}</td><td><img src="${teamLogo}" alt="${teamName}" width="30"></td><td>${teamName}</td><td>${playedGames}</td><td>${wonGames}</td><td>${drawGames}</td><td>${lostGames}</td><td>${goalDifference}</td><td>${points}</td></tr>`; // 테이블에 정보 추가
    }
    tableHtml += "</tbody></table>";
    $("#myTable").html(tableHtml); // 테이블을 적절한 위치에 추가
  });
