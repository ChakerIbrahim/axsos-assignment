<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Burger Tracker</title>
</head>
<body>
	<h1>burger Tracker</h1>
	
	<table>
		<thead>
			<tr>
				<th>Burger Name</th>
				<th>Restaurant Name</th>
				<th>Rating(out of 5)</th>
				<th>Notes</th>
			</tr>
		</thead>
		<tbody>
			<c:forEach var="b" items="${burgers}">
				<tr>
					<td><c:out value="${b.burgerName}"/></td>
					<td><c:out value="${b.restaurantName}"/></td>
					<td><c:out value="${b.rating}"/></td>
					<td><c:out value="${b.notes}"/></td>
				</tr>
			</c:forEach>
		</tbody>
	</table>
	
	<h2>Add a Burger:</h2>
	
	<form:form method="POST" action="/burgers" modelAttribute="burger">
	
		<div>
			<label for="burgerName">Burger Name</label>
			<form:input path="burgerName"/>
			<form:errors path="burgerName"/>
		</div>
		
		<div>
			<label for="restaurantName">Restaurant Name</label>
			<form:input path="restaurantName"/>
			<form:errors path="restaurantName"/>
		</div>
		
		<div>
			<label for="rating">Rating</label>
			<form:input path="rating" type="number"/>
			<form:errors path="notes"/>
		</div>
		
		<button type="submit">Submit</button>
	</form:form>
</body>
</html>