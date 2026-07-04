<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Ninja Gold Game</title>
</head>
<body>

	<label for="gold">Your Gold:</label>
	<input type="text"  value="${gold}" readonly>

	<div>
		<h3>Farm</h3>
		<p>(earns 10-20 gold)</p>
		<form action="/ninja-gold" method="post">
			<input type="hidden" name="place" value="farm">
			<button type="submit">Find Gold!</button>
		</form>
	</div>

	<div>
		<h3>Cave</h3>
		<p>(earns 5-10 gold)</p>
		<form action="/ninja-gold" method="post">
			<input type="hidden" name="place" value="cave">
			<button type="submit">Find Gold!</button>
		</form>
	</div>

	<div>
		<h3>House</h3>
		<p>(earns 2-5 gold)</p>
		<form action="/ninja-gold" method="post">
			<input type="hidden" name="place" value="house">
			<button type="submit">Find Gold!</button>
		</form>
	</div>

	<div>
		<h3>Quest</h3>
		<p>(earns/takes 0-50 gold)</p>
		<form action="/ninja-gold" method="post">
			<input type="hidden" name="place" value="quest">
			<button type="submit">Find Gold!</button>
		</form>
	</div>

	<label>Activities:</label>
	<div>
		<c:forEach var="activity" items="${activities}">
			<p>${activity}</p>
		</c:forEach>
	</div>

</body>
</html>