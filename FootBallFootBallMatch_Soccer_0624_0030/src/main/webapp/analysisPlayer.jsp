<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">

<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- CSS BOOTSTRAP CODE -->
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
	crossorigin="anonymous">


<link rel="stylesheet" href="./resource/css/app.css">
<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
	<style>
		#playerBox, #statBox{
			font-size:  1.5rem; !important
		}
	</style>


<title>선수 분석 페이지</title>
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

	<div class="container px-3 mt-3" id="analysisBox">
		<br>
		<h1 class="display-6">👨‍💻 이 페이지는 '선수코드'가 입력되면 선수분석을 제공하는
			페이지입니다.</h1>
		<br>
		<h5>👨‍💻 선수코드는 '팀 스쿼드' 탭에서 가져올 수 있습니다.</h5>


		<div class="row align-items-stretch">
			<div class="col-8 mt-3 row gx-3">
				<div class="form-floating col-6">
					<input type="text" class="form-control" id="playerCodeInput"
						placeholder="선수코드 입력"> <label for="playerCodeInput">선수코드</label>
				</div>
				<div class="form-floating col-6">
					<input type="text" class="form-control" id="seasonCodeInput"
						placeholder="시즌(예시: 2023)"> <label for="seasonCodeInput">시즌(예시:
						2023)</label>
				</div>
			</div>
			<div class="col-4 mt-3">
				<button type="submit" id="analysisPlayerBtn"
					class="btn btn-outline-dark btn-lg">선수분석 보기</button>
			</div>
		</div>
	</div>

	<div class="container px-3 mt-3" id="playerBox"></div>
	<div class="container px-3 mt-3" id="statBox"></div>
	



	<div class="container mt-3"></div>



	<script src="analysisPlayer.js"></script>
	<!-- BOOTSTRAP JS_CODE -->
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
		crossorigin="anonymous"></script>
</body>
</html>