<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Current visit count</title>
</head>
<body>
	<p>You have visited <a href="/">localhost:8080/</a> <span>${sessionScope.counter}</span> times</p>
	<a href="/">Test Again</a>
</body>
</html>