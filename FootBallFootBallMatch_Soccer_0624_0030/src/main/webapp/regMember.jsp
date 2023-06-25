<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">


<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- CSS Font Setting -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link
	href="https://fonts.googleapis.com/css2?family=Nunito:wght@300&display=swap"
	rel="stylesheet">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link
	href="https://fonts.googleapis.com/css2?family=Staatliches&display=swap"
	rel="stylesheet">

<!-- CSS BOOTSTRAP CODE -->
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
	crossorigin="anonymous">


<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>

<link rel="stylesheet" href="./resource/css/app.css">
<link rel="stylesheet" href="./resource/css/regMember.css">
<title>regMember</title>
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
						data-bs-toggle="dropdown" aria-expanded="false"> 순위 </a>
						<ul class="dropdown-menu"
							aria-labelledby="navbarDropdownStandingLink">
							<li><a class="dropdown-item"
								href="standing.jsp?leagueCode=292">K리그1 순위</a></li>
							<li><a class="dropdown-item"
								href="standing.jsp?leagueCode=293">K리그2 순위</a></li>
							<li><a class="dropdown-item"
								href="standing.jsp?leagueCode=39">EPL 순위</a></li>
							<li><a class="dropdown-item"
								href="standing.jsp?leagueCode=140">라리가 순위</a></li>
							<li><a class="dropdown-item"
								href="standing.jsp?leagueCode=135">세리에A 순위</a></li>
						</ul>						
					</li>

					<li class="nav-item dropdown"><a
						class="nav-link dropdown-toggle" href="#"
						id="navbarDropdownScheduleLink" role="button"
						data-bs-toggle="dropdown" aria-expanded="false"> 일정 </a>
						<ul class="dropdown-menu"
							aria-labelledby="navbarDropdownScheduleLink">
							<li><a class="dropdown-item" href="fixture1.jsp">K리그1 일정</a></li>
							<li><a class="dropdown-item" href="fixture2.jsp">K리그2 일정</a></li>
							<li><a class="dropdown-item" href="fixture3.jsp">EPL 일정</a></li>
							<li><a class="dropdown-item" href="fixture4.jsp">라리가 일정</a></li>
							<li><a class="dropdown-item" href="fixture5.jsp">세리에A 일정</a></li>
						</ul></li>
					<li class="nav-item"><a class="nav-link" href="prediction.jsp">승부예측</a>
					</li>
					<li class="nav-item"><a class="nav-link"
						href="squadByTeam.jsp">팀 스쿼드</a></li>
					<li class="nav-item"><a class="nav-link"
						href="analysisPlayer.jsp">선수분석</a></li>
					<li class="nav-item"><a class="nav-link" href="list.do">커뮤니티</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>

	<div class="container mt-3">
		<h3>👪 FootBallMatch 회원가입 페이지</h3>
		<hr>
		<form action="regMember.do" method="post">
			<div class="row mb-3">
				<label for="inputEmail" class="col-sm-2 col-form-label">이메일
					(ID)</label>
				<div class="col-sm-10">
					<input type="email" class="form-control" id="email" name="email"
						onchange="validEmail(this)">
				</div>
			</div>
			<div class="row mb-3">
				<label for="password" class="col-sm-2 col-form-label">비밀번호</label>
				<div class="col-sm-10">
					<input type="password" class="form-control" name="password"
						id="password" >
				</div>
			</div>
			<div class="row mb-3">
				<label for="passwordchk" class="col-sm-2 col-form-label">비밀번호
					확인</label>
				<div class="col-sm-10">
					<input type="password" class="form-control" name="passwordchk"
						id="passwordchk" onfocusout="validatePassword()">
					<div class="passwordchk-error" style="color: red;"></div>
				</div>
			</div>
			<div class="row mb-3">
				<label for="name" class="col-sm-2 col-form-label">이름 </label>
				<div class="col-sm-10">
					<input type="text" class="form-control" id="name" name="name">
				</div>
			</div>

			<div class="row mb-3">
				<label for="nickName" class="col-sm-2 col-form-label">닉네임</label>
				<div class="col-sm-10">
					<input type="text" class="form-control" id="nickName"
						name="nickName">
					<div id="nickNameCheckMsg" style="color: red;"></div>
				</div>
			</div>


			<fieldset class="row mb-3">
				<legend class="col-form-label col-sm-2 pt-0">성별</legend>
				<div class="col-sm-10">
					<div class="form-check">
						<input class="form-check-input" type="radio" name="gender"
							id="gender1" value="male" checked> <label
							class="form-check-label" for="gender1"> 남성 </label>
					</div>
					<div class="form-check">
						<input class="form-check-input" type="radio" name="gender"
							id="gender2" value="female"> <label
							class="form-check-label" for="gender2"> 여성 </label>
					</div>
				</div>
			</fieldset>

			<div class="mb-3">
				<label for="phoneNumber" class="form-label">전화번호 (-는 제외하고
					입력) </label> <input type="text" class="form-control" id="phoneNumber"
					name="phoneNumber" placeholder="01012345678">
			</div>

			<div>
				<label for="inputAddress" class="col-sm-2 col-form-label">주소</label>
				<div class="row mb-2">
					<div class="col-3">
						<input type="text" class="form-control" id="postcode"
							name="postcode" placeholder="우편번호">
					</div>
					<div class="col-3">
						<input type="button" class="form-control"
							onclick="execDaumPostcode()" value="우편번호 찾기">
					</div>
				</div>
				<div class="row mb-2"></div>

				<div class="row mb-2">
					<div class="col-3">
						<input type="text" class="form-control" id="roadAddress"
							name="roadAddress" placeholder="도로명주소">
					</div>
					<div class="col-3">
						<input type="text" class="form-control" id="jibunAddress"
							name="jibunAddress" placeholder="지번주소">
					</div>

					<div class="col-3">
						<span id="guide" class="form-control"
							style="color: #999; display: none"></span> <input type="text"
							class="form-control" id="detailAddress" name="detailAddress"
							placeholder="상세주소">
					</div>
					<div class="col-3">
						<input type="text" class="form-control" id="extraAddress"
							name="extraAddress" placeholder="참고항목">
					</div>
				</div>
			</div>
			<hr>
			<div class="d-flex justify-content-center mt-2">
				<button type="submit"   class="btn btn-primary">회원가입</button>
			</div>
		</form>
	</div>
	<script
		src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
	<script>
				//본 예제에서는 도로명 주소 표기 방식에 대한 법령에 따라, 내려오는 데이터를 조합하여 올바른 주소를 구성하는 방법을 설명합니다.
function execDaumPostcode() {
	new daum.Postcode(
			{
				oncomplete : function(data) {
					// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

					// 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
					// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
					var roadAddr = data.roadAddress; // 도로명 주소 변수
					var extraRoadAddr = ''; // 참고 항목 변수

					// 법정동명이 있을 경우 추가한다. (법정리는 제외)
					// 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
					if (data.bname !== ''
							&& /[동|로|가]$/g.test(data.bname)) {
						extraRoadAddr += data.bname;
					}
					// 건물명이 있고, 공동주택일 경우 추가한다.
					if (data.buildingName !== ''
							&& data.apartment === 'Y') {
						extraRoadAddr += (extraRoadAddr !== '' ? ', '
								+ data.buildingName
								: data.buildingName);
					}
					// 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
					if (extraRoadAddr !== '') {
						extraRoadAddr = ' (' + extraRoadAddr
								+ ')';
					}

					// 우편번호와 주소 정보를 해당 필드에 넣는다.
					document.getElementById('postcode').value = data.zonecode;
					document.getElementById("roadAddress").value = roadAddr;
					document.getElementById("jibunAddress").value = data.jibunAddress;

					// 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
					if (roadAddr !== '') {
						document.getElementById("extraAddress").value = extraRoadAddr;
					} else {
						document.getElementById("extraAddress").value = '';
					}

					var guideTextBox = document
							.getElementById("guide");
					// 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
					if (data.autoRoadAddress) {
						var expRoadAddr = data.autoRoadAddress
								+ extraRoadAddr;
						guideTextBox.innerHTML = '(예상 도로명 주소 : '
								+ expRoadAddr + ')';
						guideTextBox.style.display = 'block';

					} else if (data.autoJibunAddress) {
						var expJibunAddr = data.autoJibunAddress;
						guideTextBox.innerHTML = '(예상 지번 주소 : '
								+ expJibunAddr + ')';
						guideTextBox.style.display = 'block';
					} else {
						guideTextBox.innerHTML = '';
						guideTextBox.style.display = 'none';
					}
				}
			}).open();			
}
			

				
				
/* email valid Check  */	
function validEmail(obj){
				    if(validEmailCheck(obj)==false){
				        alert('올바른 이메일 주소를 입력해주세요.')
				        obj.value='';
				        obj.focus();
				        return false;
				    }
				}

				function validEmailCheck(obj){
				    var pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
				    return (obj.value.match(pattern)!=null)
				}
				
				
function validatePassword() { 
				  var pw = $("#password").val();
				  var pwchk = $("#passwordchk").val();
				  
				  if (pwchk=='') {
					    $("#passwordchk").removeClass("error");
					    $(".passwordchk-error").text("");
					    return false;
					  }
				
				
				  // 8자리 ~ 20자리 이내로 입력하지 않은 경우
				  if (pw.length < 8 || pw.length > 20) {
				    $("#passwordchk").addClass("error");
				    $(".passwordchk-error").text("8자리 ~ 20자리 이내로 입력해주세요.");
				    return false;
				  }
				
				  // 비밀번호에 공백이 있는 경우
				  if (pw.search(/\s/) !== -1) {
				    $("#passwordchk").addClass("error");
				    $(".passwordchk-error").text("비밀번호는 공백 없이 입력해주세요.");
				    return false;
				  }
				
				  // 영문, 숫자, 특수문자를 혼합하여 입력하지 않은 경우
				  var num = pw.search(/[0-9]/g);
				  var eng = pw.search(/[a-z]/ig);
				  var spe = pw.search(/[\s~!@#$%^&*()-=_+[\]{}|;':\",./<>?]/gi);
				  if (num < 0 || eng < 0 || spe < 0) {
				    $("#passwordchk").addClass("error");
				    $(".passwordchk-error").text("영문, 숫자, 특수문자를 혼합하여 입력해주세요.");
				    return false;
				  }
				  
				  // 비밀번호와 비밀번호 확인이 일치하지 않는 경우
				  if (pw !== pwchk) {
				    $("#passwordchk").addClass("error");
				    $(".passwordchk-error").text("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
				    return false;
				  }
				
				
				  // 모든 검증 통과한 경우
				  $("#passwordchk").removeClass("error");
				  $(".passwordchk-error").text("");
				  return true;
	}
								
	$('#nickName').on('focusout', function(){
				let tomNickName = $('#nickName').val();
				console.log("tomNickName input value = " + tomNickName);
				$.ajax({
					url : "nickNameCheck.do",		// 클라이언트가 HTTP 요청을 보낼 서버의 URL 주소
					type:  "get",			// HTTP 요청방식 (get/post)
					data: {"tomNickName": tomNickName},			// HTTP 요청과 함께 서버로 보낼 데이터
					dataType: 'text',		// 서버에서 보내줄 데이터의 타입
					// 성공적으로 값을 서버로 보냈을 경우 처리하는 코드
					success : function(result){
						console.log("tomNickName : " + result);
						if(result < 0){
							$("#nickNameCheckMsg").html('사용할 수 없는 닉네임 입니다');
						} else if(result == '1') {
							$("#nickNameCheckMsg").html('사용할 수 있는 닉네임 입니다.');
						}
					},
					error:function(){
						alert("서버요청실패");
					}
				})
			})				
			
	</script>



	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
		crossorigin="anonymous"></script>

</body>

</html>