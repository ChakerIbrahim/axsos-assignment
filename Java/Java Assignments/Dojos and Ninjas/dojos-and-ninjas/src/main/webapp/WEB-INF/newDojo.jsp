<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%-- JSTL core tags (c:) --%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%-- Spring form tags (form:) used for data binding --%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>New Dojo</title>
</head>
<body>
<h1>New Dojo</h1>

<%-- The form is bound to the empty "dojo" object we passed from the controller.
     On submit it sends a POST request to /dojos. --%>
<form:form action="/dojos" method="post" modelAttribute="dojo">
	<p>
		<form:label path="name">Name:</form:label>
			<%-- This input is bound to the dojo's "name" attribute --%>
		<form:input path="name" />
			<%-- Shows validation errors for the name field, if any --%>
		<form:errors path="name" />
	</p>
	<input type="submit" value="Create" />
</form:form>
</body>
</html>