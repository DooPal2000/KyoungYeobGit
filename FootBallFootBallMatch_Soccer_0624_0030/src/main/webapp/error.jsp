<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Error Page(1차)</title>
<script>
        function showAlert(message) {
            alert(message);
            // 오류 발생 시 이전 페이지로 이동하거나 원하는 동작을 수행할 수 있습니다.
            history.go(-1);
        }
 </script>
</head>
<body>
	<script>
		// 오류 메시지를 받아와서 showAlert() 함수를 호출합니다.
		var errorMessage = "${error}";
		showAlert(errorMessage);
	</script>
</body>


</body>
</html>