<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file ="common/header.jspf" %>
<%@ include file ="common/navigation.jspf" %>


	<div class="container mt-3">
		<h1>List Todos 페이지에 오신 것을 환영합니다!</h1>
		<table class="table table-primary">
			<thead>
				<tr>
					<th>설명</th>
					<th>타겟 날짜</th>
					<th>Is Done?</th>
					<th></th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<c:forEach items="${todos}" var="todo">
					<tr>
						<td>${todo.description}</td>
						<td>${todo.targetDate}</td>
						<td>${todo.done}</td>
						<td><a href="delete-todo?id=${todo.id}" class="btn btn-warning">Delete</a></td>
						<td><a href="update-todo?id=${todo.id}" class="btn btn-outline-success">Update</a></td>
					</tr>
				</c:forEach>
			</tbody>
		</table>
		<a href="add-todo" class="btn btn-outline-success">Add To-do</a>
	</div>
	<%@ include file ="common/footer.jspf" %>


</body>
</html>