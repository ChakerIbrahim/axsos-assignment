<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Book Details</title>
</head>
<body>
	<h1><c:out value="${book.title}"/></h1>
	
	<p><strong>Description:</strong> <c:out value="${book.description}"/></p>
	<p><strong>Language:</strong> <c:out value="${book.language}"/></p>
	<p><strong>number of Pages:</strong> <c:out value="${book.numberOfPages}"/></p>
</body>
</html>