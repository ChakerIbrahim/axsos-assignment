<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Show Expense</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
<div class="container">
    <div class="header-row">
        <h1 class="brand">Expense Details</h1>
        <a href="/expenses">Go back</a>
    </div>

    <table class="details">
        <tr>
            <td class="label">Expense Name:</td>
            <td><c:out value="${expense.name}"/></td>
        </tr>
        <tr>
            <td class="label">Expense Description:</td>
            <td><c:out value="${expense.description}"/></td>
        </tr>
        <tr>
            <td class="label">Vendor:</td>
            <td><c:out value="${expense.vendor}"/></td>
        </tr>
        <tr>
            <td class="label">Amount Spent:</td>
            <td><fmt:formatNumber value="${expense.amount}" type="currency" currencySymbol="$"/></td>
        </tr>
    </table>
</div>
</body>
</html>