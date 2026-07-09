<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%-- JSTL core tags (c:) --%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Dashboard</title>
</head>
<body>
<%-- Greet the logged-in user by name, using the "user" object
     the controller fetched with the ID stored in session --%>
<h1>Welcome, <c:out value="${user.userName}" />!</h1>
<p>This is your dashboard. Nothing to see here yet.</p>

<%-- The logout button: hitting /logout terminates the session --%>
<a href="/logout">logout</a>
</body>
</html>