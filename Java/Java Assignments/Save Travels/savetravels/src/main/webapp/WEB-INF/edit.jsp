<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Edit Expense</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
<div class="container">
    <div class="header-row">
        <h1 class="brand">Edit Expense</h1>
        <a href="/expenses">Go back</a>
    </div>

    <!-- RESTful UPDATE: the hidden _method input turns this POST into a PUT -->
    <form:form action="/expenses/${expense.id}" method="post" modelAttribute="expense">
        <input type="hidden" name="_method" value="put">
        <!-- keep the id bound so save() performs an UPDATE, not an INSERT -->
        <form:hidden path="id"/>
        <p>
            <form:label path="name">Expense Name:</form:label>
            <form:input path="name"/>
            <form:errors path="name" cssClass="error"/>
        </p>
        <p>
            <form:label path="vendor">Vendor:</form:label>
            <form:input path="vendor"/>
            <form:errors path="vendor" cssClass="error"/>
        </p>
        <p>
            <form:label path="amount">Amount:</form:label>
            <form:input type="number" step="0.01" path="amount"/>
            <form:errors path="amount" cssClass="error"/>
        </p>
        <p>
            <form:label path="description">Description:</form:label>
            <form:textarea path="description" rows="4"/>
            <form:errors path="description" cssClass="error"/>
        </p>
        <input type="submit" value="Submit" class="submit-btn">
    </form:form>
</div>
</body>
</html>