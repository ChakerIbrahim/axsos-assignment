<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Add a Book</title>
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

		.wrap { width: 430px; }

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

		.panel {
			background: rgba(255, 255, 255, 0.03);
			border: 1px solid #2c2a3e;
			border-radius: 14px;
			padding: 28px 26px 32px;
			box-shadow: 0 0 40px rgba(255, 180, 84, 0.07);
		}

		.tag {
			font-family: 'JetBrains Mono', monospace;
			font-size: 12px;
			color: #ffb454;
			letter-spacing: 2px;
			text-transform: uppercase;
		}

		h1 { font-size: 28px; margin: 6px 0 20px; }

		label {
			display: block;
			font-family: 'JetBrains Mono', monospace;
			font-size: 12px;
			color: #8f8ba3;
			letter-spacing: 1px;
			text-transform: uppercase;
			margin: 16px 0 6px;
		}

		input[type="text"], textarea {
			width: 100%;
			padding: 12px 14px;
			font-size: 15px;
			font-family: 'Space Grotesk', sans-serif;
			color: #eae8f0;
			background: #16141f;
			border: 1px solid #2c2a3e;
			border-radius: 8px;
			outline: none;
		}

		textarea { min-height: 100px; resize: vertical; }
		input:focus, textarea:focus { border-color: #ffb454; }

		.error { display: block; color: #ff6b6b; font-size: 13px; margin-top: 5px; }

		input[type="submit"] {
			width: 100%;
			margin-top: 24px;
			padding: 14px;
			font-size: 15px;
			font-weight: 700;
			font-family: 'Space Grotesk', sans-serif;
			color: #0f0e17;
			background: #ffb454;
			border: none;
			border-radius: 8px;
			cursor: pointer;
		}

		input[type="submit"]:hover { filter: brightness(1.1); }
	</style>
</head>
<body>
<div class="wrap">
	<a class="back" href="/books">&larr; back to the shelves</a>

	<div class="panel">
		<div class="tag">// new entry</div>
		<h1>Add a Book to Your Shelf!</h1>

		<%-- The form is bound to the empty "book" object.
             On submit it POSTs to /books.
             Validations: Title, author and thoughts must not be blank. --%>
		<form:form action="/books" method="post" modelAttribute="book">
			<form:label path="title">Title</form:label>
			<form:input path="title" />
			<form:errors path="title" cssClass="error" />

			<form:label path="author">Author</form:label>
			<form:input path="author" />
			<form:errors path="author" cssClass="error" />

			<form:label path="myThoughts">My thoughts</form:label>
			<%-- form:textarea renders a bigger, multi-line input --%>
			<form:textarea path="myThoughts" />
			<form:errors path="myThoughts" cssClass="error" />

			<input type="submit" value="Submit" />
		</form:form>
	</div>
</div>
</body>
</html>