<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Burger Tracker</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        h1 { color: #2b57d1; }
        h2 { color: #2b57d1; }
        table { border-collapse: collapse; width: 100%; max-width: 700px; margin-bottom: 30px; }
        th, td { border: 1px solid #333; padding: 8px 12px; text-align: left; }
        th { background-color: #f2f2f2; }
        .error { color: red; font-weight: bold; }
        .form-row { margin-bottom: 12px; max-width: 400px; }
        label { display: block; font-weight: bold; margin-bottom: 4px; }
        input[type=text], input[type=number], textarea { width: 100%; padding: 6px; box-sizing: border-box; }
        button { padding: 8px 20px; background-color: #2b57d1; color: white; border: none; cursor: pointer; }
    </style>
</head>
<body>

<h1>Burger Tracker</h1>

<table>
    <thead>
        <tr>
            <th>Burger Name</th>
            <th>Restaurant Name</th>
            <th>Rating (out of 5)</th>
            <th>Notes</th>
        </tr>
    </thead>
    <tbody>
        <c:forEach var="b" items="${burgers}">
            <tr>
                <td><c:out value="${b.burgerName}"/></td>
                <td><c:out value="${b.restaurantName}"/></td>
                <td><c:out value="${b.rating}"/></td>
                <td><c:out value="${b.notes}"/></td>
            </tr>
        </c:forEach>
    </tbody>
</table>

<h2>Add a Burger:</h2>

<form:form method="POST" action="/burgers" modelAttribute="burger">

    <div class="form-row">
        <label for="burgerName">Burger Name</label>
        <form:input path="burgerName" id="burgerName"/>
        <form:errors path="burgerName" cssClass="error"/>
    </div>

    <div class="form-row">
        <label for="restaurantName">Restaurant Name</label>
        <form:input path="restaurantName" id="restaurantName"/>
        <form:errors path="restaurantName" cssClass="error"/>
    </div>

    <div class="form-row">
        <label for="rating">Rating</label>
        <form:input path="rating" id="rating" type="number"/>
        <form:errors path="rating" cssClass="error"/>
    </div>

    <div class="form-row">
        <label for="notes">Notes</label>
        <form:textarea path="notes" id="notes" rows="4"/>
        <form:errors path="notes" cssClass="error"/>
    </div>

    <button type="submit">Submit</button>

</form:form>

</body>
</html>
