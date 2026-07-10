<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%-- JSTL core tags (c:) --%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<%-- Remember to include your form tag library at the beginning of your code! --%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Login and Registration</title>
</head>
<body>
<h1>Welcome!</h1>
<p>Join our growing community.</p>

<h2>Register</h2>
<%-- The registration form is bound to the empty "newUser" User instance.
     On submit it sends a POST request to /register. --%>
<form:form action="/register" method="post" modelAttribute="newUser">
    <p>
        <form:label path="userName">Username:</form:label>
        <form:input path="userName" />
        <form:errors path="userName" />
    </p>
    <p>
        <form:label path="email">Email:</form:label>
        <form:input path="email" />
        <form:errors path="email" />
    </p>
    <p>
        <form:label path="password">Password:</form:label>
            <%-- form:password renders a password input (hidden characters) --%>
        <form:password path="password" />
        <form:errors path="password" />
    </p>
    <p>
        <form:label path="confirm">Confirm PW:</form:label>
        <form:password path="confirm" />
        <form:errors path="confirm" />
    </p>
    <input type="submit" value="Submit" />
</form:form>

<h2>Log in</h2>
<%-- The login form is bound to the empty "newLogin" LoginUser instance.
     On submit it sends a POST request to /login. --%>
<form:form action="/login" method="post" modelAttribute="newLogin">
    <p>
        <form:label path="email">Email:</form:label>
        <form:input path="email" />
        <form:errors path="email" />
    </p>
    <p>
        <form:label path="password">Password:</form:label>
        <form:password path="password" />
        <form:errors path="password" />
    </p>
    <input type="submit" value="Submit" />
</form:form>
</body>
</html>