<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Book Club - Shelves</title>
	<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
	<style>
		* { margin: 0; padding: 0; box-sizing: border-box; }

		body {
			font-family: 'Space Grotesk', sans-serif;
			background: radial-gradient(ellipse at top, #1c1a2e 0%, #0f0e17 55%);
			color: #eae8f0;
			min-height: 100vh;
			padding: 60px 6vw 80px;
		}

		.tag {
			font-family: 'JetBrains Mono', monospace;
			font-size: 12px;
			color: #ffb454;
			letter-spacing: 2px;
			text-transform: uppercase;
		}

		/* top bar: greeting on the left, actions on the right */
		.topbar {
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			flex-wrap: wrap;
			gap: 20px;
			margin-bottom: 40px;
		}

		h1 { font-size: 44px; margin-top: 8px; }
		h1 span { color: #ffb454; }

		.actions a {
			display: inline-block;
			padding: 11px 18px;
			font-size: 14px;
			font-weight: 700;
			border-radius: 8px;
			text-decoration: none;
			margin-left: 10px;
		}

		.add { background: #ffb454; color: #0f0e17; }
		.add:hover { filter: brightness(1.1); }

		.logout {
			color: #8f8ba3;
			border: 1px solid #2c2a3e;
		}

		.logout:hover { color: #eae8f0; border-color: #8f8ba3; }

		/* section heading with mono counter */
		.section-head {
			display: flex;
			justify-content: space-between;
			align-items: baseline;
			margin-bottom: 16px;
		}

		.section-head h2 { font-size: 22px; }

		.count {
			font-family: 'JetBrains Mono', monospace;
			font-size: 12px;
			color: #8f8ba3;
		}

		/* dark table panel */
		table {
			width: 100%;
			border-collapse: collapse;
			background: rgba(255, 255, 255, 0.03);
			border: 1px solid #2c2a3e;
			border-radius: 14px;
			overflow: hidden;
		}

		th, td { text-align: left; padding: 14px 18px; font-size: 15px; }

		th {
			font-family: 'JetBrains Mono', monospace;
			font-size: 11px;
			font-weight: 700;
			letter-spacing: 2px;
			text-transform: uppercase;
			color: #5eead4; /* teal header text */
			border-bottom: 1px solid #2c2a3e;
		}

		tbody tr { border-bottom: 1px solid #1d1b2b; }
		tbody tr:hover { background: rgba(255, 180, 84, 0.05); }

		td a { color: #ffb454; font-weight: 500; text-decoration: none; }
		td a:hover { text-decoration: underline; }
	</style>
</head>
<body>

<div class="topbar">
	<div>
		<div class="tag">// shelves</div>
		<%-- Welcome the user with their name --%>
		<h1>Welcome, <span><c:out value="${user.userName}" /></span></h1>
	</div>
	<div class="actions">
		<a class="add" href="/books/new">+ Add a book to my shelf!</a>
		<a class="logout" href="/logout">logout</a>
	</div>
</div>

<div class="section-head">
	<h2>Books from everyone's shelves:</h2>
	<span class="count">${books.size()} entries</span>
</div>

<%-- The table should include all books --%>
<table>
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