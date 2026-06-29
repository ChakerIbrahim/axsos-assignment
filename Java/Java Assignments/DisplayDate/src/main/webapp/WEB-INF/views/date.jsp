<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Date</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <div class="container">
        <h1>Date</h1>
        <p class="display">
            <fmt:formatDate value="${now}" pattern="EEEE, MMM dd, yyyy"/>
        </p>
        <a href="/">Back to Dashboard</a>
    </div>
    <script src="/js/alert.js"></script>
</body>
</html>