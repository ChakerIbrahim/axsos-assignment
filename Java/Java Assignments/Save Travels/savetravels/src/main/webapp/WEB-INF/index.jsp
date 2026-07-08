<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Save Travels</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
<div class="container">
    <h1 class="brand">Save Travels</h1>

    <!-- ===================== Expenses Table ===================== -->
    <table>
        <thead>
        <tr>
            <th>Expense</th>
            <th>Vendor</th>
            <th>Amount</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <c:forEach var="exp" items="${expenses}">
            <tr>
                <!-- Clicking the expense name goes to the Show page -->
                <td><a href="/expenses/${exp.id}"><c:out value="${exp.name}"/></a></td>
                <td><c:out value="${exp.vendor}"/></td>
                <td><fmt:formatNumber value="${exp.amount}" type="currency" currencySymbol="$"/></td>
                <td class="actions">
                    <a href="/expenses/edit/${exp.id}">edit</a>
                    <!-- RESTful DELETE via hidden _method -->
                    <form action="/expenses/${exp.id}" method="post" class="inline">
                        <input type="hidden" name="_method" value="delete">
                        <button type="submit" class="delete-btn">delete</button>
                    </form>
                </td>
            </tr>
        </c:forEach>
        </tbody>
    </table>

    <!-- ===================== Add an Expense Form ===================== -->
    <h2>Add an expense:</h2>
    <form:form action="/expenses" method="post" modelAttribute="expense">
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