<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=chrome">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SoccerCalendar</title>
<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>

<!-- CSS BOOTSTRAP CODE -->
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
	crossorigin="anonymous">

<style>
@font-face {
	font-family: 'NanumSquareNeo-Variable';
	src:
		url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2')
		format('woff2');
	font-weight: normal;
	font-style: normal;
}
* {
	font-family: 'NanumSquareNeo-Variable', Courier, monospace;
	
}
#yearMonth{
	font-size: 2rem
}
</style>
<link rel="stylesheet" href="./resource/css/app.css">

</head>


<body>
	<nav class="navbar navbar-expand-lg navbar-light"
		style="background-color: #E8F6EF;">
		<div class="container-fluid">
			<a class="navbar-brand" href="index.jsp">⚽ FootBallMatch </a>
			<button class="navbar-toggler" type="button"
				data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent" aria-expanded="false"
				aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li class="nav-item"><a class="nav-link" href="teams.jsp">K리그1
							참가 팀</a></li>
					<li class="nav-item dropdown"><a
						class="nav-link dropdown-toggle" href="#"
						id="navbarDropdownStandingLink" role="button"
						data-bs-toggle="dropdown" aria-expanded="false"> 순위
					</a>
						<ul class="dropdown-menu" aria-labelledby="navbarDropdownStandingLink">
							<li><a class="dropdown-item" href="standing1.jsp">K리그1 순위</a></li>
							<li><a class="dropdown-item"	href="standing2.jsp">K리그2 순위</a></li>
							<li><a class="dropdown-item" href="standing3.jsp">EPL 순위</a></li>
							<li><a class="dropdown-item" href="standing4.jsp">라리가 순위</a></li>
							<li><a class="dropdown-item" href="standing5.jsp">세리에A 순위</a></li>														
						</ul>						
					</li>
					
					<li class="nav-item dropdown"><a
						class="nav-link dropdown-toggle" href="#"
						id="navbarDropdownScheduleLink" role="button"
						data-bs-toggle="dropdown" aria-expanded="false"> 일정
					</a>
						<ul class="dropdown-menu" aria-labelledby="navbarDropdownScheduleLink">
							<li><a class="dropdown-item" href="fixture1.jsp">K리그1 일정</a></li>
							<li><a class="dropdown-item"	href="fixture2.jsp">K리그2 일정</a></li>
							<li><a class="dropdown-item" href="fixture3.jsp">EPL 일정</a></li>
							<li><a class="dropdown-item" href="fixture4.jsp">라리가 일정</a></li>
							<li><a class="dropdown-item" href="fixture5.jsp">세리에A 일정</a></li>														
						</ul>						
					</li>					
				<li class="nav-item"><a class="nav-link" href="prediction.jsp">승부예측</a>
					</li>
					<li class="nav-item"><a class="nav-link"
						href="squadByTeam.jsp">팀 스쿼드</a></li>
					<li class="nav-item"><a class="nav-link"
						href="analysisPlayer.jsp">선수분석</a></li>
					<li class="nav-item"><a class="nav-link" href="list.do">커뮤니티</a>
					</li>
				</ul>



				<c:choose>
					<c:when test="${sessionScope.dto ne null}">
							${sessionScope.dto.nickName}님 환영합니다.
							<button type="button" class="btn btn-primary"
							onclick="location.href='logout.do'">로그아웃</button>
					</c:when>
					<c:otherwise>
						<button type="button" class="btn btn-primary"
							data-bs-toggle="modal" data-bs-target="#LoginModal">로그인</button>
					</c:otherwise>
				</c:choose>

				<!-- Modal -->
				<div class="modal fade" id="LoginModal" tabindex="-1"
					aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="ModalLabel">로그인</h5>
								<button type="button" class="btn-close" data-bs-dismiss="modal"
									aria-label="Close"></button>
							</div>

							<div class="modal-body">
								<form action="login.do" method="post">
									<div class="row mb-3">
										<label for="inputEmail" class="col-sm-3 col-form-label">이메일
											(ID)</label>
										<div class="col-sm-8">
											<input type="email" class="form-control" id="email"
												name="email">
										</div>
									</div>
									<div class="row mb-3">
										<label for="inputPassword" class="col-sm-3 col-form-label">비밀번호</label>
										<div class="col-sm-8">
											<input type="password" class="form-control" name="password"
												id="password">
										</div>
									</div>
							</div>
							<div class="modal-footer">
								<button type="submit" class="btn btn-primary">로그인</button>
								<button type="button" class="btn btn-danger"
									onclick="location.href='regMember.jsp'">회원가입</button>
								<button type="button" class="btn btn-secondary"
									data-bs-dismiss="modal">닫기</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>


	<div class="container d-flex justify-content-center mt-5">
		<h1>📅 EPL 축구 경기 일정</h1>
	</div>
	<div class="container">
		<div class="row justify-content-center gx-5">
			<div class="col-auto">
				<button class="btn btn-outline-primary" id="prevMonthBtn">이전 달</button>
			</div>
			<div class="col-auto">
				<div id="yearMonth"></div>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-primary" id="nextMonthBtn">다음 달 </button>
			</div>
		</div>
	</div>



	<div class="container">
		<div class="table table-striped" id="fixture-container"></div>
	</div>





	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
		crossorigin="anonymous"></script>

</body>
<script src="fixture3.js"></script>

</html>