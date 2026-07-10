<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Change your Entry</title>
</head>
<body>
	<%-- NINJA BONUS PAGE --%>
	<h1>Change your Entry</h1>
	<a href="/books">back to the shelves</a>

	<%-- The form is bound to the EXISTING "book" object the controller
	     fetched, so data binding PRE-POPULATES every input with the
	     existing values for the book.
	     method="put": the Spring form tag automatically adds the hidden
	     "_method" input, so the request reaches our @PutMapping.
	     Validations: same as for create - even after a validation error
	     the inputs keep their values, because the submitted book object
	     is sent back to this same form. --%>
	<form:form action="/books/${book.id}" method="put" modelAttribute="book">
		<p>
			<form:label path="title">Title:</form:label>
			<form:input path="title" />
			<form:errors path="title" />
		</p>
		<p>
			<%-- "Author must not be blank" --%>
			<form:label path="author">Author:</form:label>
			<form:input path="author" />
			<form:errors path="author" />
		</p>
		<p>
			<form:label path="myThoughts">My thoughts:</form:label>
			<form:textarea path="myThoughts" />
			<form:errors path="myThoughts" />
		</p>
		<input type="submit" value="Submit" />
	</form:form>
</body>
</html>
