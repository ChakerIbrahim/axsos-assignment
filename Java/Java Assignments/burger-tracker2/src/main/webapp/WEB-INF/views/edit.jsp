<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Edit Burger</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        h1 { color: #2b57d1; }
        .error { color: red; font-weight: bold; }
        .form-row { margin-bottom: 12px; max-width: 400px; }
        label { display: block; font-weight: bold; margin-bottom: 4px; }
        input[type=text], input[type=number], textarea { width: 100%; padding: 6px; box-sizing: border-box; }
        button { padding: 8px 20px; background-color: #2b57d1; color: white; border: none; cursor: pointer; }
        a.back-link { float: right; color: #2b57d1; font-weight: bold; text-decoration: none; }
    </style>
</head>
<body>
<a class="back-link" href="/">Go back</a>
<h1>Edit Burger</h1>

<form:form method="POST" modelAttribute="burger">

    <form:hidden path="id"/>

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