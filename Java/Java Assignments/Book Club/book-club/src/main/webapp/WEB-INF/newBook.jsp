<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Add a Book</title>
</head>
<body>
	<h1>Add a Book to Your Shelf!</h1>
	<a href="/books">back to the shelves</a>

	<%-- The form is bound to the empty "book" object.
	     On submit it POSTs to /books.
	     Validations: Title, author and thoughts must not be blank. --%>
	<form:form action="/books" method="post" modelAttribute="book">
		<p>
			<form:label path="title">Title:</form:label>
			<form:input path="title" />
			<form:errors path="title" />
		</p>
		<p>
			<form:label path="author">Author:</form:label>
			<form:input path="author" />
			<form:errors path="author" />
		</p>
		<p>
			<form:label path="myThoughts">My thoughts:</form:label>
			<%-- form:textarea renders a bigger, multi-line input --%>
			<form:textarea path="myThoughts" />
			<form:errors path="myThoughts" />
		</p>
		<input type="submit" value="Submit" />
	</form:form>
</body>
</html>
