<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%-- JSTL core tags (c:) --%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Dojo Page</title>
</head>
<body>
<%-- The dojo's name comes from the "dojo" object in the view model --%>
<h1><c:out value="${dojo.name}" /> Location Ninjas</h1>

<table border="1">
	<thead>
	<tr>
		<th>First Name</th>
		<th>Last Name</th>
		<th>Age</th>
	</tr>
	</thead>
	<tbody>
	<%-- We access the dojo's ninjas through dot notation: dojo.ninjas.
         No need to call the Ninja service or add the ninjas to the
         view model, because the Dojo model contains a "ninjas"
         member variable (the @OneToMany list). --%>
	<c:forEach var="oneNinja" items="${dojo.ninjas}">
		<tr>
			<td><c:out value="${oneNinja.firstName}" /></td>
			<td><c:out value="${oneNinja.lastName}" /></td>
			<td><c:out value="${oneNinja.age}" /></td>
		</tr>
	</c:forEach>
	</tbody>
</table>
</body>
</html>