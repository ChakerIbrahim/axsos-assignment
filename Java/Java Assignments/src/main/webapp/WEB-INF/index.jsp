<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>All Cars</title>
</head>
<body>

<h1>All Cars</h1>

<table border="1">
    <tr>
        <th>ID</th>
        <th>Car Name</th>
        <th>Car Color</th>
        <th>Car Price</th>
    </tr>

    <c:forEach var="i" items="${cars}">
        <tr>
            <td>${i.id}</td>
            <td>${i.name}</td>
            <td>${i.color}</td>
            <td>${i.price}</td>
        </tr>
    </c:forEach>

</table>

</body>
</html>