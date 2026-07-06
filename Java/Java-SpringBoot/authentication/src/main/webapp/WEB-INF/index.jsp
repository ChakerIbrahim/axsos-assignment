<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Login & Registration</title>
</head>
<body>
	<h1>Welcome!</h1>
	<p>Join our growing comunity.</p>
	
	<div>
		<h2>Register</h2>
		<form:form action="/register" modelAttribute="newUser" method="POST">
			<label>User Name:</label>
			<form:input path="userName"/>
			<form:errors path="userName" /><br/>
			
			<label>Email:</label>
			<form:input path="email"/>
			<form:errors path="email" /><br/>
			
			<label>Password:</label>
			<form:password path="password" />
			<form:errors path="password" /><br/>
			
			<label>Confirm PW</label>
			<form:password path="confirm"/>
			<form:errors path="confirm" /><br/>
			
			<input type="submit" value="Submit" />
		</form:form>
	</div>
	
	<div>
	<h2>log in</h2>
	<form:form action="login" modelAttribute="newLogin" method="POST">
		<label>Email:</label>
		<form:input path="email"/>
		<form:errors path="email" /><br/>
		
		<label>Password:</label>
		<form:password path="password" />
		<form:errors path="password" /><br/>
		
		<input type="submit" value="Submit" />
	</form:form>
	</div>
	
</body>
</html>