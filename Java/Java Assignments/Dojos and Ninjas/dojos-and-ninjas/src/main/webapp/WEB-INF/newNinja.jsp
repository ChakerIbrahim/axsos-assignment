<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%-- JSTL core tags (c:) --%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%-- Spring form tags (form:) used for data binding --%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>New Ninja</title>
</head>
<body>
<h1>New Ninja</h1>

<%-- The form is bound to the empty "ninja" object.
     On submit it sends a POST request to /ninjas. --%>
<form:form action="/ninjas" method="post" modelAttribute="ninja">

	<p>
		<form:label path="dojo">Dojo:</form:label>
			<%-- Drop down select menu bound to the ninja's "dojo" attribute --%>
		<form:select path="dojo">
			<%-- Loop over all the dojos we got from the database --%>
			<c:forEach var="oneDojo" items="${dojos}">
				<%-- Each option VALUE is the id of the dojo.
                     Data binding converts this id into the Dojo object
                     and assigns the foreign key dojo_id. --%>
				<form:option value="${oneDojo.id}" path="dojo">
					<%-- This is what shows to the user as the option --%>
					<c:out value="${oneDojo.name}" />
				</form:option>
			</c:forEach>
		</form:select>
	</p>

	<p>
		<form:label path="firstName">First Name:</form:label>
		<form:input path="firstName" />
		<form:errors path="firstName" />
	</p>

	<p>
		<form:label path="lastName">Last Name:</form:label>
		<form:input path="lastName" />
		<form:errors path="lastName" />
	</p>

	<p>
		<form:label path="age">Age:</form:label>
		<form:input path="age" />
		<form:errors path="age" />
	</p>

	<input type="submit" value="Create" />
</form:form>
</body>
</html>