<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Book Club - Shelves</title>
</head>
<body>
	<%-- Welcome the user with their name --%>
	<h1>Welcome, <c:out value="${user.userName}" /></h1>
	<a href="/logout">logout</a>

	<p>Books from everyone's shelves:</p>
	<a href="/books/new">+ Add a book to my shelf!</a>

	<%-- The table should include all books --%>
	<table border="1">
		<thead>
			<tr>
				<th>ID</th>
				<th>Title</th>
				<th>Author Name</th>
				<th>Posted By</th>
			</tr>
		</thead>
		<tbody>
			<%-- Loop over every book in the database --%>
			<c:forEach var="oneBook" items="${books}">
				<tr>
					<td><c:out value="${oneBook.id}" /></td>
					<td>
						<%-- Title of the book is also a link to that book's details --%>
						<a href="/books/${oneBook.id}">
							<c:out value="${oneBook.title}" />
						</a>
					</td>
					<td><c:out value="${oneBook.author}" /></td>
					<%-- The poster's name comes through the @ManyToOne
					     relationship: book -> user -> userName --%>
					<td><c:out value="${oneBook.user.userName}" /></td>
				</tr>
			</c:forEach>
		</tbody>
	</table>
</body>
</html>
