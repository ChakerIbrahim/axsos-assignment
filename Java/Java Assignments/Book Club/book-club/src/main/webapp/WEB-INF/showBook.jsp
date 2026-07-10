<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title><c:out value="${book.title}" /></title>
</head>
<body>
	<h1><c:out value="${book.title}" /></h1>
	<a href="/books">back to the shelves</a>

	<%-- c:choose / c:when / c:otherwise works like if / else.
	     We compare the poster's id with the logged-in user's id. --%>
	<c:choose>

		<%-- SENSEI BONUS: if the logged-in user posted it,
		     have it say "You read..." and "Here are your thoughts" --%>
		<c:when test="${book.user.id == userId}">
			<h3>
				<c:out value="${book.user.userName}" /> (You) read
				<c:out value="${book.title}" /> by <c:out value="${book.author}" />.
			</h3>
			<p>Here are your thoughts:</p>
		</c:when>

		<%-- Otherwise the normal wording:
		     "Bella read Kafka on the Shore by Haruki Murakami." --%>
		<c:otherwise>
			<h3>
				<c:out value="${book.user.userName}" /> read
				<c:out value="${book.title}" /> by <c:out value="${book.author}" />.
			</h3>
			<p>Here are <c:out value="${book.user.userName}" />'s thoughts:</p>
		</c:otherwise>
	</c:choose>

	<%-- The thoughts themselves --%>
	<p><c:out value="${book.myThoughts}" /></p>

	<%-- NINJA BONUS: include an edit link and a delete button
	     ONLY if this book entry was posted by the person logged in --%>
	<c:if test="${book.user.id == userId}">

		<%-- Edit link to the Change your Entry page --%>
		<a href="/books/${book.id}/edit">edit</a>

		<%-- The delete button: a small form that sends a DELETE request.
		     Spring's hidden method filter turns the hidden "_method"
		     input into a real DELETE, caught by @DeleteMapping. --%>
		<form action="/books/${book.id}" method="post">
			<input type="hidden" name="_method" value="delete" />
			<input type="submit" value="delete" />
		</form>
	</c:if>
</body>
</html>
