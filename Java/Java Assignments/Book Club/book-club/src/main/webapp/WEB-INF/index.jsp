<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<%-- Remember to include your form tag library! --%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Book Club</title>
</head>
<body>
	<h1>Book Club</h1>
	<p>A place for friends to share thoughts on books.</p>

	<h2>Register</h2>
	<%-- Registration form bound to the empty "newUser" User instance --%>
	<form:form action="/register" method="post" modelAttribute="newUser">
		<p>
			<form:label path="userName">Name:</form:label>
			<form:input path="userName" />
			<form:errors path="userName" />
		</p>
		<p>
			<form:label path="email">Email:</form:label>
			<form:input path="email" />
			<form:errors path="email" />
		</p>
		<p>
			<form:label path="password">Password:</form:label>
			<form:password path="password" />
			<form:errors path="password" />
		</p>
		<p>
			<form:label path="confirm">Confirm PW:</form:label>
			<form:password path="confirm" />
			<form:errors path="confirm" />
		</p>
		<input type="submit" value="Submit" />
	</form:form>

	<h2>Log in</h2>
	<%-- Login form bound to the empty "newLogin" LoginUser instance --%>
	<form:form action="/login" method="post" modelAttribute="newLogin">
		<p>
			<form:label path="email">Email:</form:label>
			<form:input path="email" />
			<form:errors path="email" />
		</p>
		<p>
			<form:label path="password">Password:</form:label>
			<form:password path="password" />
			<form:errors path="password" />
		</p>
		<input type="submit" value="Submit" />
	</form:form>
</body>
</html>
