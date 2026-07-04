<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page isErrorPage="true" %>    
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%> 
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<h1>Edit book</h1>
	<form:form action="/books/${book.id}" method="post" modelAttribute="book">
		<input type="hidden" name="_method" value="put>
		<div>
			 <form:label path="title">Title</form:label>
			 <form:errors path="title"/>
			 <form:input path="title"/>
		</div>
		<div>
			<form:label path="description>Desciption</form:label>
			<form:errors path="description"/>
			<form:textarea path="description"/>
		</div>
		<div>
			<form:label path="language">Language</form:label>
			<form:errors path="language"/>
			<form:input path="language"/>
		</div>
		<div>
			<form:label path="numberOfPages">Pages</form:label>
			<form:errors path="numberOfPages"/>
			<form:input type="number" path="numberOfPages"/>
		</div>
		<input type="submit" value="Submit"/>
	</form:form>	
</body>
</html>