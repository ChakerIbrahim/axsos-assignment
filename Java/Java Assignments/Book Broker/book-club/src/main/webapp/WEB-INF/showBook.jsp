<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title><c:out value="${book.title}" /></title>
	<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
	<style>
		* { margin: 0; padding: 0; box-sizing: border-box; }

		body {
			font-family: 'Space Grotesk', sans-serif;
			background: radial-gradient(ellipse at top, #1c1a2e 0%, #0f0e17 55%);
			color: #eae8f0;
			min-height: 100vh;
			display: flex;
			justify-content: center;
			padding-top: 80px;
		}

		.wrap { width: 620px; }

		.back {
			display: inline-block;
			font-family: 'JetBrains Mono', monospace;
			font-size: 12px;
			color: #8f8ba3;
			letter-spacing: 1px;
			text-transform: uppercase;
			text-decoration: none;
			margin-bottom: 16px;
		}

		.back:hover { color: #5eead4; }

		.tag {
			font-family: 'JetBrains Mono', monospace;
			font-size: 12px;
			color: #ffb454;
			letter-spacing: 2px;
			text-transform: uppercase;
		}

		h1 { font-size: 42px; margin: 8px 0 26px; }

		.panel {
			background: rgba(255, 255, 255, 0.03);
			border: 1px solid #2c2a3e;
			border-radius: 14px;
			padding: 28px 26px;
		}

		.panel h3 { font-size: 20px; margin-bottom: 4px; }
		.panel h3 em { color: #ffb454; font-style: normal; }

		.muted { color: #8f8ba3; font-size: 14px; margin-bottom: 16px; }

		/* the thoughts, styled like a highlighted quote block */
		.thoughts {
			background: #16141f;
			border-left: 3px solid #5eead4;
			border-radius: 8px;
			padding: 16px 18px;
			line-height: 1.65;
			color: #d9d6e8;
		}

		/* edit link + delete button row */
		.controls {
			display: flex;
			align-items: center;
			gap: 20px;
			margin-top: 22px;
		}

		.edit {
			font-family: 'JetBrains Mono', monospace;
			font-size: 12px;
			font-weight: 700;
			letter-spacing: 2px;
			text-transform: uppercase;
			color: #5eead4;
			text-decoration: none;
		}

		.edit:hover { text-decoration: underline; }

		.controls input[type="submit"] {
			background: none;
			border: none;
			font-family: 'JetBrains Mono', monospace;
			font-size: 12px;
			font-weight: 700;
			letter-spacing: 2px;
			text-transform: uppercase;
			color: #ff6b6b;
			cursor: pointer;
		}

		.controls input[type="submit"]:hover { text-decoration: underline; }
	</style>
</head>
<body>
<div class="wrap">
	<a class="back" href="/books">&larr; back to the shelves</a>
	<div class="tag">// book details</div>
	<h1><c:out value="${book.title}" /></h1>

	<div class="panel">

		<%-- c:choose / c:when / c:otherwise works like if / else.
             We compare the poster's id with the logged-in user's id. --%>
		<c:choose>

			<%-- SENSEI BONUS: if the logged-in user posted it,
                 have it say "You read..." and "Here are your thoughts" --%>
			<c:when test="${book.user.id == userId}">
				<h3>You read <em><c:out value="${book.title}" /></em>
					by <c:out value="${book.author}" />.</h3>
				<p class="muted">Here are your thoughts:</p>
			</c:when>

			<%-- Otherwise the normal wording:
                 "Bella read Kafka on the Shore by Haruki Murakami." --%>
			<c:otherwise>
				<h3><c:out value="${book.user.userName}" /> read
					<em><c:out value="${book.title}" /></em>
					by <c:out value="${book.author}" />.</h3>
				<p class="muted">Here are <c:out value="${book.user.userName}" />'s thoughts:</p>
			</c:otherwise>
		</c:choose>

		<%-- The thoughts themselves --%>
		<div class="thoughts">
			<c:out value="${book.myThoughts}" />
		</div>

		<%-- NINJA BONUS: include an edit link and a delete button
             ONLY if this book entry was posted by the person logged in --%>
		<c:if test="${book.user.id == userId}">
			<div class="controls">

					<%-- Edit link to the Change your Entry page --%>
				<a class="edit" href="/books/${book.id}/edit">edit</a>

					<%-- The delete button: a small form that sends a DELETE request.
					     Spring's hidden method filter turns the hidden "_method"
					     input into a real DELETE, caught by @DeleteMapping. --%>
				<form action="/books/${book.id}" method="post">
					<input type="hidden" name="_method" value="delete" />
					<input type="submit" value="delete" />
				</form>
			</div>
		</c:if>
	</div>
</div>
</body>
</html>